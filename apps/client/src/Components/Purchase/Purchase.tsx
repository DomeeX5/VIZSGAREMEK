import React, {useState} from "react";
import { Address } from "@prisma/client";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { fetchApiEndpoints } from "../getFetchApi.tsx";
import {useAuth} from "../Login/AuthContextProvider.tsx";

function Purchase() {
    const [paymentType, setPaymentType] = useState("");
    const {token} = useAuth();
    const [address, setAddress] = useState({
        country: '',
        state: '',
        city: '',
        street: '',
        house_number: ''
    });
    const [activeStep, setActiveStep] = useState(0);
    const [_, setErrors] = useState<string[]>([]);
    const steps = ['Szállítás helye', 'Fizetés', 'Adatok ellenőrzése'];
    const [helperTextVisible, setHelperTextVisible] = useState({
        country: false,
        state: false,
        city: false,
        street: false,
        house_number: false,
    });

    const handleFocus = (field: keyof Address) => {
        setHelperTextVisible({ ...helperTextVisible, [field]: true });
    };

    const handleBlur = () => {
        setHelperTextVisible({
            country: false,
            state: false,
            city: false,
            street: false,
            house_number: false,
        });
    };

    const handlePaymentTypeChange = (event: SelectChangeEvent<{ value: unknown }>) => {
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

        fetchApiEndpoints('/api/order/new', {accessToken: token, method: 'POST', body: {paymentType, address}})
            .then(async res => {
                if (!res.ok) {
                    setErrors([res.errorMessage]);
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
                <Box sx={{ width: '75%', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
                                <h1 style={{ margin: '10px' }}>Adatok megadása</h1>
                                <div className={"break"}></div>
                                <TextField
                                    label="Country"
                                    value={address.country}
                                    onChange={(e) => handleAddressChange(e, 'country')}
                                    style={{ margin: '0 0 0 10px' }}
                                    helperText={helperTextVisible.country ? "Add meg az országod nevét" : ""}
                                    required
                                    onFocus={() => handleFocus('country')}
                                    onBlur={handleBlur} /><br />
                                <TextField label="State" value={address.state} onChange={(e) => handleAddressChange(e, 'state')} style={{ margin: '10px' }} helperText={helperTextVisible.state ? "Add meg a megyédnek a nevét" : ""} required onFocus={() => handleFocus('state')} onBlur={handleBlur} /><br />
                                <TextField label="City" value={address.city} onChange={(e) => handleAddressChange(e, 'city')} style={{ margin: '10px' }} helperText={helperTextVisible.city ? "Addja meg hogy melyik városban lakik" : ""} required onFocus={() => handleFocus('city')} onBlur={handleBlur} /><br />
                                <TextField label="Street" value={address.street} onChange={(e) => handleAddressChange(e, 'street')} style={{ margin: '10px' }} helperText={helperTextVisible.street ? "Addja meg melyik utcáját" : ""} required onFocus={() => handleFocus('street')} onBlur={handleBlur} /><br />
                                <TextField label="House Number" value={address.house_number} onChange={(e) => handleAddressChange(e, 'house_number')} style={{ margin: '10px' }} helperText={helperTextVisible.house_number ? "Addja meg a házszámát" : ""} required onFocus={() => handleFocus('house_number')} onBlur={handleBlur} /><br />
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                <div className={"break"}></div>
                                <TextField label="Kártyaszám" type="text" style={{ margin: '0 0 0 10px' }} helperText={helperTextVisible.country ? "Adja meg a kártyaszámát. PL: 1234 1234 1234 1234" : ""} required onFocus={() => handleFocus('country')} onBlur={handleBlur} fullWidth />
                                <TextField label="Lejárati idő" type="text" style={{ margin: '0 0 0 10px' }} helperText={helperTextVisible.country ? "Adja meg a kártyája lejárati dátumát" : ""} required onFocus={() => handleFocus('country')} onBlur={handleBlur} fullWidth />
                                <TextField label="Tulajdonos neve" type="text" style={{ margin: '0 0 0 10px' }} helperText={helperTextVisible.country ? "Adja meg a kártya elején lévő tulajdonos nevét." : ""} required onFocus={() => handleFocus('country')} onBlur={handleBlur} fullWidth />
                                <TextField label="CVV" type="text" style={{ margin: '0 0 0 10px' }} helperText={helperTextVisible.country ? "Fordítsa meg a kártyáját és látni fog egy háromjegyű számot azt adja meg. Pl:123" : ""} required onFocus={() => handleFocus('country')} onBlur={handleBlur} fullWidth />
                                <Select value={{ value: paymentType }}
                                        style={{ margin: '0 0 0 10px' }}
                                        onFocus={() => setHelperTextVisible({ ...helperTextVisible, country: true })}
                                        onBlur={() => setHelperTextVisible({ ...helperTextVisible, country: false })}
                                        onChange={() => handlePaymentTypeChange}
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
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Vissza</Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Vásárlás' : 'Következő'}</Button>
                        </Box>
                    </React.Fragment>
                </Box>
            </div>
        </>
    );
}

export default Purchase;
