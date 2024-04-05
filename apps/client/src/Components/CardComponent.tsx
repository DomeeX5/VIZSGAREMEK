import { ExtendedProduct } from "../interfaces.ts";
import {Card, CardActions, CardContent, IconButton, Stack, Alert, Button} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../styles/mainDesign.css";
import useAddToCart from "./AddCart.tsx";
//import {Button as ButtonReact} from "react-bootstrap";
import {useState} from "react";

export default function CardComponent({ product }: { product: ExtendedProduct }) {
    const navigate = useNavigate();
    const { addToCart, showAlert, setShowAlert } = useAddToCart();
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };
    const handleDecrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };
    const handleClick = () => {
        navigate(`/products/${product.product_id}`);
    };
    const handleAddToCart = () => {
        if (!showAlert) {
            addToCart(product.product_id, count);
        }
    };


    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
            <Card className={"card"}>
                <img
                    src={product.ProductPictures && product.ProductPictures.length > 0 ? product.ProductPictures[0].image : ''}
                    alt={product.product_name} className="card-img-top"/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.price}Ft
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <button
                            className='quantity-button'
                            onClick={handleDecrement}
                        >-</button>
                        <input
                            value={count}
                            disabled
                            className='quantity-number'
                        />
                        <button
                            className='quantity-button'
                            onClick={handleIncrement}
                        >
                            +
                        </button>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
                            <AddShoppingCartIcon/>
                        </IconButton>
                        <Link to={`/products/${product.product_id}`} style={{textDecoration: 'none'}}>
                            <Button variant="contained" size="small" onClick={handleClick}>
                                Áru megtekintése
                            </Button>
                        </Link>
                    </Stack>
                </CardActions>
            </Card>
            {showAlert && (
                <Alert severity="error" className={"Alert"} onClose={() => setShowAlert(false)}>
                    Ahhoz, hogy a kosárba tudd a terméket rakni, be kell jelentkezned.
                </Alert>
            )}
        </div>
    );
}
