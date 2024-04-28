import { useEffect, useState, JSX } from 'react';
import {Alert, Pagination, Skeleton} from "@mui/material";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import { ExtendedProduct } from "../../interfaces.ts";
import { useNavigate } from "react-router-dom";
import CardComponent from '../Hooks/CardComponent.tsx';
import {useAddToCart} from "../Hooks/AddCart.tsx";
import {fetchProductCount, fetchProductsPerPage, productsPerPage} from "./MainApi.tsx";
import './Style/mainDesign.css'

/**
 * Represents the main page component.
 * Displays a list of products and provides pagination functionality.
 * @returns JSX.Element
 */
function Main(): JSX.Element {
    const [products, setProducts] = useState<ExtendedProduct[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);
    const navigate = useNavigate();
    const [_, setErrors] = useState<string[]>([]);
    const { showAlert, setShowAlert } = useAddToCart();
    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        fetchProductCount()
            .then(totalCount => setTotalPages(totalCount))
            .catch(error => setErrors(['Error fetching product count', error]));
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchProductsPerPage(currentPage, productsPerPage)
                .then(data => setProducts(data))
                .catch(error => setErrors(['Error fetching products', error]))
                .finally(() => setLoading(false));
        }, 1000);

        return () => clearTimeout(delay);
    }, [currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    /**
     * Handles page change event.
     * @param page - The selected page number.
     */
    const handlePageChange = (page: number): void => {
        setCurrentPage(page);
        navigate(`?page=${page}`);
    };

    return (
        <>
            <Container className={'main-container'}>
                {showAlert && (
                    <Alert severity="error" className={"Alert"} onClose={() => setShowAlert(false)}>
                        Ahhoz, hogy a kosárba tudd a terméket rakni, be kell jelentkezned.
                    </Alert>
                )}
                <Row>
                    {currentPage === 1 && (
                        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Carousel data-bs-theme="dark" className={"carousel"}>
                                <Carousel.Item className={"carousel-item"}>
                                    <img
                                        className="c-img w-100"
                                        src="https://images.euronics.hu/product_images/800x600/resize/9395084754974_j2ze08xr.jpg?v=2"
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className={"carousel-item"}>
                                    <img
                                        className="c-img w-100"
                                        src="https://images.euronics.hu/product_images/800x600/resize/s1_i1rikh5k.jpg?v=1"
                                        alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item className={"carousel-item"}>
                                    <img
                                        className="c-img w-100"
                                        src="https://images.euronics.hu/product_images/800x600/resize/s1_8w1xpjwb.jpg?v=2"
                                        alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    )}
                    {loading ? (
                        Array.from({length: productsPerPage}).map((_, index) => (
                            <Col key={index} xl={3} lg={4} md={6} sm={6} xs={12}>
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
                            <CardComponent key={product.product_id} product={product}/>
                        ))
                    )}
                </Row>
                <div className={'pag'} style={{marginBottom: '50px'}}>
                    <Pagination
                        count={totalPages}
                        variant="outlined"
                        color="primary"
                        onChange={(_, page) => handlePageChange(page)}
                    />
                </div>
            </Container>
        </>
    )
}

export default Main;
