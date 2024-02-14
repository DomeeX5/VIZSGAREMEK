import {Link} from "react-router-dom";

function About(){
    return(
        <div>
            <p>Hello world!</p>
            <Link to="/register">regisztrálás</Link>
        </div>
    )
}

export default About;