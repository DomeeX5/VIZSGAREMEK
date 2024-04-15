import {Button, Col, Container, Row} from "react-bootstrap";
import Settings from "./Settings.tsx";
import {TextField, Typography} from "@mui/material";
import {useState} from "react";
import {fetchApiEndpoints} from "../Hooks/getFetchApi.tsx";
import {useAuth} from "../Login/AuthContextProvider.tsx";
import './Style/usersettings.css'

function UserSettings() {
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const {token} = useAuth();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;

    async function postNewPassword() {
        if (oldPassword.length === 0 || newPassword.length === 0) {
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            return;
        }

        await fetchApiEndpoints('/api/auth/settings/update-password',
            {
                accessToken: token,
                body: {
                    old_password: oldPassword,
                    new_password: newPassword
                },
                jsonResponse: false,
                method: 'POST'
        })
    }

    async function postNewEmail(){
        if (oldEmail.length === 0 || newEmail.length === 0) {
            return;
        }


        if (!emailRegex.test(newEmail)) {
            return;
        }

        await fetchApiEndpoints('/api/auth/settings/update-email',
            {
                accessToken: token,
                body: {
                    old_email: oldEmail,
                    new_email: newEmail
                },
                jsonResponse: false,
                method: 'POST'
            })
    }

    return (
        <>
            <Container fluid className={'main-container'}>
                <Row>
                    <Col>
                        <Settings/>
                    </Col>
                    <Col sm={9} className={'main-content'}>
                        <Container>
                            <div className={"div-email"}>
                                <Row>
                                    <Col>
                                        <Typography variant="h3" className="for-h1">Email-cím módosítása</Typography>
                                        <TextField
                                            id="old-email"
                                            label="Régi email-cím"
                                            type="email"
                                            value={oldEmail}
                                            required
                                            onChange={(e) => setOldEmail(e.target.value)}
                                            variant="outlined"
                                            style={{width: 500}}
                                            margin="normal"
                                        /><br/>
                                        <TextField
                                            id="new-email"
                                            label="Új email-cím"
                                            type="email"
                                            required
                                            value={newEmail}
                                            onChange={(e) => setNewEmail(e.target.value)}
                                            variant="outlined"
                                            style={{width: 500}}
                                            margin="normal"
                                        /><br/>
                                        <Button variant={"outline-info"} style={{display: 'flex', float: 'right'}} disabled={!(oldEmail && newEmail && emailRegex.test(newEmail))} onClick={()=>postNewEmail()}>Módosítás</Button>
                                    </Col>
                                </Row>
                            </div>
                            <div className={'div-password'}>
                                <Row>
                                    <Col>
                                        <Typography variant="h3" className="for-h1">Jelszó módosítása</Typography>
                                        <TextField
                                            id="old-password"
                                            label="Régi jelszó"
                                            type="password"
                                            required
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            variant="outlined"
                                            style={{width: 500}}
                                            margin="normal"
                                        /><br/>
                                        <TextField
                                            id="new-password"
                                            label="Új jelszó"
                                            type="password"
                                            required
                                            helperText={"A jelszónak minimum 8 karakterből kell állnia kell benne lennie egy speciális karakternek és számot is kell raknod bele"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            variant="outlined"
                                            style={{width: 500}}
                                            margin="normal"
                                        /><br/>
                                        <Button variant={"outline-info"} style={{display: 'flex', float: 'right'}} disabled={!(oldPassword && newPassword && passwordRegex.test(newPassword))} onClick={() => postNewPassword()}>Módosítás</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserSettings