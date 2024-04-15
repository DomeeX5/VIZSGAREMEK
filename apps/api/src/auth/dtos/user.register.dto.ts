import { IsEmail, IsString, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO (Data Transfer Object) for user registration.
 */
export class UserRegisterDto {

    /**
     * Email of the user.
     * @example 'example@email.com'
     * @description Email of the user.
     * @name Email
     */
    @IsEmail({}, { message: "Invalid email" })
    @IsString()
    @ApiProperty({ example: 'example@email.com', description: 'Email of the user', name: 'Email' })
    email!: string;

    /**
     * Name of the user.
     * @example 'User'
     * @description Name of the user.
     * @name Username
     */
    @IsString()
    @ApiProperty({ example: 'User', description: 'Name of the user', name: 'Username' })
    username!: string;

    /**
     * Password of the user.
     * @example 'Password123_'
     * @description Password of the user.
     * @name Password
     */
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1 }, { message: "Invalid password" })
    @IsString()
    @ApiProperty({ example: 'Password123_', description: 'Password of the user', name: 'Password' })
    password!: string;
}
