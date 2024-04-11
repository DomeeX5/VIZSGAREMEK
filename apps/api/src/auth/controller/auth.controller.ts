import {Body, Controller, Post, Req} from '@nestjs/common';
import {AuthService} from "../service/auth.service";
import {UsersService} from "../../users/service/users.service";
import {UpdatePasswordDto, UserLoginDto, UserRegisterDto} from "../../users/users.dto";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService) {
    }

    @Post('login')
    async login(@Req() req: any) {
        const user = new UserLoginDto()
        user.email = req.body.email;
        user.password = req.body.password;
        return await this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: UserRegisterDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Post('settings/update-password')
    async updatePassword(@Body() payload: UpdatePasswordDto, @Req() req: Request){
        const userId = req['user'];
        return await this.userService.updatePassword(payload, userId)
    }
}
