import {Body, Controller, Get, Post} from '@nestjs/common';
import { RegisterService } from './register.service';
import {Prisma} from "@prisma/client";

@Controller('/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}
    @Post()
    async createUser(@Body() userData: Prisma.UserCreateInput){
        return await this.registerService.createUser(userData)
    }
}
