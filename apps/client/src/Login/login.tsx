import {Link} from "react-router-dom";
import {FormEvent, useState} from "react";
import Navbar from "../Navbar.tsx";

function Login(){

    const [userData,setUserData]=useState({
        email:'',
        password:'',
    })
    const [error,setError]=useState<string[]>([]);

    const handleChange = (event: FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setUserData((prevState) => ({ ...prevState, [name]: value }));
    };

    function errors(){
       if(error.length > 0){
            error.map((err, index) => <div className={"error"} key={index}>{err}</div>)
       } else{
           return null
       }
    }

    function getData(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        fetch('/api/login',{
            method:'POST',
            body: JSON.stringify({userData}),
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

    return(
        <>
            {Navbar()}
            <form onSubmit={getData}>
                <label>Email cím</label>
                <input
                    type={"text"}
                    name={"email"}
                    id={"email"}
                    value={userData.email}
                    onChange={handleChange}
                /><br/>
                <label>Jelszo</label>
                <input
                    type={"password"}
                    name={"password"}
                    id={"password"}
                    value={userData.password}
                    onChange={handleChange}
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