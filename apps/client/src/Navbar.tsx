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
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rsfboo1980hKD_3-HbVFvKzCD9Eu6lWnpw&usqp=CAU"}
                                alt={"Webshop"}
                                width={"20px"}
                                height={"20px"}
                                className={"bg-dark-subtle"}
                            />
                            <label>Webshop</label>
                        </Link>
                        <form className="d-flex " role="search">
                            <input className="form-control me-2 " type="search" placeholder="Search"
                                   aria-label="Search"/>
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