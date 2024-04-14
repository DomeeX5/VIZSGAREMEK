import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react';
import { ExtendedCartItem } from '../../interfaces.ts';
import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";
import { useAuth } from '../Login/AuthContextProvider.tsx';
//import {fetchTotalPrice} from "./CartApi.tsx";

interface CartContextType {
    cartItems: ExtendedCartItem[];
    totalPrice: string;
    cartCount: number;
    fetchCartData: () => void;
    removeOneFromCart: (productId: number) => void;
    removeItemFromCart: (productId: number) => void;
    updateCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState("");
    const [cartCount, setCartCount] = useState<number>(0);
    const {isLoggedIn, token: accessToken} = useAuth()

    const fetchCartData = async () => {
        if (!isLoggedIn) {
            setCartItems([]);
            setTotalPrice("");
            setCartCount(0);
        } else {
            try {
                const cartItems = await fetchApiEndpoints('/api/cart/items', {accessToken: accessToken});
                const totalPrice = await fetchApiEndpoints('/api/cart/total', {accessToken: accessToken});
                setCartItems(cartItems);
                setTotalPrice(totalPrice);
                await updateCartCount();
            } catch (error: any) {
                console.error('Error fetching cart data:', error);
            }
        }
    };

    const updateCartCount = async () => {
        try {
            const cartCount = await fetchApiEndpoints('/api/cart/item-count', {accessToken: accessToken});
            setCartCount(cartCount.count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const removeOneFromCart = async (productId: number) => {
        try {
            await fetchApiEndpoints('api/cart/remove', {accessToken: accessToken, method: 'POST', body: {productId, quantity: 1}, jsonResponse: false})
            const updatedCart = cartItems.filter(item => item.product.product_id !== productId);
            setCartItems(updatedCart);
            await fetchCartData()
        } catch (error: any) {
            console.error('Error fetching cart data: ', error)
        }
    };

    const removeItemFromCart = async (productId: number) => {
        try {
            await fetchApiEndpoints('api/cart/remove-item', {accessToken: accessToken, method: 'POST', body: {productId}, jsonResponse: false})
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

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
