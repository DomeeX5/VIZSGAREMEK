import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";
import Navbar from "../Main_elements/Navbar.tsx";
import Footer from "../Main_elements/Footer.tsx";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

function Login(){

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState<string>('');

    function getData(event:FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({username: email, password}),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.errorMessage) {
                    setError(data.errorMessage);
                } else {
                    const accessToken = data.accessToken;
                    console.log(accessToken);
                    sessionStorage.setItem("token", accessToken);
                    //jwtDecode(accessToken)
                    setError('');
                }
            })
            .catch(err => {
                setError('Hiba történt a kérés során.');
            });
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        fiókod akkor regisztrálj
                    </Link>
                </form>
                <div>
                    {error !== '' && (
                        <div className={"alert alert-warning alert-dismissible fade show Alert"} role="alert">
                            {error}
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setError('')}></button>
                        </div>
                    )}
                </div>
                {Footer()}
            </div>
        </>
    )
}

export default Login;