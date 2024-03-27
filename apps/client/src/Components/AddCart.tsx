import { useState } from 'react';
import { CartItem } from '@prisma/client';

function useAddToCart() {

    const [addCart, setAddCart] = useState<CartItem[]>();
    const [showAlert, setShowAlert] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const addToCart = (productId: number) => {
        const accessToken = sessionStorage.getItem('token');
        if (!accessToken) {
            console.log('Nincs accessToken a sessionStorage-ben');
            setShowAlert(true);
            return;
        }
        const data = { addCart, productId, quantity: 1 };

        fetch(`/api/cart/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    setErrors([error.message]);
                } else {
                    const data = await res.json();
                    setAddCart(data);
                }
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                setErrors(['Error adding to cart']);
            });
    };

    return { addCart, addToCart, showAlert, setShowAlert, errors };
}

export default useAddToCart;
