import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { ExtendedCartItem } from '../../interfaces.ts';
import {fetchApiEndpoints} from "../getFetchApi.tsx";
//import {fetchTotalPrice} from "./CartApi.tsx";

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
    const accessToken = sessionStorage.getItem("token");
    const fetchCartData = async () => {
        try {
            if (!accessToken) {
                throw new Error('Nincs accessToken a localStorage-ban');
            }
            const cartItems = await fetchApiEndpoints('/api/cart/items', accessToken);
            const totalPrice = await fetchApiEndpoints('/api/cart/total', accessToken);
            setCartItems(cartItems);
            setTotalPrice(totalPrice);
            await updateCartCount();
        } catch (error: any) {
            console.error('Error fetching cart data:', error);
        }
    };

    const updateCartCount = async () => {
        try {
            const cartCount = await fetchApiEndpoints('/api/cart/item-count', accessToken);
            setCartCount(cartCount.count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const removeFromCart = async (productId: number) => {
        try {
            await fetchApiEndpoints('api/cart/remove', accessToken, 'POST', {productId, quantity: 1})
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
