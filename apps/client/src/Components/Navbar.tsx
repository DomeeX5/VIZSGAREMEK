import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { ExtendedProduct } from "../interfaces.ts";
import SearchResults from './SearchResults.tsx';
import { useAuth } from "./Login/AuthContextProvider.tsx";

function Navbars() {
    const { isLoggedIn, logout } = useAuth();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ExtendedProduct[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    }, [isLoggedIn]);

    const handleLogout = () => {
        logout();
    }

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value === '') {
            setResults([]);
            setShowResults(false);
            return;
        }
        try {
            const response = await fetch(`/api/products/search?query=${value}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data: ExtendedProduct[] = await response.json();
            setResults(data);
            setShowResults(true);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    const handleNavigation = (destination: string) => {
        navigate(destination);
        setShowOffcanvas(false);
    }

    return (
        <>
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
                    <Navbar.Toggle onClick={() => setShowOffcanvas(!showOffcanvas)} aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        show={showOffcanvas}
                        onHide={() => setShowOffcanvas(false)}
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
                                {isLoggedIn ? (
                                    <>
                                        <ListItem disablePadding className="nav-item">
                                            <ListItemButton onClick={() => handleNavigation('/cart')} className="nav-link active">
                                                <ListItemIcon>
                                                    <ShoppingCartIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Kosár" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding className="nav-item">
                                            <ListItemButton onClick={handleLogout} className="nav-link active">
                                                <ListItemIcon>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Kijelentkezés" />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        <ListItem disablePadding className="nav-item">
                                            <ListItemButton onClick={() => handleNavigation('/login')} className="nav-link active">
                                                <ListItemIcon>
                                                    <LoginIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Bejelentkezés" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding className="nav-item">
                                            <ListItemButton onClick={() => handleNavigation('/register')} className="nav-link active">
                                                <ListItemIcon>
                                                    <PersonAddRoundedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Regisztráció" />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>

            </Navbar>
            <Container fluid="md">
                <Row>
                    <Col></Col>
                    <Col>{showResults && <SearchResults results={results} />}</Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Navbars;
