import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

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
        if (Array.isArray(error) && error.length !== 0) {
            return error.map((err, index) => (
                <div className={"alert alert-warning alert-dismissible fade show Alert"} role="alert" key={index}>
                    {err}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            ));
        } else {
            return null;
        }
    }

    return(
        <>
            <div className={"bodies"}>
                {Navbar()}
                <form onSubmit={getData} className={"NeedContainer"}>
                    <h1 className={'h1-nek'}>Bejelentkezés</h1>
                    <label className={"labelnek"}>Email cím</label><br/>
                    <input
                        type={"text"}
                        name={"email"}
                        id={"email"}
                        className={"textInput"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br/>
                    <label className={"labelnek"}>Jelszo</label><br/>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        className={"textInput"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <p></p>
                    <input type={"submit"} id={"tovabb"} value={"Bejelentkezés"} className="btn btn-primary gomb"/>
                    <p></p>
                    <Link to={"/register"}
                          className={"link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover linkel"}>Nincs
                        fiókod akkor regisztrálj</Link>
                </form>
                <div>
                    {errors()}
                </div>
                {Footer()}
            </div>
        </>
    )
}

export default Login;