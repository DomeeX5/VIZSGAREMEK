import {Component} from "react";
import {ExtendedProduct} from "../interfaces.ts";
import {Card, Button, CardActions, CardContent, IconButton, Stack} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import "../styles/mainDesign.css"

export class CardComponent extends Component<{ product: ExtendedProduct, onClick: () => void }> {
    render() {
        return (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                <Card className={"card"}>
                    <img
                        src={this.props.product.ProductPictures && this.props.product.ProductPictures.length > 0 ? this.props.product.ProductPictures[0].image : ''}
                        alt={this.props.product.product_name} className="card-img-top"/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.props.product.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {this.props.product.price}Ft
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton color="primary" aria-label="add to shopping cart" onClick={this.props.onClick}>
                                <AddShoppingCartIcon/>
                            </IconButton>
                            <Link to={`/products/${this.props.product.product_id}`} style={{textDecoration: 'none'}}>
                                <Button variant="contained" size="small">
                                    Áru megtekintése
                                </Button>
                            </Link>
                        </Stack>
                    </CardActions>
                </Card>
            </div>
        )
    }
}