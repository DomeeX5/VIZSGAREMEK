import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/App.css'
import {Button, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Navbar(){



    function handleLogout() {
        sessionStorage.removeItem("token");
    }

    return(
        <>
            <header>
                <nav className="navbar navbar-dark bg-dark sticky-top ">
                    <div className="container-fluid">
                        <Link to={"/"} className="navbar-brand Webshop">
                            Webshop
                        </Link>
                        <ul className="navbar-nav mx-auto col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                            <form className="d-flex justify-content-center" role="search">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                />
                                <Button type={'submit'} variant="contained" size="small" color="success" endIcon={<SearchRoundedIcon />}>
                                    Send
                                </Button>
                            </form>
                        </ul>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex={-1} id="offcanvasDarkNavbar"
                             aria-labelledby="offcanvasDarkNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"
                                        aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                    <li className="nav-item">
                                        <Link to={"/cart"} className="nav-link active">
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemIcon>
                                                        <ShoppingCartIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Kosar" />
                                                </ListItemButton>
                                            </ListItem>
                                        </Link>
                                    </li>
                                    {sessionStorage.getItem("token") && (
                                        <li className="nav-item">
                                            <a href={"/"} onClick={handleLogout} className="nav-link active">
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <LogoutIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Kijelentkezes" />
                                                    </ListItemButton>
                                                </ListItem>
                                            </a>
                                        </li>
                                    )}
                                    {!sessionStorage.getItem("token") && (
                                        <>
                                            <li className="nav-item">
                                                <Link to={"/login"} className="nav-link active">
                                                    <ListItem disablePadding>
                                                        <ListItemButton>
                                                            <ListItemIcon>
                                                                <LoginIcon/>
                                                            </ListItemIcon>
                                                            <ListItemText primary="Bejelentkezés" />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to={"/register"} className="nav-link active">
                                                    <ListItem disablePadding>
                                                        <ListItemButton>
                                                            <ListItemIcon>
                                                                <PersonAddRoundedIcon/>
                                                            </ListItemIcon>
                                                            <ListItemText primary="Regisztráció" />
                                                        </ListItemButton>
                                                    </ListItem>
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar;