import {IsEmail, IsHash, isString, IsStrongPassword, Matches} from "class-validator";

export default class RegisterDto {
    @IsEmail()
    email!: string;

    @Matches(/^\w{6,20}$/, {message: "Invalid username"})
    username!: string;

    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1})
    password!: string;
}