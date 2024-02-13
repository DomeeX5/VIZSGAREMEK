import {Body, Controller, Get, Post} from '@nestjs/common';
import { RegisterService } from './register.service';
import {Prisma} from "@prisma/client";

@Controller('/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}


    @Get()
    registerPage(){
        return this.registerService.registerPage()
    }

    @Post('-success')
    createUser(@Body() userData: Prisma.UserCreateInput){
        return this.registerService.createUser(userData)
    }
}
