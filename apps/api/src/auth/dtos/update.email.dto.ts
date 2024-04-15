import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateEmailDto {

    @IsNotEmpty()
    @ApiProperty({example: 'newemail@example.com', description: 'New email of the user', name: 'New email'})
    new_email: string;

    @IsNotEmpty()
    @ApiProperty({example: 'example@email.com', description: 'Old email of the user', name: 'Old email'})
    old_email: string;

}