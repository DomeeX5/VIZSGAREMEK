import { ListGroup, ListGroupItem, Image, Button } from 'react-bootstrap';
import { ExtendedProduct } from '../../interfaces.ts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Style/searchbar.css';

interface Props {
    results: ExtendedProduct[];
}

/**
 * Component for displaying search results.
 * @param {Props} props - Props containing the search results.
 * @returns {JSX.Element} - JSX for rendering search results.
 */

export default function SearchResult(props: Props) {

    return (
        <>
            {/* ListGroup for displaying search results */}
            <ListGroup className="mt-2 search-options col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{width: 539}}>
                {/* Mapping through the search results and rendering each result */}
                {props.results.map((product, index) => (
                    <ListGroupItem
                        onClick={(event) => {
                            event.stopPropagation();
                            console.log(product.product_id)
                        }}
                        key={index}
                        className="d-flex align-items-center"
                        style={{ borderRadius: '0', height: '150px' }}
                    >
                        {/* Rendering product images */}
                        {product.ProductPictures && product.ProductPictures.map((picture, pictureIndex) => (
                            <div key={pictureIndex} className="image-container">
                                <Image src={picture.image} alt={product.product_name} thumbnail className="product-image" />
                            </div>
                        ))}
                        {/* Rendering product name and price */}
                        <div className="ms-3">
                            <h5>{product.product_name}</h5>
                            <p>${product.price}</p>
                        </div>
                        {/* Button for adding product to cart */}
                        <Button variant="outline-dark" className="ms-auto">
                            <ShoppingCartIcon />
                        </Button>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </>
    );
}
