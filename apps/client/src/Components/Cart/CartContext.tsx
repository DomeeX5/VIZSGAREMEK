import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { ExtendedCartItem } from '../../interfaces.ts';
import { fetchCartItems, fetchRemoveCartItem, fetchTotalPrice } from './CartFetch.tsx';

interface CartContextType {
    cartItems: ExtendedCartItem[];
    totalPrice: string;
    cartCount: number;
    fetchCartData: () => void;
    removeFromCart: (productId: number) => void;
    updateCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState("");
    const [cartCount, setCartCount] = useState<number>(0);

    const fetchCartData = async () => {
        try {
            const accessToken = sessionStorage.getItem("token");
            if (!accessToken) {
                throw new Error("Nincs accessToken a localStorage-ban");
            }

            const cartItems = await fetchCartItems(accessToken);
            setCartItems(cartItems);

            const total = await fetchTotalPrice(accessToken);
            setTotalPrice(total);

            await updateCartCount();
        } catch (error: any) {
            console.error('Error fetching cart data:', error);
        }
    };

    const updateCartCount = async () => {
        try {
            const accessToken = sessionStorage.getItem('token');
            if (!accessToken) {
                throw new Error('Nincs accessToken a localStorage-ban');
            }

            const response = await fetch(`/api/cart/item-count`, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart count');
            }

            const data = await response.json();
            setCartCount(data.count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const removeFromCart = async (productId: number) => {
        try {
            const accessToken = sessionStorage.getItem("token");
            if (!accessToken) {
                throw new Error("Nincs accessToken a localStorage-ban");
            }

            await fetchRemoveCartItem(accessToken, productId);
            const updatedCart = cartItems.filter(item => item.product.product_id !== productId);
            setCartItems(updatedCart);
            await fetchCartData();
        } catch (error: any) {
            console.error('Error fetching cart data: ', error)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCartData();
        };

        fetchData();
    }, []);

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, cartCount, fetchCartData, removeFromCart, updateCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
