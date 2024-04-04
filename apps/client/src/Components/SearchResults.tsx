import { ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import { ExtendedProduct } from '../interfaces';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../styles/searchbar.css';

interface Props {
    results: ExtendedProduct[];
}

export default function SearchResult(props: Props) {
    return (
        <ListGroup className="mt-2 search-options col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {props.results.map((product, index) => (
                <ListGroupItem key={index} className="d-flex align-items-center" style={{borderRadius:'0'}}>
                    {product.ProductPictures && product.ProductPictures.map((picture, pictureIndex) => (
                        <Image key={pictureIndex} src={picture.image} alt={product.product_name} thumbnail />
                    ))}
                    <div className="ms-3">
                        <h5>{product.product_name}</h5>
                        <p>${product.price}</p>
                    </div>
                    <Button variant="outline-dark" className="ms-auto">
                        <ShoppingCartIcon />
                    </Button>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
}
