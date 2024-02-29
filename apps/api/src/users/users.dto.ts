import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches} from "class-validator";


export class UserLoginDto {
    @IsEmail({}, {message: "Invalid email"})
    @IsString()
    email!: string;

    @IsString()
    password!: string;
}
export class UserRegisterDto {
    @IsEmail({}, {message: "Invalid email"})
    @IsString()
    email!: string;

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