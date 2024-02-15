import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Prisma, User} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import * as bcrypt from 'bcrypt'
import {hash} from "bcrypt";
import RegisterDto from "./register.dto";


@Injectable()
export class RegisterService {

    constructor(private prisma: PrismaService) {
    }
    async createUser(registerDto: RegisterDto): Promise<User | null> {


        return this.prisma.user.create({
            data: {
                ...registerDto,
                password: await bcrypt.hash(registerDto.password, 10)
            },
        })
    }

}