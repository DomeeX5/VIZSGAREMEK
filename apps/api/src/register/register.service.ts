import {BadRequestException, Injectable} from "@nestjs/common";
import {Prisma, User} from "@prisma/client";
import {PrismaService} from "../prisma.service";
import * as bcrypt from 'bcrypt'
import {hash} from "bcrypt";


@Injectable()
export class RegisterService {

    constructor(private prisma: PrismaService) {
    }
    async createUser(data: Prisma.UserCreateInput): Promise<User | null> {


        return this.prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: await bcrypt.hash(data.password, 10)
            },
        })
    }

}