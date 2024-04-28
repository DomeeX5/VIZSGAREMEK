import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ExtendedProduct } from '../../interfaces.ts';
import './Style/productDesign.css';
import { Alert, Button} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useAddToCart } from "../Hooks/AddCart.tsx";
import { Container, Row, Col , Carousel} from "react-bootstrap";
import { fetchApiEndpoints } from "../Hooks/getFetchApi.tsx";

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
                            <Col xl={8} lg={8} md={12} sm={12} xs={12} className={'break'}>
                                <Carousel id="carouselExampleCaptions" data-bs-theme="dark">
                                    {product.ProductPictures.map((picture, index) => (
                                        <Carousel.Item key={index}>
                                            <img src={picture.image} alt={product.product_name} className={"c-img"} />
                                            <Carousel.Caption>
                                            </Carousel.Caption>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                            {/* Product details */}
                            <Col xl={4} lg={4} md={12} sm={12} xs={12}>
                                <div className={"Box"}>
                                    {/* Product price */}
                                    <p className={"product"}>Price: {product.price}Ft</p>
                                    {/* Button to add product to cart */}
                                    <Button onClick={() => { addToCart(product.product_id, 1); }} variant={'outlined'} startIcon={<AddShoppingCartIcon />}>
                                        Kosárba
                                    </Button>
                                </div>
                                {/* Product description */}
                                <h2>Leírás</h2>
                                <p className={"paragraph"}>{product.description}</p>
                            </Col>
                        </Row>
                    </Container>
                )}
            </div>
        </>
    );
}

export default Products;
