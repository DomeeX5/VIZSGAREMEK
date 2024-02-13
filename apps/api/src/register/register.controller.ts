import {Body, Controller, Get, Post} from '@nestjs/common';
import { RegisterService } from './register.service';
import {Prisma} from "@prisma/client";

@Controller('/api/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}


    @Get()
    registerPage(){
        return this.registerService.registerPage()
    }

    @Post()
    createUser(@Body() userData: Prisma.UserCreateInput){
        return this.registerService.createUser(userData)
    }
}
