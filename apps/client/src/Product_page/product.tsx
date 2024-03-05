import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ExtendedProduct} from "../interfaces.ts";

function Products(){
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ExtendedProduct | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/products/product/${id}`)
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
            {error && <div>{error}</div>}
            {product &&
                <div>
                    <h2>{product.product_name}</h2>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <img src={product.ProductPictures[0].image} alt={product.product_name} />
                </div>
            }
        </div>
    );
}

export default Products;