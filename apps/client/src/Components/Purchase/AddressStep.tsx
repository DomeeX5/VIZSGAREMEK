import React from "react";
import { TextField } from "@mui/material";
import { Address } from "./types";

interface AddressStepProps {
    address: Address;
    handleAddressChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Address) => void;
    helperTextVisible: any; // Adjust the type as per your requirements
    handleFocus: (field: keyof Address) => void;
    handleBlur: () => void;
}

function AddressStep({ address, handleAddressChange, helperTextVisible, handleFocus, handleBlur }: AddressStepProps) {
    return (
        <>
            <h1 style={{margin: '10px'}}>Adatok megadása</h1>
            <div className={"break"}></div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="Country"
                        value={address.country}
                        onChange={(e) => handleAddressChange(e, 'country')}
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.country ? "Add meg az országod nevét" : ""}
                        required
                        onFocus={() => handleFocus('country')}
                        onBlur={handleBlur}/><br/>
                    <TextField
                        label="State"
                        value={address.state}
                        onChange={(e) => handleAddressChange(e, 'state')}
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.state ? "Add meg a megyédnek a nevét" : ""}
                        required
                        onFocus={() => handleFocus('state')}
                        onBlur={handleBlur}
                    /><br/>
                    <TextField
                        label="City"
                        value={address.city} onChange={(e) => handleAddressChange(e, 'city')}
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.city ? "Addja meg hogy melyik városban lakik" : ""}
                        required
                        onFocus={() => handleFocus('city')}
                        onBlur={handleBlur}/><br/>
                </div>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="Street"
                        value={address.street}
                        onChange={(e) => handleAddressChange(e, 'street')}
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.street ? "Addja meg melyik utcáját" : ""}
                        required
                        onFocus={() => handleFocus('street')}
                        onBlur={handleBlur}/><br/>
                    <TextField
                        label="House Number"
                        value={address.house_number}
                        onChange={(e) => handleAddressChange(e, 'house_number')}
                        style={{margin: '10px'}}
                        helperText={helperTextVisible.house_number ? "Addja meg a házszámát" : ""}
                        required
                        onFocus={() => handleFocus('house_number')}
                        onBlur={handleBlur}/><br/>
                </div>
            </div>

        </>
    );
}

export default AddressStep;
