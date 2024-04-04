import { useState, useEffect } from "react";
import { ExtendedCartItem } from "../../interfaces.ts";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../styles/cartDesign.css";
import DeleteIcon from '@mui/icons-material/Delete';
import {CardActions, CardContent, IconButton, Card} from "@mui/material";

function Cart() {
    const [getCart, setGetCart] = useState<ExtendedCartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState("");
    const [_, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }

        fetch(`/api/cart/items`, {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    const error = await res.json();
                    setErrors([error.message]);
                } else {
                    const data = await res.json();
                    setGetCart(data);
                }
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setErrors(['Error fetching cart items']);
            });

        fetch('/api/cart/total', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    setErrors([error.message]);
                } else {
                    const data = await res.json();
                    setTotalPrice(data);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });

    }, []);

    function remove(productId: number) {
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }
        const data = { productId, quantity: 1 };

        fetch("/api/cart/remove", {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    setErrors([error.message]);
                } else {
                    const index = getCart.findIndex(item => item.product.product_id === productId);
                    if (index !== -1) {
                        const updatedCart = [...getCart.slice(0, index), ...getCart.slice(index + 1)];
                        setGetCart(updatedCart);
                    }
                }
            })
            .catch(error => {
                setErrors(error.message);
            });
    }
    useEffect(() => { }, [remove]);

    const handlePaymentClick = () => {
        navigate("/purchase");
    };

    return (
        <Container>
            <Row>
                <Col xl={8} lg={8} md={12} sm={12} xs={12}>
                    <ul className={"ul"}>
                        {getCart.map((item) => (
                            <li key={item.product.product_id}>
                                <div className="card cards mb-3">
                                    <div className="row g-0">
                                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-5 col-5 ">
                                            <img src={item.product.ProductPictures[0].image} alt={item.product.product_name} className={"img-fluid card-image centered"} />
                                        </div>
                                        <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-9 col-sm-7 col-7">
                                            <div className="card-body card-bodys">
                                                <h5 className="card-title">{item.product.product_name}</h5>
                                                <p className={"card-text"}>{item.product.price} Ft</p>
                                                <p className="card-text">Darabszam: {item.quantity}</p>
                                                <div className="delete-link">
                                                    <IconButton aria-label="delete" size="small" onClick={() => remove(item.product.product_id)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={6}>
                    <Box sx={{ width: "100%" }}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h3" component="div">
                                    Vasarlas
                                </Typography>
                                <Typography variant="body2" >
                                    {getCart.map((item) => (
                                        <span key={item.product.product_id}>{item.product.product_name} {item.quantity}x{item.product.price} Ft</span>
                                    ))}
                                    <br />
                                    Total Price: {totalPrice !== null ? totalPrice : 'Loading...'} Ft
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="sm" onClick={handlePaymentClick}>Fizetes</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
