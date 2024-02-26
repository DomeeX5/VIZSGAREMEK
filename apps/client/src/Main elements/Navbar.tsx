import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/App.css'

function Navbar(){
    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link to={"/"} className="navbar-brand">
                            <img
                                src={"https://as2.ftcdn.net/v2/jpg/02/22/84/89/1000_F_222848968_M9PMgPrvMPNpzJgb3N70JBpSW9Jt0r6D.jpg"}
                                alt={"Webshop"}
                                width={"25px"}
                                height={"25px"}
                                className={"bg-dark-subtle"}
                            />
                            Webshop
                        </Link>
                        <form className="d-flex mx-auto justify-content-center" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link active">Bejelentkezés</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link active">Regisztráció</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
            </header>
        </>
)
}

export default Navbar;