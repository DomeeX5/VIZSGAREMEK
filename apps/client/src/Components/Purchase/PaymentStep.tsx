import React from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { CardDetails } from "./types";

interface PaymentStepProps {
    paymentType: string;
    handlePaymentTypeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    helperTextVisible: any;
    handleFocus: (field: keyof CardDetails) => void;
    handleBlur: () => void;
    cardDetails: CardDetails;
    handleCardDetailsChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof CardDetails) => void;
}

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
                        onChange={(e) => handleCardDetailsChange(e, 'cardNumber')}
                        onFocus={() => handleFocus('cardNumber')}
                        onBlur={handleBlur}
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
                    />
                </div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="CVV"
                        type="text"
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.CVV ? "Fordítsa meg a kártyáját és látni fog egy háromjegyű számot azt adja meg. Pl:123" : ""}
                        required
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardDetailsChange(e, 'cvv')}
                        onFocus={() => handleFocus('cvv')}
                        onBlur={handleBlur}
                    />
                    <Select
                        value={paymentType}
                        style={{margin: '10px'}}
                        onChange={() => handlePaymentTypeChange}
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