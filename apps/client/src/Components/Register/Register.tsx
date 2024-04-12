import React, { useState } from "react";
import { FormEvent } from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button, IconButton, InputAdornment, OutlinedInput, TextField} from "@mui/material";
import "./Style/Register-login.css";
import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [error, setError] = useState<string[]>([]);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const sendData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== passwordAgain) {
            setError(["A jelszavak nem egyeznek."]);
            return;
        }

        fetchApiEndpoints('/api/auth/register', {method:'POST',body: { username, email, password }})
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
                    <h1 className={"for-h1"}>Regisztráció</h1>
                    <br />
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        style={{marginTop:'10px',marginBottom:'10px',color:'black'}}
                    />
                    <TextField
                        label="Email cím"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        style={{marginTop:'10px',marginBottom:'10px',color:'black'}}
                    />
                    <OutlinedInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        style={{marginTop:'10px',marginBottom:'10px',color:'black'}}
                        id="outlined-adornment-password1"
                        type={showPassword1 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <OutlinedInput
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        fullWidth
                        style={{marginTop:'10px',marginBottom:'10px',color:'black'}}
                        id="outlined-adornment-password2"
                        type={showPassword2 ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
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
                            "link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover for-link"
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
