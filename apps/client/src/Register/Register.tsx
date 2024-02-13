import {useEffect, useState} from "react";

function Register() {
    const [register, setRegister] = useState('');

    useEffect(() => {
        fetch('/api/register')
            .then((res) => res.text())
            .then(setRegister)
    }, []);

    return (
        <>
            <h1>{register}</h1>
            <form method={"post"} action={"/register-success"}>
                <p>Felhasználó név</p>
                <input type={"text"}/>
                <p>Email cím</p>
                <input type={"text"}/>
                <p>Jelszó</p>
                <input type={"text"}/>
                <p>Jelszó megerősítése</p>
                <input type={"text"}/>
                <input type="submit" />
                <button type={"submit"}>Regisztrálás</button>
            </form>
        </>
    )
}

export default Register;