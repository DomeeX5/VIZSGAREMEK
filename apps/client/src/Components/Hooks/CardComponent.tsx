import { ExtendedProduct } from "../../interfaces";
import { Card, CardActions, CardContent, IconButton, Stack, Alert, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../Home/Style/mainDesign.css";
import { useCart } from "../Cart/CartContext";
import { useAddToCart } from "./AddCart";
import { useAuth } from "../Login/AuthContextProvider";

/**
 * Component representing a card displaying product information.
 * @param product - The product information to display.
 * @returns JSX.Element
 */
export default function CardComponent({ product }: { product: ExtendedProduct }): JSX.Element {
    const navigate = useNavigate();
    const { updateCartCount } = useCart();
    const { addToCart, setShowAlert, showAlert } = useAddToCart();
    const { isLoggedIn } = useAuth();

    /**
     * Handles clicking on the card to navigate to the product details page.
     */
    const handleClick = (): void => {
        navigate(`/products/${product.product_id}`);
    };

    /**
     * Handles adding the product to the cart.
     */
    const handleAddToCart = async (): Promise<void> => {
        if (!isLoggedIn) {
            setShowAlert(true);
            return;
        }
        await addToCart(product.product_id, 1);
        await updateCartCount();
    };

    return (
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
            <Card className={"card"}>
                <img
                    src={product.ProductPictures && product.ProductPictures.length > 0 ? product.ProductPictures[0].image : ''}
                    alt={product.product_name} className="card-img-top"/>
                <CardContent>
                    <Typography gutterBottom component="div">
                        {product.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.price}Ft
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
                            <AddShoppingCartIcon/>
                        </IconButton>
                        <Link to={`/products/${product.product_id}`} style={{ textDecoration: 'none' }}>
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
