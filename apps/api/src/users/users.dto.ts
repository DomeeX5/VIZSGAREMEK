import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches} from "class-validator";

export class LoginDto {
    @IsEmail({}, {message: "Invalid email"})
    @IsString()
    email!: string;

    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 0}, {message: "Invalid password"})
    @IsString()
    password!: string;
}
export class RegisterDto {
    @IsEmail({}, {message: "Invalid email"})
    @IsString()
    email!: string;

    @Matches(/^\w{6,20}$/, {message: "Invalid username"})
    @IsString()
    username!: string;

    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1}, {message: "Invalid password"})
    @IsString()
    password!: string;
}
export class UpdatePasswordDto {

    @IsNotEmpty()
    new_password: string;

    @IsNotEmpty()
    old_password: string;

}