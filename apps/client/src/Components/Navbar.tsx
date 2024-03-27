import {Button, Container, Form, ListGroup, ListGroupItem, Nav, Navbar, Offcanvas, Image} from 'react-bootstrap';
import {Link} from "react-router-dom";
import '../styles/App.css'
import { ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import React, {useEffect, useState} from "react";
import {ExtendedProduct} from "../interfaces.ts";


function Navbars() {

    const [_, setTokenPresent] = useState(Boolean(sessionStorage.getItem("token")));
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ExtendedProduct[]>([]);

    useEffect(() => {
        setTokenPresent(Boolean(sessionStorage.getItem("token")));
    }, []);

    function handleLogout() {
        sessionStorage.removeItem("token");
        setTokenPresent(false);
    }

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() === '') {
            setResults([]);
            return;
        }
        setQuery(value);
        try {
            const response = await fetch(`/api/products/search?query=${value}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }
    console.log(results)

    return (
        <Navbar expand={false} className="bg-body-tertiary mb-3" sticky="top" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Link to={"/"}>
                    <Navbar.Brand>Webshop</Navbar.Brand>
                </Link>
                <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={query}
                        onChange={handleSearch}
                    />
                    <Button type={'submit'} variant="contained" size="sm" color="success">
                        Send
                    </Button>
                </Form>
                <div style={{maxHeight: '300px', width: '180px', overflowY: 'scroll'}}>
                    <ListGroup className="mt-2">
                        {results.map((product, index) => (
                            <ListGroupItem key={index} className="d-flex align-items-center">
                                {product.ProductPictures.map((picture, index) => (
                                    <Image key={index} src={picture.image} alt={product.product_name} thumbnail/>
                                ))}
                                <div className="ms-3">
                                    <h5>{product.product_name}</h5>
                                    <p>${product.price}</p>
                                </div>
                                <Button variant="outline-dark" className="ms-auto">
                                    <ShoppingCartIcon/>
                                </Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
                {results.length > 0 && (
                    <ListGroup className="mt-2">
                        {results.map((product, index) => (
                            <ListGroupItem key={index} className="d-flex align-items-center">
                                {product.ProductPictures && product.ProductPictures.map((picture, pictureIndex) => (
                                    <Image key={pictureIndex} src={picture.image} alt={product.product_name} thumbnail/>
                                ))}
                                <div className="ms-3">
                                    <h5>{product.product_name}</h5>
                                    <p>${product.price}</p>
                                </div>
                                <Button variant="outline-dark" className="ms-auto">
                                    <ShoppingCartIcon/>
                                </Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
                <Navbar.Toggle aria-controls="offcanvasNavbar"/>
                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {sessionStorage.getItem("token") && (
                                <>
                                    <ListItem disablePadding className="nav-item">
                                        <Link to={"/cart"} className="nav-link active">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <ShoppingCartIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="Kosar"/>
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem disablePadding className="nav-item">
                                        <a href={"/"} onClick={handleLogout} className="nav-link active">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <LogoutIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="Kijelentkezes"/>
                                            </ListItemButton>
                                        </a>
                                    </ListItem>
                                </>
                            )}
                            {!sessionStorage.getItem("token") && (
                                <>
                                    <ListItem disablePadding className="nav-item">
                                        <Link to={"/login"} className="nav-link active">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <LoginIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="Bejelentkezés"/>
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem disablePadding className="nav-item">
                                        <Link to={"/register"} className="nav-link active">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PersonAddRoundedIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="Regisztráció"/>
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                </>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Navbars;
