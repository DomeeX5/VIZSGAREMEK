import { IsString } from "class-validator";

/**
 * Data transfer object for address information.
 */
export class AddressDto {
    /**
     * The country of the address.
     */
    @IsString()
    country!: string

    /**
     * The state of the address.
     */
    @IsString()
    state!: string

    /**
     * The city of the address.
     */
    @IsString()
    city!: string

    /**
     * The street of the address.
     */
    @IsString()
    street!: string

    /**
     * The house number of the address.
     */
    @IsString()
    house_number!: string
}
