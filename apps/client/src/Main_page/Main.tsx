import {useEffect, useState} from 'react';
import './mainDesign.css'
import {CartItem} from "@prisma/client";
import {ExtendedProduct} from "../interfaces.ts";
import {Alert, Pagination, Skeleton} from "@mui/material";
import {CardComponent} from "./CardComponent.tsx";


function Main() {

    const [products, setProducts] = useState<ExtendedProduct[] | null>(null);
    const [addCart,setAddCart]=useState<CartItem[]>()
    const [showAlert, setShowAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [_, setErrors] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/products/count')
            .then(async (res) => {
                const data = await res.json();
                setTotalPages(Math.round(data.totalCount / productsPerPage))
            })
            .catch(error => {
            console.error('Error fetching products:', error);
            setErrors(['Error fetching products']);
        });
        const delay = setTimeout(() => {
            fetch(`/api/products/all?page=${currentPage}&limit=${productsPerPage}`)
                .then(async (res) => {
                    if (!res.ok) {
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
                })
                .finally(() => setLoading(false)); // Set loading to false when data fetching is complete
        }, 1000);
        return () => clearTimeout(delay);
    }, [currentPage]);



    function AddCart(productId: number){
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a sessionStorage-ben");
            setShowAlert(true);
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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage]);

    return (
        <div>
            {showAlert && (
                <Alert severity="error" className={"Alert"} onClose={() => setShowAlert(false)}>
                    Ahhoz, hogy a kosárba tudd a terméket rakni, be kell jelentkezned.
                </Alert>
            )}

            <div className={"container"}>
                <div className={"row"}>
                    {currentPage === 1 && (
                        <div id="carouselExampleInterval " className="carousel slide col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" data-bs-ride="carousel">
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
                    )}
                    {loading ? (
                        Array.from({ length: productsPerPage }).map((_, index) => (
                            <div key={index} className={"col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6"}>
                                <div className="skeleton-card">
                                    <Skeleton variant="rectangular" width={250} height={300} />
                                    <div className="skeleton-text">
                                        <Skeleton variant="text" width={100} height={30} />
                                        <Skeleton variant="text" width={230} height={80} />
                                        <Skeleton variant="text" width={150} height={40} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        products && products.map((product) => (
                        <CardComponent key={product.product_id} product={product} onClick={() => {
                            AddCart(product.product_id)
                        }}/>
                    )))}
                </div><br/>
                <div className={"pag"}>
                    <Pagination
                        count={totalPages}
                        variant="outlined"
                        color="primary"
                        onChange={(_, page) => {
                            setCurrentPage(page);
                            window.history.pushState(null, '', `?page=${page}`);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Main;
