import {useState, useEffect, Fragment} from "react";
import {ExtendedCartItem} from "../../interfaces.ts";
import {Link} from "react-router-dom";
import {Button, Card, CardActions, CardContent, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../../styles/cartDesign.css"
import DeleteIcon from '@mui/icons-material/Delete';


function Cart() {
    const [getCart, setGetCart] = useState<ExtendedCartItem[]>([]);
    const [responseData, setResponseData] = useState(null);
    const [_, setErrors] = useState<string[]>([]);

    useEffect(() => {
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }

        fetch(`/api/cart/items`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
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


    }, []);

    function removeCart(){
        fetch("/api/cart/remove",{
            method: "DELETE"
        })
            .then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    setErrors([error.message])
                }else{
                    const data = await res.json();
                    setResponseData(data);
                }
            })
            .catch(error => {
                setErrors(error.message);
            });
    };

    const card = (
        <Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                    Kosar tartalma
                </Typography>
                <Typography variant="h5" component="div">
                    Vasarlas
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <Link to={"/purchase"}>
                <CardActions>
                    <Button size="small" >Fizetes</Button>
                </CardActions>
            </Link>
        </Fragment>
    );

    return (
        <div>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12"}>
                        <ul className={"ul"}>
                            {getCart.map((item) => (
                                <li key={item.product.product_id}>
                                    <div className="card cards mb-3">
                                        <div className="row g-0">
                                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-5 col-5">
                                                <img src={item.product.ProductPictures[0].image} alt={item.product.product_name} className={"card-image img-fluid"}/>
                                            </div>
                                            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-7 col-7">
                                                <div className="card-body card-bodys">
                                                    <h5 className="card-title">{item.product.product_name}</h5>
                                                    <p className="card-text">Darabszam: {item.quantity}</p>
                                                    <IconButton aria-label="delete" size="small" onClick={removeCart} >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={"col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6"}>
                        <Box sx={{ minWidth: 300 }}>
                            <Card variant="outlined">{card}</Card>
                        </Box>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;




