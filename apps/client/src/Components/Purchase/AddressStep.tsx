import React from "react";
import { TextField } from "@mui/material";
import { Address } from "./types";

/**
 * Props interface for the AddressStep component.
 */
interface AddressStepProps {
    address: Address;
    handleAddressChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Address) => void;
    helperTextVisible: any;
    handleFocus: (field: keyof Address) => void;
    handleBlur: () => void;
}


/**
 * AddressStep component to display and manage address information.
 *
 * @remarks
 * This component is used to render and handle changes to address details.
 *
 * @param address - Address object containing address details.
 * @param handleAddressChange - Function to handle address field changes.
 * @param helperTextVisible - Helper text visibility object.
 * @param handleFocus - Function to handle field focus.
 * @param handleBlur - Function to handle field blur.
 * @returns JSX element representing the AddressStep component.
 *
 * @example
 * ```tsx
 * <AddressStep
 *   address={addressData}
 *   handleAddressChange={handleAddressChange}
 *   helperTextVisible={helperTextVisibility}
 *   handleFocus={handleFieldFocus}
 *   handleBlur={handleFieldBlur}
 * />
 * ```
 */
function AddressStep({ address, handleAddressChange, helperTextVisible, handleFocus, handleBlur }: AddressStepProps) {
    const isError = Object.values(address).some(value => !value.trim());

    return (
        <>
            <h1 style={{ margin: '10px' }}>Adatok megadása</h1>
            <div className={"break"}></div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Country"
                        value={address.country}
                        onChange={(e) => handleAddressChange(e, 'country')}
                        style={{ margin: '10px' }}
                        helperText={helperTextVisible.country ? "Add meg az országod nevét" : ""}
                        required
                        onFocus={() => handleFocus('country')}
                        onBlur={handleBlur}
                        className={isError && !address.country.trim() ? 'error' : ''}
                        inputProps={{ pattern: '^[A-Z][a-zA-Z]*$' }}
                    /><br />
                    <TextField
                        label="State"
                        value={address.state}
                        onChange={(e) => handleAddressChange(e, 'state')}
                        style={{ margin: '10px' }}
                        helperText={helperTextVisible.state ? "Add meg a megyédnek a nevét" : ""}
                        required
                        onFocus={() => handleFocus('state')}
                        onBlur={handleBlur}
                        className={isError && !address.state.trim() ? 'error' : ''}
                        inputProps={{ pattern: '^[A-Z][a-zA-Z]*$' }}
                    /><br />
                    <TextField
                        label="City"
                        value={address.city}
                        onChange={(e) => handleAddressChange(e, 'city')}
                        style={{ margin: '10px' }}
                        helperText={helperTextVisible.city ? "Addja meg hogy melyik városban lakik" : ""}
                        required
                        onFocus={() => handleFocus('city')}
                        onBlur={handleBlur}
                        className={isError && !address.city.trim() ? 'error' : ''}
                        inputProps={{ pattern: '^[A-Z][a-zA-Z]*$' }}
                    /><br />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Street"
                        value={address.street}
                        onChange={(e) => handleAddressChange(e, 'street')}
                        style={{ margin: '10px' }}
                        helperText={helperTextVisible.street ? "Addja meg melyik utcáját" : ""}
                        required
                        onFocus={() => handleFocus('street')}
                        onBlur={handleBlur}
                        className={isError && !address.street.trim() ? 'error' : ''}
                    /><br/>
                    <TextField
                        label="House Number"
                        value={address.house_number}
                        onChange={(e) => {
                            const re = /^[0-9\b]+$/;
                            if ((e.target.value === '' || re.test(e.target.value)) && e.target.value.length <= 4) {
                                handleAddressChange(e, 'house_number');
                            }
                        }}
                        style={{ margin: '10px' }}
                        helperText={helperTextVisible.house_number ? "Addja meg a házszámát" : ""}
                        required
                        onFocus={() => handleFocus('house_number')}
                        onBlur={handleBlur}
                        className={isError && !address.house_number.trim() ? 'error' : ''}
                    /><br />
                </div>
            </div>

        </>
    );
}

export default AddressStep;