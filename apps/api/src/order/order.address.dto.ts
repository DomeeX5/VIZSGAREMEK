import {IsInt, IsString} from "class-validator";

export class AddressDto {
    @IsString()
    country!: string

    @IsString()
    state!: string

    @IsString()
    city!: string

    @IsString()
    street!: string

    @IsInt()
    house_number!: number
}