import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import { UpdatePasswordDto, UserLoginDto, UserRegisterDto } from '../../users/users.dto';

/**
 * Controller responsible for handling authentication-related endpoints.
 */
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    /**
     * Endpoint for user login.
     * @param req The request object containing user email and password.
     * @returns A Promise resolving to the result of the login operation.
     */
    @Post('login')
    async login(@Req() req: any): Promise<any> {
        // Extract user credentials from the request body
        const user = new UserLoginDto();
        user.email = req.body.email;
        user.password = req.body.password;

        // Perform login operation
        return await this.authService.login(user);
    }

    /**
     * Endpoint for user registration.
     * @param createUserDto DTO containing user registration data.
     * @returns A Promise resolving to the result of the user registration operation.
     */
    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto): Promise<any> {
        // Register the user
        return await this.userService.createUser(createUserDto);
    }

    /**
     * Endpoint for updating user password.
     * @param payload DTO containing update password data.
     * @param req The request object containing user ID.
     * @returns A Promise resolving to the result of the password update operation.
     */
    @Post('settings/update-password')
    async updatePassword(@Body() payload: UpdatePasswordDto, @Req() req: any): Promise<any> {
        // Extract user ID from the request
        const userId = req.user;

        // Update user password
        return await this.userService.updatePassword(payload, userId);
    }
}
