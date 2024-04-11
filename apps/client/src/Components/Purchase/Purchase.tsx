import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "../Login/AuthContextProvider.tsx";
import { fetchApiEndpoints } from "../getFetchApi.tsx";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import { Button } from "@mui/material";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import { Address, CardDetails } from "./types";

function Purchase() {
    const { token } = useAuth();
    const [paymentType, setPaymentType] = useState<string>("");
    const [address, setAddress] = useState<Address>({
        country: '',
        state: '',
        city: '',
        street: '',
        house_number: ''
    });
    const [activeStep, setActiveStep] = useState<number>(0);
    const [helperTextVisible, setHelperTextVisible] = useState<{
        country: boolean;
        state: boolean;
        city: boolean;
        street: boolean;
        house_number: boolean;
        card_Number: boolean;
        expiration_Date: boolean;
        card_Owner: boolean;
        CVV: boolean;
        purchase_Type: boolean;
    }>({
        country: false,
        state: false,
        city: false,
        street: false,
        house_number: false,
        card_Number: false,
        expiration_Date: false,
        card_Owner: false,
        CVV: false,
        purchase_Type: false,
    });
    const [cardDetails, setCardDetails] = useState<CardDetails>({
        cardNumber: '',
        expirationDate: '',
        cardholderName: '',
        cvv: ''
    });

    const steps: string[] = ['Szállítás helye', 'Fizetés', 'Adatok ellenőrzése'];
    const [_, setErrors] = useState<string[]>([]);

    const handleFocus = (field: keyof Address) => {
        setHelperTextVisible({ ...helperTextVisible, [field]: true });
    };

    const handleFocus2 = (field: keyof CardDetails) => {
        setHelperTextVisible({ ...helperTextVisible, [field]: true });
    };

    const handleBlur = () => {
        setHelperTextVisible({
            country: false,
            state: false,
            city: false,
            street: false,
            house_number: false,
            card_Number: false,
            expiration_Date: false,
            card_Owner: false,
            CVV: false,
            purchase_Type: false,
        });
    };

    const handlePaymentTypeChange = (event: ChangeEvent<{ value: unknown }>) => {
        setPaymentType(event.target.value as string);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        fetchApiEndpoints('/api/order/new', { accessToken: token, method: 'POST', body: { paymentType, address, cardDetails } })
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
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    return (
        <div className={"container"}>
            <Box sx={{ width: '75%', height: '50%', padding: '0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {activeStep === 0 && (
                        <AddressStep
                            address={address}
                            handleAddressChange={(e, field) => setAddress({ ...address, [field]: e.target.value })}
                            helperTextVisible={helperTextVisible}
                            handleFocus={handleFocus}
                            handleBlur={handleBlur}
                        />
                    )}
                    {activeStep === 1 && (
                        <PaymentStep
                            paymentType={paymentType}
                            handlePaymentTypeChange={handlePaymentTypeChange}
                            helperTextVisible={helperTextVisible}
                            handleFocus={handleFocus2}
                            handleBlur={handleBlur}
                            cardDetails={cardDetails}
                            handleCardDetailsChange={(e, field) => setCardDetails({ ...cardDetails, [field]: e.target.value })}
                        />
                    )}
                    {activeStep === 2 && (
                        <ConfirmationStep
                            handleSubmit={handleSubmit}
                        />
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
    );
}

export default Purchase;
