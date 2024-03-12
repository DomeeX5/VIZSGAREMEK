import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './mainDesign.css'
import {CartItem} from "@prisma/client";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import {ExtendedProduct} from "../interfaces.ts";
import {Button, IconButton, Pagination, Stack} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


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
                    <div id="carouselExampleInterval " className="carousel slide col-xl-13 col-lg-13 col-md-13 col-sm-13 col-13" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="1000">
                                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FzMHVjNXEwMjI0cWNma3NicHF4a3JsZDVzM2c0NXlyaHZveXk0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmvodzjX8wU7icE3TL/giphy.gif" className="d-block w-100 c-img" alt="..."/>
                            </div>
                            <div className="carousel-item" data-bs-interval="2000">
                                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FzMHVjNXEwMjI0cWNma3NicHF4a3JsZDVzM2c0NXlyaHZveXk0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmvodzjX8wU7icE3TL/giphy.gif" className="d-block w-100 c-img" alt="..."/>
                            </div>
                            <div className="carousel-item">
                                <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FzMHVjNXEwMjI0cWNma3NicHF4a3JsZDVzM2c0NXlyaHZveXk0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmvodzjX8wU7icE3TL/giphy.gif" className="d-block w-100 c-img" alt="..."/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
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
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            color="primary"
                                            aria-label="add to shopping cart"
                                            onClick={() => {AddCart(product.product_id)}} key={product.product_id}>
                                            <AddShoppingCartIcon/>
                                        </IconButton>
                                    </Stack>
                                    <p></p>
                                    <Link to={`/products/${product.product_id}`}>
                                        <Button variant="contained" size="small">
                                            Áru megtekintése
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div><br/>
                <div className={"pag"}>
                    <Pagination count={10} variant="outlined" color="primary"/>
                </div>
            </div>
            {Footer()}
        </div>
    )
}

export default Main;
