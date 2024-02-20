import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {UserDto} from "./users.dto";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/register')
  async createUser(@Body() userData: UserDto){
    return await this.usersService.createUser(userData)
  }

  /*@Post('/login')
  public async login(@Body() loginUserDto: LoginDto): Promise<any> {
    return await this.usersService.loginUser(loginUserDto);
  }*/
}
