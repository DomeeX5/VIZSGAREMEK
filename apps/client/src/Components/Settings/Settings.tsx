import {Offcanvas} from "react-bootstrap";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {LocalShipping, ManageAccounts} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function Settings() {
    const navigate = useNavigate();

    return (
        <>
            <Offcanvas sm={3} className={'bg-secondary border-0'} scroll={true} backdrop={false} show={true} style={{marginTop: 56, zIndex: 1000}} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Fiók</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('settings/user')} className="nav-link active">
                            <ListItemIcon>
                                <ManageAccounts/>
                            </ListItemIcon>
                            <ListItemText primary={"Adatok"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('settings/user')} className="nav-link active">
                            <ListItemIcon>
                                <LocalShipping/>
                            </ListItemIcon>
                            <ListItemText primary={"Rendeléseim"}/>
                        </ListItemButton>
                    </ListItem>
                </Offcanvas.Body>

            </Offcanvas>
        </>
    )
}

export default Settings;