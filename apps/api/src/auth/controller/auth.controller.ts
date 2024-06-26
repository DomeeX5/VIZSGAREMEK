import {Body, Controller, Patch, Post, Put, Req, UseGuards} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserLoginDto} from "../dtos/user.login.dto";
import {UserRegisterDto} from "../dtos/user.register.dto";
import {UpdatePasswordDto} from "../dtos/update.password.dto";
import {UpdateEmailDto} from "../dtos/update.email.dto";


/**
 * Controller responsible for authentication-related endpoints.
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    /**
     * Creates an instance of AuthController.
     * @param authService - The authentication service.
     * @param userService - The users service.
     */
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    /**
     * Logs in a user.
     * @param req - The HTTP request object.
     * @returns A promise resolving to the authentication result.
     */
    @Post('login')
    @ApiOperation({
        summary: 'Logs in a user',
        description: 'Authenticates a user with provided credentials and returns an access token.',
    })
    @ApiBody({
        type: UserLoginDto,
        description: 'User credentials (email and password) for authentication.',
        examples: {
            userLoginExample: {
                summary: 'Example of login request',
                value: {
                    email: 'testUser@test2.com',
                    password: 'Password123_'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'User authenticated successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Invalid credentials.',
    })
    @ApiBearerAuth()
    async login(@Req() req: any): Promise<any> {
        const user = new UserLoginDto();
        user.email = req.body.email;
        user.password = req.body.password;

        return await this.authService.login(user);
    }

    /**
     * Registers a new user.
     * @param createUserDto - The DTO containing user registration data.
     * @returns A promise resolving to the result of user creation.
     */
    @Post('register')
    @ApiOperation({
        summary: 'Registers a new user',
        description: 'Creates a new user account with the provided details.',
    })
    @ApiBody({
        type: UserRegisterDto,
        description: 'User details for registration.',
        examples: {
            userRegisterExample: {
                summary: 'Example of register request',
                value: {
                    username: 'exampleUser',
                    email: 'example@example.com',
                    password: 'Password123_'
                }
            }
        }
    })
    @ApiResponse({
        status: 201,
        description: 'User registered successfully.',
    })
    async register(@Body() createUserDto: UserRegisterDto): Promise<any> {
        return await this.userService.createUser(createUserDto);
    }

    /**
     * Updates user password.
     * @param payload - The DTO containing password update data.
     * @param req - The HTTP request object.
     * @returns A promise resolving to the result of password update.
     */
    @UseGuards(JwtAuthGuard)
    @Put('settings/update-password')
    @ApiOperation({
        summary: 'Updates user password',
        description: 'Updates the password of the currently authenticated user.',
    })
    @ApiBody({
        type: UpdatePasswordDto,
        description: 'New password details.',
        examples: {
            passwordUpdateExample: {
                summary: 'Example of updating password',
                value: {
                    old_password: 'example',
                    new_password: 'example2'
                }
            }
        }

    })
    @ApiResponse({
        status: 200,
        description: 'Password updated successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid credentials',
    })
    @ApiBearerAuth()
    async updatePassword(@Body() payload: UpdatePasswordDto, @Req() req: any): Promise<any> {
        const userId = req.user;
        return await this.userService.updatePassword(payload, userId);
    }


    /**
     * Updates user email.
     * @param payload - The DTO containing email update data.
     * @param req - The HTTP request object.
     * @returns A promise resolving to the result of email update.
     */
    @UseGuards(JwtAuthGuard)
    @Put('settings/update-email')
    @ApiOperation({
        summary: 'Updates user email',
        description: 'Updates the email address of the currently authenticated user.',
    })
    @ApiBody({
        type: UpdateEmailDto,
        description: 'New email address.',
        examples: {
            emailUpdateExample: {
                summary: 'Example of updating email',
                value: {
                    old_email: 'example@example.com',
                    new_email: 'example2@example.com'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Email updated successfully.',
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid credentials.'
    })
    @ApiBearerAuth()

    async updateEmail(@Body() payload: UpdateEmailDto, @Req() req: any): Promise<any> {
        const userId = req.user;
        return await this.userService.updateEmail(payload, userId);
    }
}
