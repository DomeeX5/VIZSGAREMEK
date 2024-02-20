import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";
import Navbar from "../Navbar.tsx";

function Login(){

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState<string[]>([]);

    function getData(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        fetch('/api/auth/login',{
            method:'POST',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-type':'application/json'
            }
        })
            .then(async (res)=>{
                if(!res.ok){
                    setError(await res.json().then(err=>err.message))
                }else {
                    return res.json();
                }
            })
        return;
    }

    function errors(){
        if(error.length > 0){
            error.map((err, index) => <div className={"error"} key={index}>{err}</div>)
        } else{
            return null
        }
    }

    return(
        <>
            {Navbar()}
            <form onSubmit={getData}>
                <label>Email cím</label>
                <input
                    type={"text"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br/>
                <label>Jelszo</label>
                <input
                    type={"password"}
                    name={"password"}
                    id={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/>
                <input type={"submit"} value={"Bejelentkezés"}/>
            </form>
            {errors()}
            <Link to={"/register"}>Nincs fiókod akkor regisztrálj</Link>
        </>
    )
}

export default Login;