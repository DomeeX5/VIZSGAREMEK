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
                <p>Felhasználó név</p>
                <input type={"text"}/>
                <p>Email cím</p>
                <input type={"text"}/>
                <p>Jelszó</p>
                <input type={"text"}/>
                <p>Jelszó megerősítése</p>
                <input type={"text"}/>
                <button type={"submit"}>Regisztrálás</button>
        </>
    )
}

export default Register;