import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO (Data Transfer Object) for updating user password.
 */
export class UpdatePasswordDto {

    /**
     * New password of the user.
     * @example 'NewPassword123_'
     * @description New password of the user.
     * @name New password
     */
    @IsNotEmpty()
    @ApiProperty({ example: 'NewPassword123_', description: 'New password of the user', name: 'New password' })
    new_password: string;

    /**
     * Old password of the user.
     * @example 'Password123_'
     * @description Old password of the user.
     * @name Old password
     */
    @IsNotEmpty()
    @ApiProperty({ example: 'Password123_', description: 'Old password of the user', name: 'Old password' })
    old_password: string;

}
