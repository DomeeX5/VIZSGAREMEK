import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './mainDesign.css'
import {CartItem, Product} from "@prisma/client";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import {jwtDecode} from "jwt-decode";

function Main() {

    const [products, setProducts] = useState<Product[] | null>(null);
    const [addCart,setAddCart]=useState<CartItem[]>()
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

    function AddCart(){
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }
        const decodedToken = jwtDecode(accessToken);
        fetch(`/api/cart/add/${decodedToken.sub}`,{
            method:'POST',
            body:JSON.stringify({addCart}),
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${accessToken}`
            }
        }).then(async(res)=>{
            if(!res.ok) {
                const error=await res.json()
                setErrors([error.message])
            } else {
                const data=await res.json()
                setAddCart(data)
            }
        })
    }

    return (
        <div>
            {Navbar()}
            <div className={"container"}>
                <div className={"row"}>
                    {products && products.map((product) => (
                        <div key={product.product_id} className={"col-xl-3 col-lg-4 col-md-6 col-12"}>
                            <div className="card kartya">
                                {product.ProductPictures && product.ProductPictures.length > 0 &&
                                    <img src={product.ProductPictures[0].image} alt={product.product_name} className={"card-img-top"} />
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <button className="btn btn-primary" onClick={AddCart} key={product.product_id}>Kosárba</button>
                                    <p></p>
                                    <Link to={`/products/${product.product_id}`} className="btn btn-primary">Áru megtekintése</Link>
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

export default Main;
