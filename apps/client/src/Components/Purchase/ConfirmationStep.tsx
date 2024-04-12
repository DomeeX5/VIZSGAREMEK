import { Address, CardDetails } from "./types";

interface ConfirmationStepProps {
    address: Address;
    paymentType: string;
    cardDetails: CardDetails;
}

function ConfirmationStep({ address, paymentType, cardDetails }: ConfirmationStepProps) {
    interface PaymentTypeMap {
        [key: string]: string;
    }

    const paymentTypeMap: PaymentTypeMap = {
        "10": "Utalásos fizetés",
        "20": "Bankártyás fizetés",
        "30": "Átvételes fizetés"
    };

    return (
        <>
            <h1>Ellenőrzés</h1>
            <div style={{ display: "flex" ,margin:'2px'}}>
                <div style={{ flex: 1 }}>
                    <p>Ország: {address.country}</p>
                    <p>Megye: {address.state}</p>
                    <p>Város: {address.city}</p>
                    <p>Utca: {address.street}</p>
                    <p>Házszám: {address.house_number}</p>
                </div>
                <div style={{flex: 1}}>
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