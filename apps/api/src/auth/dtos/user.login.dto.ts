import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {
    @IsEmail({}, {message: "Invalid email"})
    @IsString()
    @ApiProperty({example: 'example@email.com', description: 'Email of the user', name: 'Email'})
    email!: string;

    @IsString()
    @ApiProperty({example: 'Password123_', description: 'Password of the user', name: 'Password'})
    password!: string;
}