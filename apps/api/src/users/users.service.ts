import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UserDto, UpdatePasswordDto} from "./users.dto";
import {compare, genSalt, hash} from "bcrypt"
import {User} from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }
    async loginUser( email: string ): Promise<User | undefined> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (typeof user === undefined) {
            return null;
        }
        return user as User;
    }
    async createUser(registerDto: UserDto): Promise<any> {
        const userInDb = await this.prisma.user.findFirst({
            where: {email: registerDto.email}
        });
        if (userInDb) {
            throw new HttpException("user_already_exist",
                HttpStatus.CONFLICT);
        }

        const genSaltOrRound = await genSalt(10)
        return this.prisma.user.create({
            data: {
                ...registerDto,
                password: await hash(registerDto.password, genSaltOrRound)
            }
        });
    }

    /*async updatePassword(payload: UpdatePasswordDto, id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {user_id: id}
        });
        if (!user) {
            throw new HttpException("invalid_credentials",
                HttpStatus.UNAUTHORIZED);
        }
        // compare passwords
        const areEqual = await compare(payload.old_password,
            user.password);
        if (!areEqual) {
            throw new HttpException("invalid_credentials",
                HttpStatus.UNAUTHORIZED);
        }
        return this.prisma.user.update({
            where: {user_id: id},
            data: {password:  await hash(payload.new_password, 10)}
        });
    }*/
}
