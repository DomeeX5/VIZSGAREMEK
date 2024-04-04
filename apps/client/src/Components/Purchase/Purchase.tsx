import React, {useState} from "react";
import {Address} from "@prisma/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
import {Button, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";

function Purchase() {

    const [paymentType, setPaymentType] = useState<"" | { value: unknown } | undefined>("");
    const [address, setAddress] = useState({
        country: '',
        state: '',
        city: '',
        street: '',
        house_number:''
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [_, setErrors] = useState<string>();
    const steps = [
        'Szállítás helye',
        'Fizetés',
        'Adatok ellenőrzése',
    ];
    const navigate = useNavigate()
    const accessToken = sessionStorage.getItem('token');
    if (!accessToken) {
        console.log('Nincs accessToken a sessionStorage-ben');
        return;
    }

    const handlePaymentTypeChange = (event: SelectChangeEvent<{ value: unknown }>) => {
        setPaymentType(event.target.value as "");
    };

    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof Address) => {
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
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ paymentType, address })
        })
            .then(response => response.json())
            .then(async res => {
                if (!res.ok)
                {
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
                            {steps.map((label) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <div>
                            {activeStep === 0 && (
                                <>
                                    <div className={"break"}></div>
                                    <label>
                                        Country:
                                        <input
                                            type="text"
                                            value={address.country}
                                            onChange={(e) => handleAddressChange(e, 'country')}/>
                                    </label>
                                    <br/>
                                    <div className={"break"}></div>
                                    <label>
                                        State:
                                        <input
                                            type="text"
                                            value={address.state}
                                            onChange={(e) => handleAddressChange(e, 'state')}/>
                                    </label>
                                    <br/>
                                    <div className={"break"}></div>
                                    <label>
                                        City:
                                        <input
                                            type="text"
                                            value={address.city}
                                            onChange={(e) => handleAddressChange(e, 'city')}/>
                                    </label>
                                    <br/>
                                    <div className={"break"}></div>
                                    <label>
                                        Street:
                                        <input type="text" value={address.street}
                                               onChange={(e) => handleAddressChange(e, 'street')}/>
                                    </label>
                                    <br/>
                                    <div className={"break"}></div>
                                    <label>
                                        House Number:
                                        <input type="text" value={address.house_number}
                                               onChange={(e) => handleAddressChange(e, 'house_number')}/>
                                    </label>
                                    <br/>
                                    <div className={"break"}></div>
                                </>
                            )}
                            {activeStep === 1 && (
                                <>
                                    <div className={"break"}></div>
                                    <label>
                                        Kártyaszám:
                                        <input type="type" maxLength={16}/>
                                    </label><br/>
                                    <div className={"break"}></div>
                                    <label>
                                        Lejárati idő:
                                        <input type="type"/>
                                    </label><br/>
                                    <div className={"break"}></div>
                                    <label>
                                        Tulajdonos neve:
                                        <input type="type" />
                                    </label><br/>
                                    <div className={"break"}></div>
                                    <label>
                                        CVV:
                                        <input type="type" />
                                    </label><br/>
                                    <div className={"break"}></div>
                                    <label>
                                        Payment type:
                                        <Select
                                            value={paymentType}
                                            onChange={handlePaymentTypeChange}
                                            displayEmpty
                                            fullWidth
                                            variant="outlined"
                                        >
                                            <MenuItem value="10">Utalásos fizetés</MenuItem>
                                            <MenuItem value="20">Bankártyás fizetés</MenuItem>
                                            <MenuItem value="30">Átvételes fizetés</MenuItem>
                                        </Select>
                                    </label>
                                    <div className={"break"}></div>
                                </>
                            )}
                            {activeStep === 2 && (
                                <>
                                    <input type="submit" value={"Fizetés"} onClick={handleSubmit}/>
                                </>
                            )}
                        </div>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography sx={{mt: 2, mb: 1}}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                    <Box sx={{flex: '1 1 auto'}}/>
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{mr: 1}}
                                    >
                                        Vissza
                                    </Button>
                                    <Box sx={{flex: '1 1 auto'}}/>
                                    <Button onClick={handleNext}>
                                        {activeStep === steps.length - 1 ? 'Vásárlás' : 'Követkző'}
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
            </div>
        </>
);
}

export default Purchase;
