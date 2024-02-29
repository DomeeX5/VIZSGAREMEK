import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import './Register-login.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";

    function Register() {

            const [username,setUsername]=useState('')
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [passwordAgain, setPasswordAgain] = useState("");
            const [error, setError] = useState <string[]>([]);

            function sendData(event: FormEvent<HTMLFormElement>) {
                event.preventDefault();
                fetch('/api/auth/register', {
                    method: 'POST',
                    body: JSON.stringify({username, email, password}),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                    .then(async (res) => {
                        if (!res.ok) {
                            return setError(await res.json().then(err => err.message))
                        } else {
                            return res.json();
                        }
                    })
                }

        function errors() {
            if (Array.isArray(error) && error.length !== 0) {
                return error.map((err, index) => (
                    <div className={"alert alert-warning alert-dismissible fade show Alert"} role="alert" key={index}>
                        {err}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                ));
            } else if (password !== passwordAgain) {
                setError(["A jelszavak nem egyeznek."]);
                return;
            } else {
                return null;
            }
        }

        return (
            <>
                <div className={"bodies"}>
                    {Navbar()}
                    <form onSubmit={sendData} className={"NeedContainer"}>
                        <h1 className={"h1-nek"}>Regisztráció</h1>
                        <br/>
                        <label className={"labelnek"}>Username</label><br/>
                        <input
                            type={"text"}
                            name={"username"}
                            id={"Username"}
                            className={"textInput"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /><br/>
                        <label className={"labelnek"}>Email cím</label><br/>
                        <input
                            type={"text"}
                            name={"email"}
                            id={"Email"}
                            className={"textInput"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        /><br/>
                        <label className={"labelnek"}>Jelszó</label><br/>
                        <input
                            type={"password"}
                            name={"password"}
                            id={"Password"}
                            className={"textInput"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br/>
                        <label className={"labelnek"}>Jelszó megerősítése</label><br/>
                        <input
                            type={"password"}
                            name={"password1"}
                            id={"Password1"}
                            value={passwordAgain}
                            className={"textInput"}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                        /><br/>
                        <p></p>
                        <input type={"submit"} value={"Regisztrálás"} className="btn btn-primary gomb"/>
                        <br/>
                        <p></p>
                        <Link to={"/login"}
                              className={"link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover linkel"}>Van
                            már fiókod</Link>
                    </form>
                    <div>
                        {errors()}
                    </div>
                    {Footer()}
                </div>
            </>
        )
    }

export default Register;