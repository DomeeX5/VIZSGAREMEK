import React from "react";
import {MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { CardDetails } from "./types";

/**
 * Props interface for the PaymentStep component.
 */
interface PaymentStepProps {
    paymentType: string;
    handlePaymentTypeChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
    helperTextVisible: any;
    handleFocus: (field: keyof CardDetails) => void;
    handleBlur: () => void;
    cardDetails: CardDetails;
    handleCardDetailsChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof CardDetails) => void;
}

/**
 * PaymentStep component for entering payment details.
 *
 * @remarks
 * This component is used to render and input payment details, including card number, expiration date, cardholder name, and CVV.
 *
 * @param paymentType - Type of payment selected for the order.
 * @param handlePaymentTypeChange - Function to handle payment type change.
 * @param helperTextVisible - Object containing visibility status of helper text for each field.
 * @param handleFocus - Function to handle field focus.
 * @param handleBlur - Function to handle field blur.
 * @param cardDetails - CardDetails object containing card payment details.
 * @param handleCardDetailsChange - Function to handle card details change.
 * @returns JSX element representing the PaymentStep component.
 *
 * @example
 * ```tsx
 * <PaymentStep
 *   paymentType="20"
 *   handlePaymentTypeChange={handlePaymentTypeChange}
 *   helperTextVisible={helperTextVisible}
 *   handleFocus={handleFocus}
 *   handleBlur={handleBlur}
 *   cardDetails={cardDetails}
 *   handleCardDetailsChange={handleCardDetailsChange}
 * />
 * ```
 */
function PaymentStep({ paymentType, handlePaymentTypeChange, helperTextVisible, handleFocus, handleBlur, cardDetails, handleCardDetailsChange }: PaymentStepProps) {
    return (
        <>
            <h1 style={{margin: '10px'}}>Adatok megadása</h1>
            <div className={"break"}></div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="Kártyaszám"
                        type="text"
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.card_Number ? "Adja meg a kártyaszámát. PL: 1234 1234 1234 1234" : ""}
                        required
                        value={cardDetails.cardNumber}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 16) {
                                handleCardDetailsChange(e, 'cardNumber');
                            }
                        }}
                        onFocus={() => handleFocus('cardNumber')}
                        onBlur={handleBlur}
                        disabled={paymentType === "30"}
                    />
                    <TextField
                        label="Lejárati idő"
                        type="text"
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.expiration_Date ? "Adja meg a kártyája lejárati dátumát" : ""}
                        required
                        value={cardDetails.expirationDate}
                        onChange={(e) => handleCardDetailsChange(e, 'expirationDate')}
                        onFocus={() => handleFocus('expirationDate')}
                        onBlur={handleBlur}
                        disabled={paymentType === "30"}
                    />
                    <TextField
                        label="Tulajdonos neve"
                        type="text"
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.card_Owner ? "Adja meg a kártya elején lévő tulajdonos nevét." : ""}
                        required
                        value={cardDetails.cardholderName}
                        onChange={(e) => handleCardDetailsChange(e, 'cardholderName')}
                        onFocus={() => handleFocus('cardholderName')}
                        onBlur={handleBlur}
                        disabled={paymentType === "30"}
                    />
                </div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="CVC"
                        type="text"
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.CVV ? "Fordítsa meg a kártyáját és látni fog egy háromjegyű számot azt adja meg. Pl:123" : ""}
                        required
                        value={cardDetails.cvv}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 3) {
                                handleCardDetailsChange(e, 'cvv');
                            }
                        }}
                        onFocus={() => handleFocus('cvv')}
                        onBlur={handleBlur}
                        disabled={paymentType === "30"}
                    />
                    <Select
                        value={paymentType}
                        style={{margin: '10px'}}
                        onChange={handlePaymentTypeChange}
                        displayEmpty
                        required
                        variant="outlined"
                    >
                        <MenuItem value="10">Utalásos fizetés</MenuItem>
                        <MenuItem value="20">Bankártyás fizetés</MenuItem>
                        <MenuItem value="30">Átvételes fizetés</MenuItem>
                    </Select>
                </div>
            </div>
        </>
    );
}

export default PaymentStep;