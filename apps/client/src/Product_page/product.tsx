import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ExtendedProduct} from "../interfaces.ts";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import './productDesign.css'
import {CartItem} from "@prisma/client";
import {Button} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function Products(){

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ExtendedProduct | null>(null);
    const [addCart,setAddCart]=useState<CartItem[]>()
    const [error, setError] = useState<string | null>(null);
    const [_, setErrors] = useState<string[]>([]);
    const navigate = useNavigate()

    function AddCart(productId: number){
        const data = {addCart, productId, quantity: 1}
        fetch(`/api/cart/add`,{
            method:'POST',
            body:JSON.stringify(data),
            headers: {
                'Content-type':'application/json',
            }
        }).then(async(res)=>{
            if(!res.ok) {
                const error=await res.json()
                setErrors([error.message])
            } else {
                const data=await res.json()
                setAddCart(data)
                navigate('/')
            }
        })
    }

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
                <div className={"container"}>
                    <div className={"row"}>
                        <h2 className={"h2"}>{product.product_name}</h2>
                        <div className={"col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"}>
                            <div id="carouselExampleCaptions" className="carousel car carousel-dark slide ">
                                <div className="carousel-indicators">
                                    {product.ProductPictures.map((_, index) => (
                                        <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-label={`Slide ${index + 1}`}></button>
                                    ))}
                                </div>
                                <div className="carousel-inner">
                                    {product.ProductPictures.map((picture, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                            <img src={picture.image} alt={product.product_name} className={"c-img"} />
                                            <div className="carousel-caption d-none d-md-block">
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"}>
                            <div className={"break"}>
                                <p>Price: {product.price}Ft</p>
                                <Button
                                    onClick={() => {
                                        AddCart(product.product_id)
                                    }}
                                    variant={"outlined"}
                                    key={product.product_id}
                                    startIcon={<AddShoppingCartIcon />}>
                                    Kosárba
                                </Button>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {Footer()}
        </div>
    );
}

export default Products;