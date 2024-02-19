import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";
import '/src/App.css'
import Navbar from "../Navbar.tsx";

function Register() {

        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState <string[]>([]);

        function sendData(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();
                fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify({ username, email, password }),
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                    .then(async (res) => {
                        if (!res.ok) {
                            setError(await res.json().then(err=>err.message))
                        } else {
                            return res.json();
                        }
                    })
        }

    return (
        <>
            {Navbar()}
            <form onSubmit={sendData}>
                <p>Felhasználó név</p>
                <input
                    type={"text"}
                    name={"name"}
                    id={"Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p>Email cím</p>
                <input
                    type={"text"}
                    name={"email"}
                    id={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Jelszó</p>
                <input
                    type={"password"}
                    name={"password"}
                    id={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input type={"submit"} value={"Regisztrálás"}/>
                <br/>{error.length > 0 && error.map((err, index) => <div className={"error"} key={index}>{err}</div>)}
            </form>
            <Link to={"/"}>Vissza a főoldalra</Link><br/>
            <Link to={"/login"}>Van már fiókod</Link>
        </>
    )
    }

    export default Register;