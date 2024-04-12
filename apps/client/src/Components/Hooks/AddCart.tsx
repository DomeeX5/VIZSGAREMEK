import React, {createContext, PropsWithChildren, useContext, useState} from 'react';
import { useAuth } from '../Login/AuthContextProvider.tsx';
import { useCart } from '../Cart/CartContext.tsx';
import {fetchApiEndpoints} from "./getFetchApi.tsx";

interface AddToCartContextType {
    addToCart: (productId: number, quantity: number) => void;
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    errors: string[];
}

const AddToCartContext = createContext<AddToCartContextType | undefined>(undefined);

export const useAddToCart = () => {
    const context = useContext(AddToCartContext);
    if (!context) {
        throw new Error('useAddToCart must be used within a AddToCartProvider');
    }
    return context;
};

export const AddToCartProvider= ({ children }: PropsWithChildren) => {
    const { isLoggedIn } = useAuth();
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const {fetchCartData} = useCart()

    const addToCart = async (productId: number, quantity: number) => {
        if (!isLoggedIn) {
            console.log('Nincs accessToken a sessionStorage-ben');
            setShowAlert(true);
            return;
        }
        const data = { productId, quantity };
        const accessToken = sessionStorage.getItem('token');

        await fetchApiEndpoints('api/cart/add', {accessToken: accessToken, method: 'POST', body: data})
            .then(fetchCartData)
            .catch((error) => {
                console.error('Error adding to cart:', error);
                setErrors(error);
            });
    };


    return (
        <AddToCartContext.Provider value={{  addToCart, showAlert, setShowAlert, errors }}>
            {children}
        </AddToCartContext.Provider>
    );
};
