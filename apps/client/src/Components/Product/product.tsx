import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ExtendedProduct } from '../../interfaces.ts';
import './Style/productDesign.css';
import { Alert, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useAddToCart} from "../Hooks/AddCart.tsx";
import {Container, Row} from "react-bootstrap";
import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";

/**
 * Component for displaying product details.
 * @returns {JSX.Element} - JSX for rendering product details.
 */
function Products(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ExtendedProduct | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, showAlert, setShowAlert } = useAddToCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchApiEndpoints(`/api/products/${id}`);
                setProduct(response);
            } catch (error) {
                setError('Error fetching product details: ' + error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            {/* Main container for product details */}
            <div className={'main-container'}>
                {/* Alert for showing when user needs to login to add product to cart */}
                {showAlert && (
                    <Alert severity="error" className={'Alert'} onClose={() => setShowAlert(false)}>
                        Ahhoz, hogy a kosárba tudd a terméket rakni, be kell jelentkezned.
                    </Alert>
                )}
                {/* Error message */}
                {error && <div>{error}</div>}
                {/* Render product details if available */}
                {product && (
                    <Container>
                        <Row>
                            {/* Product name */}
                            <h2 className={'h1'}>{product.product_name}</h2>
                            {/* Product images */}
                            <div className={'col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 break'}>
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
                            {/* Product details */}
                            <div className={'col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12'}>
                                <div>
                                    <div className={"Box"}>
                                        <div>
                                            {/* Product price */}
                                            <p className={"product"}>Price: {product.price}Ft</p>
                                        </div>
                                        {/* Button to add product to cart */}
                                        <Button onClick={() => {addToCart(product.product_id, 1);}} variant={'outlined'} startIcon={<AddShoppingCartIcon />}>
                                            Kosárba
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    {/* Product description */}
                                    <h2>Leírás</h2>
                                    <p className={"paragraph"}>{product.description}</p>
                                </div>
                            </div>
                        </Row>
                    </Container>
                )}
            </div>
        </>
    );
}

export default Products;
