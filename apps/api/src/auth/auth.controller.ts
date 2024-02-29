import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UsersService} from "../users/users.service";
import {UserLoginDto, UserRegisterDto} from "../users/users.dto";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @Post('login')
    async login(@Request() req: any) {
        const user = new UserLoginDto()
        user.email = req.body.email;
        user.password = req.body.password;
        return await this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto) {
        return await this.userService.createUser(createUserDto);
    }
}
