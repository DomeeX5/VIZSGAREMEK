/**
 * Represents the address details.
 */
export interface Address {
    /** The country of the address. */
    country: string;
    /** The state of the address. */
    state: string;
    /** The city of the address. */
    city: string;
    /** The street of the address. */
    street: string;
    /** The house number of the address. */
    house_number: string;
}

/**
 * Represents the details of a credit card.
 */
export interface CardDetails {
    /** The card number. */
    cardNumber: string;
    /** The expiration date of the card. */
    expirationDate: string;
    /** The name of the cardholder. */
    cardholderName: string;
    /** The CVV code of the card. */
    cvv: string;
}
