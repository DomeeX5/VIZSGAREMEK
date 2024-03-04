import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/App.css'
import {jwtDecode} from "jwt-decode";
import {useState} from "react";

function Navbar(){

    const [getCart,setGetCart]=useState('')
    const [_, setErrors] = useState<string[]>([]);

    function GetCart(){
        const accessToken = sessionStorage.getItem("token");
        if (!accessToken) {
            console.log("Nincs accessToken a localStorage-ban");
            return;
        }
        const decodedToken = jwtDecode(accessToken);
        fetch(`/api/cart/items/${decodedToken.sub}`,{
            headers:{
                'Content-type':'application/json',
                'Authorization':`Bearer ${accessToken}`
            }
        }).then(async (res) =>{
            if(!res.ok){
                const error=await res.json()
                setErrors([error.message])
            } else {
                const data=await res.json();
                setGetCart(data)
            }
        })
    }

    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-body" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link to={"/"} className="navbar-brand Webshop">
                            Webshop
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
                                <form className="d-flex justify-content-center" role="search">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                    <button
                                        className="btn btn-outline-success mx-auto"
                                        type="submit"
                                    >
                                        Search
                                    </button>
                                </form>
                            </ul>
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <Link
                                      to={"/cart"}
                                      onClick={GetCart}
                                      className="nav-link active"
                                      defaultValue={getCart}
                                    >
                                        Kosár
                                    </Link>
                                </li>
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