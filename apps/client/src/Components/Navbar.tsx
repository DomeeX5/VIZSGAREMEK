import {Button, Container, Form, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import {Link} from "react-router-dom";
import '/src/App.css'
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import {useEffect, useState} from "react";


function Navbars() {

    const [tokenPresent, setTokenPresent] = useState(Boolean(sessionStorage.getItem("token")));

    useEffect(() => {
        setTokenPresent(Boolean(sessionStorage.getItem("token")));
    }, []);

    function handleCartClick(event:MouseEvent) {
        if (!tokenPresent) {
            event.preventDefault();
            alert("Ahhoz, hogy a kosarat meg tud nézni, be kell jelentkezned.");
        }
    }

    function handleLogout() {
        sessionStorage.removeItem("token");
        setTokenPresent(false);
    }

    return (
        <Navbar expand={false} className="bg-body-tertiary mb-3" sticky="top" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Link to={"/"}>
                    <Navbar.Brand>Webshop</Navbar.Brand>
                </Link>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type={'submit'} variant="contained" size="sm" color="success">
                        Send
                    </Button>
                </Form>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
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
                            <Link to={"/cart"} className="nav-link active" onClick={handleCartClick}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ShoppingCartIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Kosar" />
                                </ListItemButton>
                            </Link>
                            {sessionStorage.getItem("token") && (
                                <ListItem disablePadding className="nav-item">
                                    <a href={"/"} onClick={handleLogout} className="nav-link active">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <LogoutIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary="Kijelentkezes" />
                                        </ListItemButton>
                                    </a>
                                </ListItem>
                            )}
                            {!sessionStorage.getItem("token") && (
                                <>
                                    <ListItem disablePadding className="nav-item">
                                        <Link to={"/login"} className="nav-link active">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <LoginIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="Bejelentkezés" />
                                            </ListItemButton>
                                        </Link>
                                    </ListItem>
                                    <ListItem disablePadding className="nav-item">
                                        <Link to={"/register"} className="nav-link active">
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PersonAddRoundedIcon/>
                                                </ListItemIcon>
                                                <ListItemText primary="Regisztráció" />
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
