import React, { useEffect, useState } from "react";
import {
    Col,
    Container,
    Form,
    Navbar as ReactNavbar,
    Offcanvas,
    Row
} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { ExtendedProduct } from "../../interfaces.ts";
import SearchResults from './SearchResults.tsx';
import { useAuth } from "../Login/AuthContextProvider.tsx";
import {useCart} from "../Cart/CartContext.tsx";
import PersonIcon from '@mui/icons-material/Person'
import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";
import './Style/App.css'

/**
 * Navbar component for navigating the application and performing user actions.
 * @returns JSX.Element
 */
function Navbar(): JSX.Element {
    /**
     * Accesses the authentication context to determine user authentication status.
     */
    const { isLoggedIn, logout } = useAuth();

    /**
     * Manages the search functionality.
     */
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ExtendedProduct[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);

    /**
     * Manages the offcanvas state for smaller screens.
     */
    const [showOffcanvas, setShowOffcanvas] = useState<boolean>(false);

    /**
     * Manages the state for medium-sized screens.
     */
    const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);

    /**
     * Manages navigation between different pages.
     */
    const navigate = useNavigate();

    /**
     * Accesses the cart context to retrieve cart count.
     */
    const { cartCount } = useCart();

    /**
     * Retrieves the username from sessionStorage.
     */
    const username = sessionStorage.getItem('username');

    /**
     * Handles the resizing of the screen to determine if it's a medium-sized screen.
     */
    useEffect(() => {
        const handleResize = () => {
            setIsMediumScreen(window.innerWidth <= 857);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Handles the search functionality.
     */
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value === '') {
            setResults([]);
            setShowResults(false);
            return;
        }
        try {
            const response = await fetchApiEndpoints(`/api/products/search?query=${value}`)
            setResults(response);
            setShowResults(true);
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    /**
     * Handles navigation to different pages.
     */
    const handleNavigation = (destination: string) => {
        navigate(destination);
        setShowOffcanvas(false);
    }

    return (
        <>
            <ReactNavbar expand={false} className={`bg-body-tertiary mb-3`} sticky="top" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Link to="/">
                        <label className="button">Techtronics</label>
                    </Link>
                    {isMediumScreen ? null : (
                        <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className={`me-2 searchbar ${searching ? 'focused' : ''}`}
                                aria-label="Search"
                                value={query}
                                onChange={handleSearch}
                                onFocus={() => setSearching(true)}
                                onBlur={() => setSearching(false)}
                            />
                        </Form>
                    )}
                    <ReactNavbar.Toggle onClick={() => setShowOffcanvas(!showOffcanvas)} aria-controls="offcanvasNavbar" />
                    <ReactNavbar.Offcanvas
                        style={{zIndex: 1050}}
                        show={showOffcanvas}
                        onHide={() => setShowOffcanvas(false)}
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end">

                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">
                                {isLoggedIn ? username : "Menu"}
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                                {isLoggedIn ? (
                                    <>
                                        <ListItem disablePadding >
                                            <ListItemButton onClick={() => handleNavigation('/cart')}>
                                                <ListItemIcon>
                                                    <ShoppingCartIcon /><sup>{cartCount}</sup>
                                                </ListItemIcon>
                                                <ListItemText primary="Kosár" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => handleNavigation('/settings')}>
                                                <ListItemIcon>
                                                    <PersonIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={"Fiók"}/>
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => {logout(), handleNavigation('/')}}>
                                                <ListItemIcon>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Kijelentkezés" />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                ) : (
                                    <>
                                        <ListItem disablePadding >
                                            <ListItemButton onClick={() => handleNavigation('/login')}>
                                                <ListItemIcon>
                                                    <LoginIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Bejelentkezés" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={() => handleNavigation('/register')}>
                                                <ListItemIcon>
                                                    <PersonAddRoundedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Regisztráció" />
                                            </ListItemButton>
                                        </ListItem>
                                    </>
                                )}
                            {isMediumScreen ? (
                                <Form className="d-flex mt-3" onSubmit={(e) => e.preventDefault()}>
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className={`me-2 ${searching ? 'focused' : ''}`}
                                        aria-label="Search"
                                        value={query}
                                        onChange={handleSearch}
                                        onFocus={() => setSearching(true)}
                                        onBlur={() => setSearching(false)}
                                    />
                                </Form>
                            ) : null}
                        </Offcanvas.Body>
                    </ReactNavbar.Offcanvas>
                </Container>

            </ReactNavbar>
            <Container fluid="md" className={`search-container ${showResults && searching ? 'active' : 'inactive'}`}>
                <Row>
                    <Col></Col>
                    <Col>{showResults && <SearchResults results={results} />}</Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    );
}

export default Navbar;
