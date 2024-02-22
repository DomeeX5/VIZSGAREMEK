import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";
import Navbar from "../Navbar.tsx";

function Login(){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState<string[]>([]);

    function getData(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(async (res) => {
                if (!res.ok) {
                    setError(await res.json().then(err => err.message))
                } else {
                    return res.json();
                }
            })
    }


    function errors() {
        if (error.length !== 0) {
            return <div className={"error"}>{error}</div>;
        } else {
            return null;
        }
    }

    return(
        <>
            {Navbar()}
            <form onSubmit={getData}>
                <label>Email cím</label><br/>
                <input
                    type={"text"}
                    name={"email"}
                    id={"email"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br/>
                <label>Jelszo</label><br/>
                <input
                    type={"password"}
                    name={"password"}
                    id={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <p></p>
                    <input type={"submit"} id={"tovabb"} value={"Bejelentkezés"}/>
            </form>
            {errors()}
            <Link to={"/register"}>Nincs fiókod akkor regisztrálj</Link>
        </>
    )
}

export default Login;