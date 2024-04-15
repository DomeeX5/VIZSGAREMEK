import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO (Data Transfer Object) for user login.
 */
export class UserLoginDto {

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
     * Password of the user.
     * @example 'Password123_'
     * @description Password of the user.
     * @name Password
     */
    @IsString()
    @ApiProperty({ example: 'Password123_', description: 'Password of the user', name: 'Password' })
    password!: string;
}
