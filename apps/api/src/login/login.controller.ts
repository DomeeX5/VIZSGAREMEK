import {Body, Controller, Get, Post} from '@nestjs/common';
import { LoginService } from './login.service';
import {Prisma} from "@prisma/client";

@Controller('/api/register')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}


    @Get()
    createUser(@Body() userData: Prisma.UserWhereUniqueInput){
        return this.loginService.loginUser(userData)
    }
}
