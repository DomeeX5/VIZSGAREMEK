import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ExtendedProduct } from '../../interfaces.ts';
import '../../styles/productDesign.css';
import { Alert, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useAddToCart} from "../AddCart.tsx";
import {Container, Row} from "react-bootstrap";
import {fetchApiEndpoints} from "../getFetchApi.tsx";

function Products() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<ExtendedProduct | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, showAlert, setShowAlert } = useAddToCart();

    useEffect(() => {
        const data = async () => {
            const response = await fetchApiEndpoints(`/api/products/${id}`)
                .catch((error) => {setError('Error fetching product details: ' + error)});
            setProduct(response)
        }
        data();
    }, [id]);

    return (
        <>
            <div className={'main-container'}>
                {showAlert && (
                    <Alert severity="error" className={'Alert'} onClose={() => setShowAlert(false)}>
                        Ahhoz, hogy a kosárba tudd a terméket rakni, be kell jelentkezned.
                    </Alert>
                )}
                {error && <div>{error}</div>}
                {product && (
                    <Container>
                        <Row>
                            <h2 className={'h1'}>{product.product_name}</h2>
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
                            <div className={'col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12'}>
                                <div>
                                    <div className={"Box"}>
                                        <div>
                                            <p className={"product"}>Price: {product.price}Ft</p>
                                        </div>
                                        <Button onClick={() => {addToCart(product.product_id, 1);}} variant={'outlined'} startIcon={<AddShoppingCartIcon />}>
                                            Kosárba
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h2>Leírás</h2>
                                    <p className={"paragraph"}>{product.description}</p></div>
                                </div>
                        </Row>
                    </Container>
                )}
            </div>
        </>
    );
}

export default Products;
