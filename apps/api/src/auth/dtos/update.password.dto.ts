import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePasswordDto {

    @IsNotEmpty()
    @ApiProperty({example: 'NewPassword123_', description: 'New password of the user', name: 'New password'})
    new_password: string;

    @IsNotEmpty()
    @ApiProperty({example: 'Password123_', description: 'Old password of the user', name: 'Old password'})
    old_password: string;

}