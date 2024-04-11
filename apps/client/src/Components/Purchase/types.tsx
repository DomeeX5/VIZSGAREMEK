export interface Address {
    country: string;
    state: string;
    city: string;
    street: string;
    house_number: string;
}

export interface CardDetails {
    cardNumber: string;
    expirationDate: string;
    cardholderName: string;
    cvv: string;
}