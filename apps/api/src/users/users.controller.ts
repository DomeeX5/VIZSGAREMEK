import {Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {LoginDto, RegisterDto} from "./users.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async createUser(@Body() userData: RegisterDto){
    return await this.usersService.createUser(userData)
  }

  @Post('/login')
  public async login(@Body() loginUserDto: LoginDto): Promise<any> {
    return await this.usersService.loginUser(loginUserDto);
  }
}
