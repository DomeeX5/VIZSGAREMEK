import { useState, useEffect } from 'react';

export function useCartCount2() {
    const [cartCount, setCartCount] = useState<number>(0);
    useEffect(() => {
        let isMounted = true;
        const accessToken = sessionStorage.getItem('token')
        const fetchCartCount = async () => {
            try {
                const response = await fetch(`/api/cart/item-count`, {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }

                const data = await response.json();
                if (isMounted) {
                    setCartCount(data.count);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        if (accessToken) {
            fetchCartCount();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        cartCount,
        setCartCount
    }
}
