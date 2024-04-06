import { ExtendedCartItem } from "../../interfaces";

export async function fetchCartItems(accessToken: string): Promise<ExtendedCartItem[]> {
    try {
        const response = await fetch(`/api/cart/items`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw new Error('Error fetching cart items');
    }
}

export async function fetchTotalPrice(accessToken: string): Promise<string> {
    try {
        const response = await fetch('/api/cart/total', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw new Error('Error fetching total price');
    }
}

export async function fetchRemoveCartItem(token: string | null, productId: number): Promise<void> {
    if (!token) {
        throw new Error("No access token found in local storage");
    }

    const data = { productId, quantity: 1 };

    const response = await fetch("/api/cart/remove", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}