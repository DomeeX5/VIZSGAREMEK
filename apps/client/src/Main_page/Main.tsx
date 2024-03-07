import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './mainDesign.css'
import {CartItem} from "@prisma/client";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import {ExtendedProduct} from "../interfaces.ts";

function Main() {

    const [products, setProducts] = useState<ExtendedProduct[] | null>(null);
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



    function AddCart(productId: number){
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a sessionStorage-ben");
            return;
        }
        const data = {addCart, productId, quantity: 1}

        fetch(`/api/cart/add`,{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
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
            <div>
                {Navbar()}
            </div>
            <div className={"container"}>
                <div className={"row"}>
                    {products && products.map((product) => (
                        <div key={product.product_id} className={"col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"}>
                            <div className="card ">
                                {product.ProductPictures && product.ProductPictures.length > 0 &&
                                    <img src={product.ProductPictures[0].image} alt={product.product_name}
                                         className={"card-img-top"}/>
                                }
                                <div className="card-body">
                                    <h5 className="card-title">{product.product_name}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <button className="btn btn-primary " onClick={() => {
                                        AddCart(product.product_id)
                                    }} key={product.product_id}>Kosárba
                                    </button>
                                    <p></p>
                                    <Link to={`/products/${product.product_id}`} className="btn btn-primary">Áru
                                        megtekintése</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    <nav className="pagi col-3">
                        <ul className="pagination">
                            <li className="page-item"><Link className="page-link" to={'/'}>Previous</Link></li>
                            <li className="page-item"><Link className="page-link" to={'/'}>1</Link></li>
                            <li className="page-item"><Link className="page-link" to={'/'}>2</Link></li>
                            <li className="page-item"><Link className="page-link" to={'/'}>3</Link></li>
                            <li className="page-item"><Link className="page-link" to={'/'}> Next </Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default Main;
