import { Link, useNavigate } from "react-router-dom";
import React, { FormEvent, useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Alert,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useAuth } from './AuthContextProvider.tsx';
import {fetchApiEndpoints} from "../getFetchApi.tsx";
import {Visibility, VisibilityOff} from "@mui/icons-material";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const { login } = useAuth();

    function getData(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');
        fetchApiEndpoints('/api/auth/login', {method: 'POST', body:{ email, password }})
            .then(async data => {
                if (data.errorMessage) {
                    setError(data.errorMessage)
                } else {
                    login(data.accessToken);
                    setError('');
                    navigate('/');
                }
            }).catch(error => {
            setError(error);
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <>
            <div className="bodies">
                <form onSubmit={getData} className="NeedContainer">
                    <Typography variant="h2" className="for-h1">Bejelentkezés</Typography>
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
                    <OutlinedInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        style={{marginTop:'10px',marginBottom:'10px',color:'black'}}
                        color={'primary'}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Bejelentkezés
                    </Button>
                    <Link to="/register" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover for-link">
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
