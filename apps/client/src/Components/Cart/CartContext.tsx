import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { ExtendedCartItem } from '../../interfaces';
import { fetchApiEndpoints } from '../Hooks/getFetchApi';
import { useAuth } from '../Login/AuthContextProvider';

/**
 * Represents the type of the context value provided by CartProvider.
 */
interface CartContextType {
    cartItems: ExtendedCartItem[];
    totalPrice: string;
    cartCount: number;
    fetchCartData: () => void;
    removeOneFromCart: (productId: number) => void;
    removeItemFromCart: (productId: number) => void;
    updateCartCount: () => Promise<void>;
}

/**
 * Context object for managing the user's shopping cart.
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider component for the CartContext.
 * Manages the state of the user's shopping cart and provides cart-related functionality to child components.
 * @param children - Child components to be wrapped by the provider.
 */
export const CartProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<string>("");
    const [cartCount, setCartCount] = useState<number>(0);
    const { isLoggedIn, token: accessToken } = useAuth();

    /**
     * Fetches the user's cart data from the API.
     * Resets cart data if user is not logged in.
     */
    const fetchCartData = async (): Promise<void> => {
        if (!isLoggedIn) {
            setCartItems([]);
            setTotalPrice("");
            setCartCount(0);
        } else {
            try {
                const cartItems = await fetchApiEndpoints('/api/cart/items', { accessToken: accessToken });
                const totalPrice = await fetchApiEndpoints('/api/cart/total', { accessToken: accessToken });
                setCartItems(cartItems);
                setTotalPrice(totalPrice);
                await updateCartCount();
            } catch (error: any) {
                console.error('Error fetching cart data:', error);
            }
        }
    };

    /**
     * Fetches the total number of items in the user's cart from the API.
     */
    const updateCartCount = async (): Promise<void> => {
        try {
            const cartCount = await fetchApiEndpoints('/api/cart/item-count', { accessToken: accessToken });
            setCartCount(cartCount.count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    /**
     * Removes one instance of a product from the user's cart.
     * @param productId - The ID of the product to remove.
     */
    const removeOneFromCart = async (productId: number): Promise<void> => {
        try {
            const fetch = await fetchApiEndpoints('api/cart/remove', { accessToken: accessToken, method: 'PUT', body: { productId, quantity: 1 }, jsonResponse: false })
            const updatedCart = cartItems.filter(item => item.product.product_id !== productId);
            setCartItems(updatedCart);
            if (fetch && updatedCart.filter(item => item.quantity === 1)) {

            }
            await fetchCartData()
        } catch (error: any) {
            console.error('Error fetching cart data: ', error)
        }
    };

    /**
     * Removes all instances of a product from the user's cart.
     * @param productId - The ID of the product to remove.
     */
    const removeItemFromCart = async (productId: number): Promise<void> => {
        try {
            await fetchApiEndpoints('api/cart/remove-item', { accessToken: accessToken, method: 'DELETE', body: { productId }, jsonResponse: false })
            const updatedCart = cartItems.filter(item => item.product.product_id !== productId);
            setCartItems(updatedCart);
            await fetchCartData()
        } catch (error: any) {
            console.error('Error fetching cart data: ', error)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCartData();
        };

        fetchData();
    }, [accessToken]);

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, cartCount, fetchCartData, removeItemFromCart, removeOneFromCart, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook for accessing the CartContext.
 * @returns The context value provided by CartProvider.
 * @throws Error if used outside CartProvider.
 */
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
