import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ExtendedProduct} from "../interfaces.ts";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";

function Products(){
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ExtendedProduct | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    setError(error.message);
                } else {
                    const data = await res.json();
                    setProduct(data);
                }
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setError('Error fetching product details');
            });
    }, [id]);

    return (
        <div>
            {Navbar()}
            {error && <div>{error}</div>}
            {product &&
                <div>
                    <h2>{product.product_name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <img src={product.ProductPictures[0].image} alt={product.product_name} />
                </div>
            }
            {Footer()}
        </div>
    );
}

export default Products;