import {Injectable} from "@nestjs/common";
import {Prisma, User} from "@prisma/client";
import {PrismaService} from "../prisma.service";


@Injectable()
export class RegisterService {

    constructor(private prisma: PrismaService) {
    }

    registerPage(){
        return 'Register Page';
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

}