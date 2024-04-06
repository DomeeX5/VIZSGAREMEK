import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Card as ReactCard, ListGroup } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../styles/cartDesign.css";
import DeleteIcon from '@mui/icons-material/Delete';
import { CardActions, IconButton } from "@mui/material";
import {useAddToCart} from "../AddCart.tsx";
import {useCart} from "./CartContext.tsx";

function Cart() {
    const navigate = useNavigate();
    const { addToCart } = useAddToCart();
    const { cartItems, totalPrice, fetchCartData, removeFromCart } = useCart();

    useEffect(() => {
        fetchCartData();
    }, []);

    const handlePaymentClick = () => {
        navigate("/purchase");
    };

    const handleNavigation = (destination: string) => {
        navigate(destination);
    }

    return (
        <Container>
            <Row>
                <Col xl={8} lg={8} md={12} sm={12} xs={12}>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item
                                key={item.product.product_id}
                                style={
                                        {
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderTop: 'none',
                                            borderBottomLeftRadius: 0,
                                            borderBottomRightRadius: 0,
                                        }
                                }>
                                <Row>
                                    <Col sm={5}>
                                        <img src={item.product.ProductPictures[0].image} alt={item.product.product_name}
                                             className="img-fluid card-image centered"/>
                                    </Col>
                                    <Col sm={7}>
                                        <ReactCard style={{border: 'none'}}>
                                            {/* TODO: Quantity gombok designolása*/}
                                            <ReactCard.Body>
                                                <Row>
                                                    <Col xl={7} lg={6} md={6} sm={6} xs={6}
                                                         onClick={() => handleNavigation(`/products/${item.product.product_id}`)}
                                                    style={{cursor: "pointer"}}>
                                                        <ReactCard.Title>
                                                            {item.product.product_name}</ReactCard.Title>
                                                        <ReactCard.Text>{item.product.price} Ft</ReactCard.Text>
                                                        <ReactCard.Text>Darabszám: {item.quantity}</ReactCard.Text>
                                                    </Col>
                                                    <Col xl={5} lg={6} md={6} sm={6} xs={6}>
                                                        <div className="delete-link">
                                                            <button
                                                                className='quantity-button'
                                                                onClick={() => removeFromCart(item.product.product_id)}
                                                            >-
                                                            </button>
                                                            <input
                                                                value={item.quantity}
                                                                disabled
                                                                className='quantity-number'
                                                            />
                                                            <button
                                                                className='quantity-button'
                                                                onClick={() => {
                                                                    addToCart(item.product.product_id, 1);
                                                                }}
                                                            >+
                                                            </button>
                                                            <IconButton aria-label="delete" size="small"
                                                                        onClick={() => removeFromCart(item.product.product_id)}>
                                                                <DeleteIcon fontSize="medium"/>
                                                            </IconButton>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </ReactCard.Body>
                                        </ReactCard>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                    <Box sx={{width: "100%", height: '100%'}}>
                        <ReactCard style={
                            {
                                borderRight: 'none',
                                borderTop: 'none',
                                borderBottom: 'none',
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                height: '100%'
                            }
                        }>
                            <ReactCard.Body>
                                <Typography variant="h3" component="div">
                                    Vásárlás
                                </Typography>
                                <Typography variant="body2">
                                    {cartItems.map((item) => (
                                        <span key={item.product.product_id}>
                                            {item.product.product_name} {item.quantity}x{item.product.price} Ft<br/>
                                        </span>
                                    ))}
                                    <br/>

                                </Typography>
                            </ReactCard.Body>
                            <span>Total Price: {totalPrice !== null ? totalPrice : 'Loading...'} Ft</span>
                            <CardActions>
                                <Button size="sm" onClick={handlePaymentClick}>Fizetés</Button>
                            </CardActions>
                        </ReactCard>
                    </Box>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
