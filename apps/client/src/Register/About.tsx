import {Link} from "react-router-dom";
import Navbar from "../Navbar.tsx";

function About(){
    return(
        <div>
            {Navbar()}
            <p>Hello world!</p>
            <Link to="/register">regisztrálás</Link>
        </div>
    )
}

export default About;