import {FormEvent, useState} from "react";
import {Link} from "react-router-dom";

function Register() {

        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        function sendData(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();

            fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers:{
                    'Content-type':'application/json'
                }
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Rosszul adtad meg az adatokat");
                    } else {
                        return res.json();
                    }
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Hiba történt a fetch kérés során:', error);
                });
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
                    min={6}
                    onChange={(e) => setUsername(e.target.value)}
                    pattern={"^[a-zA-Z0-9]+$\n"}
                />
                <p>Email cím</p>
                <input
                    type={"email"}
                    name={"email"}
                    id={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern={"/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$/"}
                />
                <p>Jelszó</p>
                <input
                    type={"password"}
                    name={"password"}
                    id={"Password"}
                    value={password}
                    min={8}
                    onChange={(e) => setPassword(e.target.value)}
                    pattern={"^(?=.*[A-Z])(?=.*\\d).+"}
                />
                <br/>
                <input type={"submit"} value={"Regisztrálás"}/>
            </form>
            <Link to={"/"}>Vissza a főoldalra</Link>
        </>
    )
    }

    export default Register;