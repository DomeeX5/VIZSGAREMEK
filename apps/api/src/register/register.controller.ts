import {Body, Controller, Get, Post} from '@nestjs/common';
import { RegisterService } from './register.service';
import {Prisma} from "@prisma/client";
import RegisterDto from "./register.dto";

@Controller('/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}
    @Post()
    async createUser(@Body() userData: RegisterDto){
        return await this.registerService.createUser(userData)
    }
}
