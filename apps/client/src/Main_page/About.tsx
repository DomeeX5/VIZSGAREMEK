import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Product} from "@prisma/client";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";

function About() {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [_, setErrors] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/products/all')
            .then(async (res)=>{
                if(!res.ok){
                    const error = await res.json();
                    setErrors([error.message]);
                } else {
                    const data = await res.json();
                    setProducts(data);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setErrors(['Error fetching products']);
            });
    }, []);

    return (
        <div>
            {Navbar()}
            <div className={"container"}>
                <div className={"row"}>
                    {products && products.map((product) => (
                        <div key={product.product_id} className={"col-xl-3 col-lg-4 col-md-6 col-12"}>
                            <img src="" alt=""/>
                            <div className="card kartya">
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <Link to={`/product/${product.product_id}`} className="btn btn-primary">Áru megtekintése</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default About;
