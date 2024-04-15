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
import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";
import {Visibility, VisibilityOff} from "@mui/icons-material";

/**
 * Component for user login.
 * @returns JSX.Element
 */
function Login(): JSX.Element {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { login } = useAuth();

    /**
     * Handles form submission to log in the user.
     * @param event - Form submit event.
     */
    function getData(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        setError('');
        fetchApiEndpoints('/api/auth/login', { method: 'POST', body: { email, password } })
            .then(async (data) => {
                if (data.errorMessage) {
                    setError(data.errorMessage);
                } else {
                    login(data.accessToken);
                    setError('');
                    navigate('/');
                }
            }).catch((error) => {
            setError(error);
        });
    }

    /**
     * Toggles password visibility.
     */
    const handleClickShowPassword = (): void => setShowPassword((show) => !show);

    /**
     * Prevents default event behavior.
     * @param event - Mouse event.
     */
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    };

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
                        placeholder={'Jelszó'}
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
