import {IsEmail, IsHash, IsString, isString, IsStrongPassword, Matches} from "class-validator";

export default class RegisterDto {
    @IsEmail({})
    @IsString()
    email!: string;

    @Matches(/^\w{6,20}$/, {message: "Invalid username"})
    @IsString()
    username!: string;

    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1}, {message: "Invalid password"})
    @IsString()
    password!: string;
}