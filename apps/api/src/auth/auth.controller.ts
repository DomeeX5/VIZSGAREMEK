import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {UsersService} from "../users/users.service";
import {UserDto} from "../users/users.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req: any) {
        return await this.authService.login(req.user);
    }

    @Post('register')
    async register(@Body() createUserDto: UserDto) {
        return await this.userService.createUser(createUserDto);
    }
}