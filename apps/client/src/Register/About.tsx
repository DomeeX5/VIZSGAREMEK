import {Link} from "react-router-dom";

function About(){
    return(
        <div>
            <p>Hello world!</p>
            <Link to="/register">regisztrálás</Link>
            <a href="/register">regisztrálás</a>
        </div>
    )
}

export default About;