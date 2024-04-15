import React, { useState } from "react";
import { useAuth } from "../Login/AuthContextProvider.tsx";
import { fetchApiEndpoints } from "../Hooks/getFetchApi.tsx";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import Step from "@mui/material/Step";
import {Button, SelectChangeEvent} from "@mui/material";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";
import { Address, CardDetails } from "./types";
import {useNavigate} from "react-router-dom";

/**
 * Purchase component for managing the purchase workflow.
 *
 * @returns JSX element representing the Purchase component.
 */
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
    const [helperTextVisible, setHelperTextVisible] = useState({
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
    const navigate = useNavigate();

    /**
     * Handles focus on a specific field in the address.
     *
     * @param field - Field to focus on.
     */
    const handleFocus = (field: keyof Address) => {
        setHelperTextVisible({ ...helperTextVisible, [field]: true });
    };

    /**
     * Handles focus on a specific field in the card details.
     *
     * @param field - Field to focus on.
     */
    const handleFocus2 = (field: keyof CardDetails) => {
        console.log("Focused on:", field);
        const updatedHelperTextVisible = { ...helperTextVisible, [field]: true };
        console.log("helperTextVisible:", updatedHelperTextVisible);
        setHelperTextVisible(updatedHelperTextVisible);
    };


    /**
     * Handles blur event on the fields.
     */
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

    /**
     * Handles change in payment type.
     *
     * @param event - Change event.
     */
    const handlePaymentTypeChange = (event: SelectChangeEvent<string>, _: React.ReactNode) => {
        setPaymentType(event.target.value as string);
    };

    /**
     * Handles next step in the purchase workflow.
     */
    const handleNext = () => {
        let isValidAddress = true;
        let isPayment=true;


        if (activeStep === 0) {
            Object.values(address).forEach(value => {
                if (!value.trim()) {
                    isValidAddress = false;
                }
            });
        }

        if (activeStep === 1) {
            if (paymentType=== "30"){
                isPayment=true
            } else if (!paymentType || !cardDetails.cardNumber || !cardDetails.expirationDate || !cardDetails.cardholderName || !cardDetails.cvv) {
                isPayment = false;
            }
        }


        if (activeStep === 0 && !isValidAddress) {
            return;
        }

        if (activeStep === 1 && !isPayment) {
            return;
        }

        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    /**
     * Handles going back to the previous step in the purchase workflow.
     */
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    /**
     * Handles finishing the purchase.
     */
    const handleFinish = () => {
        fetchApiEndpoints('/api/order/new', { accessToken: token, method: 'POST', body: { paymentType, address, cardDetails } })
            .then(async res => {
                if (res.ok) {
                    navigate("/");
                } else {
                    setErrors([res.errorMessage]);
                }
            })
            .catch(error => {
                console.error('Failed to submit order:', error);
            });
    };

    return (
        <div className={"container main-container"}>
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
                            address={address}
                            paymentType={paymentType}
                            cardDetails={cardDetails}
                        />
                    )}
                </div>
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>Vissza</Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
                            {activeStep === steps.length - 1 ? 'Vásárlás' : 'Következő'}
                        </Button>
                    </Box>
                </React.Fragment>
            </Box>
        </div>
    );
}

export default Purchase;