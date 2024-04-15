import { Address, CardDetails } from "./types";

/**
 * Props interface for the ConfirmationStep component.
 */
interface ConfirmationStepProps {
    address: Address;
    paymentType: string;
    cardDetails: CardDetails;
}

/**
 * ConfirmationStep component to display and confirm order details.
 *
 * @remarks
 * This component is used to render and confirm order details, including address and payment information.
 *
 * @param address - Address object containing address details.
 * @param paymentType - Type of payment selected for the order.
 * @param cardDetails - CardDetails object containing card payment details.
 * @returns JSX element representing the ConfirmationStep component.
 *
 * @example
 * ```tsx
 * <ConfirmationStep
 *   address={addressData}
 *   paymentType="20"
 *   cardDetails={cardDetailsData}
 * />
 * ```
 */
function ConfirmationStep({ address, paymentType, cardDetails }: ConfirmationStepProps) {
    /**
     * Interface to map payment type codes to their corresponding descriptions.
     */
    interface PaymentTypeMap {
        [key: string]: string;
    }

    // Map payment type codes to descriptions
    const paymentTypeMap: PaymentTypeMap = {
        "10": "Utalásos fizetés",
        "20": "Bankártyás fizetés",
        "30": "Átvételes fizetés"
    };

    return (
        <>
            <h1>Ellenőrzés</h1>
            <div style={{ display: "flex", margin: '2px' }}>
                <div style={{ flex: 1 }}>
                    <p>Ország: {address.country}</p>
                    <p>Megye: {address.state}</p>
                    <p>Város: {address.city}</p>
                    <p>Utca: {address.street}</p>
                    <p>Házszám: {address.house_number}</p>
                </div>
                <div style={{ flex: 1 }}>
                    {paymentType !== "30" && (
                        <>
                            <p>Kártyaszám: {cardDetails.cardNumber}</p>
                            <p>Lejárati idő: {cardDetails.expirationDate}</p>
                            <p>Tulajdonos neve: {cardDetails.cardholderName}</p>
                            <p>CVC: {cardDetails.cvv}</p>
                        </>
                    )}
                    <p>Fizetés típusa: {paymentTypeMap[paymentType]}</p>
                </div>
            </div>
        </>
    );
}

export default ConfirmationStep;
