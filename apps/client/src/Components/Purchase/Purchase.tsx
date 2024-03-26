import React, {ChangeEvent, useState} from "react";
import {Order} from "@prisma/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";

function Purchase() {

    const [order,setOrder]=useState<Order[]>()
    const [address, setAddress] = useState({
        country: "",
        state: "",
        city: "",
        street: "",
        house_number: ""
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const [_, setErrors] = useState<string[]>([]);
    const steps = [
        'Szállítás helye',
        'Fizetés',
        'Adatok ellenőrzése',
    ];

    console.log(order)

    function createOrder() {
        fetch('/order/new?userid=1', {
            method: 'POST',
            body: JSON.stringify({ payment: 1, address }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(async (res) => {
            if (!res.ok) {
                const error = await res.json();
                setErrors([error.message]);
            } else {
                const data = await res.json();
                setOrder(data);
            }
        });
    }


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <div>
                <Box sx={{width: '100%'}} justifyContent={"center"} textAlign={"center"}>
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
                                <label>Ország</label><br/>
                                <input
                                    type="text"
                                    name="country"
                                    value={address.country}
                                    onChange={handleInputChange}/><br/>
                                <label>Megye</label><br/>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleInputChange}/><br/>
                                <label>Város</label><br/>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleInputChange}/><br/>
                                <label>Utca</label><br/>
                                <input
                                    type="text"
                                    name="street"
                                    value={address.street}
                                    onChange={handleInputChange}/><br/>
                                <label>Házszám</label><br/>
                                <input
                                    type="text"
                                    name="house_number"
                                    value={address.house_number}
                                    onChange={handleInputChange}/><br/>
                                <div className={"break"}></div>
                                <input
                                    type="button"
                                    value={'Vásárlás'}
                                    onClick={createOrder}/><br/>
                                <div className={"break"}></div>
                            </>
                        )}
                        {activeStep === 1 && (
                            <>

                            </>
                        )}
                        {activeStep === 2 && (
                            <>

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
                            <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
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
