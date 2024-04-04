import React, { useState } from "react";
import { Address } from "@prisma/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
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

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <div className={"container"}>
                <Box sx={{width: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
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
                                <div className={"break"}></div>
                                <TextField label="Country" value={address.country} onChange={(e) => handleAddressChange(e, 'country')} fullWidth />
                                <TextField label="State" value={address.state} onChange={(e) => handleAddressChange(e, 'state')} fullWidth />
                                <TextField label="City" value={address.city} onChange={(e) => handleAddressChange(e, 'city')} fullWidth />
                                <TextField label="Street" value={address.street} onChange={(e) => handleAddressChange(e, 'street')} fullWidth />
                                <TextField label="House Number" value={address.house_number} onChange={(e) => handleAddressChange(e, 'house_number')} fullWidth />
                                <div className={"break"}></div>
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                <div className={"break"}></div>
                                <TextField label="Kártyaszám" type="text" fullWidth />
                                <TextField label="Lejárati idő" type="text" fullWidth />
                                <TextField label="Tulajdonos neve" type="text" fullWidth />
                                <TextField label="CVV" type="text" fullWidth />
                                <div className={"break"}></div>
                                <Select value={paymentType} onChange={() => handlePaymentTypeChange} displayEmpty fullWidth variant="outlined">
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
                    {activeStep === steps.length ? (
                        <React.Fragment>
                              <Typography sx={{mt: 2, mb: 1}}>All steps completed - you&apos;re finished</Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>Vissza</Button>
                                <Box sx={{flex: '1 1 auto'}} />
                                <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Vásárlás' : 'Következő'}</Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </div>
        </>
    );
}

export default Purchase;
