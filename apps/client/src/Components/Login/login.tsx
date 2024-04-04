import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { Button, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from './AuthContextProvider.tsx';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const { login } = useAuth();

    function getData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(async data => {
                if (data.errorMessage) {
                    setError(data.errorMessage);
                } else {
                    const accessToken = await data.accessToken;
                    login(accessToken); // Set the access token after successful login
                    setError('');
                    navigate("/");
                }
            })
            .catch(_ => {
                setError('Hiba történt a kérés során.');
            });
    }

    return (
        <>
            <div className="bodies">
                <form onSubmit={getData} className="NeedContainer">
                    <Typography variant="h1" className="h1-nek">Bejelentkezés</Typography>
                    <TextField
                        id="email"
                        label="Email cím"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Jelszó"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Bejelentkezés
                    </Button>
                    <Link to="/register" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover linkel">
                        Nincs fiókod? Regisztrálj itt
                    </Link>
                </form>
                {error && (
                    <Alert severity="error" className="Alert" onClose={() => setError('')}>
                        {error}
                    </Alert>
                )}
            </div>
        </>
    );
}

export default Login;
