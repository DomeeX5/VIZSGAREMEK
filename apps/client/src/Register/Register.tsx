import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";

function Register() {

        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');

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
            <form onSubmit={sendData}>
                <p>Felhasználó név</p>
                <input
                    type={"text"}
                    name={"name"}
                    id={"Username"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />{error && <div>{error}</div>}
                <p>Email cím</p>
                <input
                    type={"email"}
                    name={"email"}
                    id={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />{error && <div>{error}</div>}
                <p>Jelszó</p>
                <input
                    type={"password"}
                    name={"password"}
                    id={"Password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>{error && <div>{error}</div>}
                <input type={"submit"} value={"Regisztrálás"}/>
            </form>
            <Link to={"/"}>Vissza a főoldalra</Link>
        </>
    )
    }

    export default Register;