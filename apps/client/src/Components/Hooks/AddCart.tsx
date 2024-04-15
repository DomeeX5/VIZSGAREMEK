import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useAuth } from '../Login/AuthContextProvider';
import { useCart } from '../Cart/CartContext';
import { fetchApiEndpoints } from "./getFetchApi";

/**
 * Represents the type of the context value provided by AddToCartProvider.
 */
interface AddToCartContextType {
    addToCart: (productId: number, quantity: number) => void;
    showAlert: boolean;
    setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
    errors: string[];
}

/**
 * Context object for managing the addToCart functionality.
 */
const AddToCartContext = createContext<AddToCartContextType | undefined>(undefined);

/**
 * Custom hook for accessing the AddToCartContext.
 * @returns The context value provided by AddToCartProvider.
 * @throws Error if used outside of an AddToCartProvider.
 */
export const useAddToCart = (): AddToCartContextType => {
    const context = useContext(AddToCartContext);
    if (!context) {
        throw new Error('useAddToCart must be used within an AddToCartProvider');
    }
    return context;
};

/**
 * Provider component for the AddToCartContext.
 * Manages the addToCart functionality and provides it to child components.
 * @param children - Child components to be wrapped by the provider.
 */
export const AddToCartProvider= ({ children }: PropsWithChildren<{}>): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const { fetchCartData } = useCart();

    /**
     * Adds a product to the user's cart.
     * @param productId - The ID of the product to add to the cart.
     * @param quantity - The quantity of the product to add to the cart.
     */
    const addToCart = async (productId: number, quantity: number): Promise<void> => {
        if (!isLoggedIn) {
            console.log('Nincs accessToken a sessionStorage-ben');
            setShowAlert(true);
            return;
        }
        const data = { productId, quantity };
        const accessToken = sessionStorage.getItem('token');

        await fetchApiEndpoints('api/cart/add', { accessToken: accessToken, method: 'POST', body: data })
            .then(fetchCartData)
            .catch((error) => {
                console.error('Error adding to cart:', error);
                setErrors(error);
            });
    };

    return (
        <AddToCartContext.Provider value={{ addToCart, showAlert, setShowAlert, errors }}>
            {children}
        </AddToCartContext.Provider>
    );
};
