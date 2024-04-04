import { useEffect, useState } from 'react';
import {Alert, Pagination, Skeleton} from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { ExtendedProduct } from "../../interfaces.ts";
import { useNavigate } from "react-router-dom";
import CardComponent from '../CardComponent.tsx';
import useAddToCart from "../AddCart.tsx";

interface MainProps {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Main: React.FC<MainProps> = ({ currentPage, setCurrentPage }) => {
    const [products, setProducts] = useState<ExtendedProduct[] | null>(null);
    const productsPerPage = 16;
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [_, setErrors] = useState<string[]>([]);
    const {showAlert, setShowAlert} = useAddToCart();

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
}, []);

    useEffect(() => {
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
                .finally(() => setLoading(false));
        }, 1000);

        return () => clearTimeout(delay);
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    return (
        <Container>
            {showAlert && (
                <Alert severity="error" className={"Alert"} onClose={() => setShowAlert(false)}>
                    Ahhoz, hogy a kosárba tudd a terméket rakni, be kell jelentkezned.
                </Alert>
            )}
            <Row>
                {currentPage === 1 && (
                    <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div id="carouselExampleInterval " className="carousel slide"
                             data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="1000">
                                    <img
                                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FzMHVjNXEwMjI0cWNma3NicHF4a3JsZDVzM2c0NXlyaHZveXk0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmvodzjX8wU7icE3TL/giphy.gif"
                                        className="d-block w-100 c-img" alt="..." />
                                </div>
                                <div className="carousel-item" data-bs-interval="2000">
                                    <img
                                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FzMHVjNXEwMjI0cWNma3NicHF4a3JsZDVzM2c0NXlyaHZveXk0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmvodzjX8wU7icE3TL/giphy.gif"
                                        className="d-block w-100 c-img" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3FzMHVjNXEwMjI0cWNma3NicHF4a3JsZDVzM2c0NXlyaHZveXk0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dmvodzjX8wU7icE3TL/giphy.gif"
                                        className="d-block w-100 c-img" alt="..." />
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
                    </Col>
                    )}
                    {loading ? (
                        Array.from({length: productsPerPage}).map((_, index) => (
                            <Col key={index} xl={3} lg={4} md={6} sm={6} xs={6}>
                                <div className="skeleton-card">
                                    <Skeleton variant="rectangular" width={1300} height={200}/>
                                    <div className="skeleton-text">
                                        <Skeleton variant="text" width={100} height={40}/>
                                        <Skeleton variant="text" width={50} height={30}/>
                                        <Skeleton variant="text" width={230} height={50}/>
                                    </div>
                                </div>
                        </Col>
                    ))
                ) : (
                    products && products.map((product) => (
                        <CardComponent key={product.product_id} product={product} />
                    ))
                )}
            </Row>
            <div className={'pag'}>
                    <Pagination
                        count={totalPages}
                        variant="outlined"
                        color="primary"
                        onChange={(_, page) => handlePageChange(page)}
                    />
            </div>
        </Container>
    )
}

export default Main;
