import { useState } from "react";
import { FormEvent } from "react";
import {Link, useNavigate} from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "../../styles/Register-login.css";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [error, setError] = useState<string[]>([]);

    const sendData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== passwordAgain) {
            setError(["A jelszavak nem egyeznek."]);
            return;
        }
        fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.message) {
                    setError([data.message]);
                } else {
                    setError([]);
                    navigate('/login')
                }
            });
    };

    return (
        <>
            <div className={"bodies"}>
                <div>
                    {error.length > 0 && (
                        error.map((err, index) => (
                            <div
                                className={"alert alert-warning alert-dismissible fade show Alert"}
                                role="alert"
                                key={index}
                            >
                                {err}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => {
                                        setError((prevErrors) =>
                                            prevErrors.filter((_, i) => i !== index)
                                        );
                                    }}
                                ></button>
                            </div>
                        ))
                    )}
                </div>
                <form onSubmit={sendData} className={"NeedContainer"}>
                    <h1 className={"h1-nek"}>Regisztráció</h1>
                    <br />
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email cím"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Jelszó"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Jelszó megerősítése"
                        type="password"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        fullWidth
                    />
                    <div className={"break"}>
                        <Button type={"submit"} variant="contained" color="primary">
                            Regisztrálás
                        </Button>
                        <br />
                    </div>
                    <div className={'color'}>Van már fiókod?</div>
                    <Link
                        to={"/login"}
                        className={
                            "link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover linkel"
                        }
                    >
                        Bejelentkezés
                    </Link>
                </form>
            </div>
        </>
    );
}

export default Register;
