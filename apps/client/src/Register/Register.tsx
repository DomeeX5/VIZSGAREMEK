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
        </>
    )
}

export default Register;