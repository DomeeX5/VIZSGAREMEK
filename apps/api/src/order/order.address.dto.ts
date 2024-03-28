import {IsInt, IsNumberString, IsString} from "class-validator";

export class AddressDto {
    @IsString()
    country!: string

    @IsString()
    state!: string

    @IsString()
    city!: string

    @IsString()
    street!: string

    @IsString()
    house_number!: string
}