import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO (Data Transfer Object) for updating user email.
 */
export class UpdateEmailDto {

    /**
     * New email of the user.
     * @example 'newemail@example.com'
     * @description New email of the user.
     * @name New email
     */
    @IsNotEmpty()
    @ApiProperty({ example: 'newemail@example.com', description: 'New email of the user', name: 'New email' })
    new_email: string;

    /**
     * Old email of the user.
     * @example 'example@email.com'
     * @description Old email of the user.
     * @name Old email
     */
    @IsNotEmpty()
    @ApiProperty({ example: 'example@email.com', description: 'Old email of the user', name: 'Old email' })
    old_email: string;

}
