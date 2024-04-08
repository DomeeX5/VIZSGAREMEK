import React, { useState } from "react";
import { Address } from "@prisma/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Purchase() {
    const [paymentType, setPaymentType] = useState("");
    const [address, setAddress] = useState({
        country: '',
        state: '',
        city: '',
        street: '',
        house_number: ''
    });
    const [activeStep, setActiveStep] = useState(0);
    const [_, setErrors] = useState<string>();
    const navigate = useNavigate();
    const steps = ['Szállítás helye', 'Fizetés', 'Adatok ellenőrzése'];
    const [showHelperText, setShowHelperText] = useState(false);

    const handleFocus = () => {
        setShowHelperText(true);
    };

    const handleBlur = () => {
        setShowHelperText(false);
    };

    const handlePaymentTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPaymentType(event.target.value as string);
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Address) => {
        setAddress({
            ...address,
            [field]: event.target.value
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        fetch('/api/order/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({ paymentType, address })
        })
            .then(response => response.json())
            .then(async res => {
                if (!res.ok) {
                    setErrors(res.errorMessage);
                } else {
                    const accessToken = await res.accessToken;
                    sessionStorage.setItem("token", accessToken);
                    setErrors('');
                    navigate("/")
                }
            })
            .catch(error => {
                console.error('Failed to submit order:', error);
            });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <>
            <div className={"container"}>
                <Box sx={{width: '75%', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === 0 && (
                            <>
                                <h1 style={{margin:'10px'}}>Adatok megadása</h1>
                                <div className={"break"}></div>
                                <TextField label="Country" value={address.country} onChange={(e) => handleAddressChange(e, 'country')} style={{margin:'0 0 0 10px'}}   helperText={showHelperText ? "Add meg az országod nevét" : ""} required onFocus={handleFocus} onBlur={handleBlur}/><br/>
                                <TextField label="State" value={address.state} onChange={(e) => handleAddressChange(e, 'state')} style={{margin:'10px'}} helperText={showHelperText ? "Add meg a megyédnek a nevét":""} required onFocus={handleFocus} onBlur={handleBlur} /><br/>
                                <TextField label="City" value={address.city} onChange={(e) => handleAddressChange(e, 'city')}  style={{margin:'10px'}} helperText={showHelperText ?"Addja meg hogy melyik városban lakik":""} required onFocus={handleFocus} onBlur={handleBlur} /><br/>
                                <TextField label="Street" value={address.street} onChange={(e) => handleAddressChange(e, 'street')}  style={{margin:'10px'}} helperText={showHelperText ?"Addja meg melyik utcáját":""} required onFocus={handleFocus} onBlur={handleBlur} /><br/>
                                <TextField label="House Number" value={address.house_number} onChange={(e) => handleAddressChange(e, 'house_number')} style={{margin:'10px'}} helperText={showHelperText ?"Addja meg a házszámát":""} required onFocus={handleFocus} onBlur={handleBlur}/><br/>
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                <div className={"break"}></div>
                                <TextField label="Kártyaszám" type="text" style={{margin:'0 0 0 10px'}}  helperText={showHelperText ?"Adja meg a kártyaszámát. PL: 1234 1234 1234 1234":""} required onFocus={handleFocus} onBlur={handleBlur} fullWidth />
                                <TextField label="Lejárati idő" type="text" style={{margin:'0 0 0 10px'}}  helperText={showHelperText ?"Adja meg a kártyája lejárati dátumát":""} required onFocus={handleFocus} onBlur={handleBlur} fullWidth />
                                <TextField label="Tulajdonos neve" type="text" style={{margin:'0 0 0 10px'}}  helperText={showHelperText ?"Adja meg a kártya elején lévő tulajdonos nevét.":""} required onFocus={handleFocus} onBlur={handleBlur} fullWidth />
                                <TextField label="CVV" type="text" style={{margin:'0 0 0 10px'}}  helperText={showHelperText ?"Fordítsa meg a kártyáját és látni fog egy háromjegyű számot azt adja meg. Pl:123":""} required onFocus={handleFocus} onBlur={handleBlur} fullWidth />
                                <Select value={paymentType}
                                        style={{margin:'0 0 0 10px'}}
                                        helperText={showHelperText ?"Válassza ki hogy hogyan fizet":""}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onChange={handlePaymentTypeChange}
                                        displayEmpty
                                        required
                                        fullWidth
                                        variant="outlined"
                                >
                                    <MenuItem value="10">Utalásos fizetés</MenuItem>
                                    <MenuItem value="20">Bankártyás fizetés</MenuItem>
                                    <MenuItem value="30">Átvételes fizetés</MenuItem>
                                </Select>
                                <div className={"break"}></div>
                            </>
                        )}
                        {activeStep === 2 && (
                            <>
                                <Button variant="contained" onClick={handleSubmit}>Fizetés</Button>
                            </>
                        )}
                    </div>
                        <React.Fragment>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>Vissza</Button>
                                <Box sx={{flex: '1 1 auto'}} />
                                <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Vásárlás' : 'Következő'}</Button>
                            </Box>
                        </React.Fragment>
                    </Box>
            </div>
        </>
    );
}

export default Purchase;
