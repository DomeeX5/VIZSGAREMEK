import { useState, useEffect } from "react";
import {ExtendedCartItem} from "../interfaces.ts";
import {Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";

function Cart() {
    const [getCart, setGetCart] = useState<ExtendedCartItem[]>([]);
    const [responseData, setResponseData] = useState(null);
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

    function removeCart(){
        fetch("/api/cart/remove",)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setResponseData(data);
            })
            .catch(error => {
                setErrors(error.message);
            });
    };

    return (
        <div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"}>
                        <ul>
                            {getCart.map((item) => (
                                <li key={item.product.product_id}>
                                    <div className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-xl-4 col-lg-5 col-md-5 col-sm-7 col-7">
                                                <img src={item.product.ProductPictures[0].image} alt={item.product.product_name} width={"240px"}/>
                                            </div>
                                            <div className="col-xl-8 col-lg-7 col-md-7 col-sm-5 col-5">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.product.product_name}</h5>
                                                    <p className="card-text">Darabszam: {item.quantity}</p>
                                                    <IconButton aria-label="delete" size="small" onClick={removeCart}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"}>
                        <Link to={"/purchase"}>
                            <button>
                                Fizetés
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
