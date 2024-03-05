import { useState, useEffect } from "react";
import {ExtendedCartItem} from "../interfaces.ts";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";


function Cart() {
    const [getCart, setGetCart] = useState<ExtendedCartItem[]>([]);
    const [_, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }

        fetch(`/api/cart/items`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    setErrors([error.message]);
                } else {
                    const data = await res.json();
                    setGetCart(data);
                }
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setErrors(['Error fetching cart items']);
            });
    }, []);

    return (
        <div>
            {Navbar()}
            <ul>
                {getCart.map((item) => (
                    <li key={item.product.product_id}>
                        <div>
                            <h3>{item.product.product_name}</h3>
                            <p>{item.product.description}</p>
                            <p>Quantity: {item.quantity}</p>
                            <img src={item.product.ProductPictures[0].image} alt={item.product.product_name} />
                        </div>
                    </li>
                ))}
            </ul>
            {Footer()}
        </div>
    );
}

export default Cart;
