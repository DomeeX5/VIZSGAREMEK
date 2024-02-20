import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches} from "class-validator";

export class UserDto {
    @IsEmail({}, {message: "Invalid email"})
    @IsString()
    email!: string;

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