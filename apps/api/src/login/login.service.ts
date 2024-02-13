import {Injectable} from "@nestjs/common";
import {Prisma, User} from "@prisma/client";
import {PrismaService} from "../prisma.service";


@Injectable()
export class LoginService {

    constructor(private prisma: PrismaService) {
    }

    async loginUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput):Promise<User | null>{
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        })
    }

}