import {useState} from "react";
import {Link} from "react-router-dom";

function Register() {
    const [,] = useState('');

    function sendData() {
        const nameInput = document.getElementById("Username") as HTMLInputElement;
        const emailInput = document.getElementById("Email") as HTMLInputElement;
        const passwordInput = document.getElementById("Password") as HTMLInputElement;
        const cPasswordInput = document.getElementById("CorrectPassword") as HTMLInputElement;

        const name = nameInput.value
        const email = emailInput.value
        const password = passwordInput.value
        const correctPassword = cPasswordInput.value

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify({name, email, password, correctPassword})
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Rosszul adtad meg az adatokat")
                } else {
                    return res.json()
                }
            })
            .then(data => {
                console.log(data)
            })
    }

    return (
        <>
            <form method={"post"} action={"/register-success"}>
                <p>Felhasználó név</p>
                <input type={"text"}  id={"Username"}/>
                <p>Email cím</p>
                <input type={"email"} id={"Email"}/>
                <p>Jelszó</p>
                <input type={"password"} id={"Password"}/>
                <p>Jelszó megerősítése</p>
                <input type={"password"} id={"CorrectPassword"}/>
                <br/>
                <Link to={"/"}>
                    <input type={"submit"} onClick={sendData}>Regisztrálás</input>
                </Link>
            </form>
        </>
    )
}

export default Register;