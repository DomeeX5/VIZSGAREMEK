import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {compare, genSalt, hash} from "bcrypt"
import {User} from "@prisma/client";
import {UserRegisterDto} from "../../auth/dtos/user.register.dto";
import {UpdatePasswordDto} from "../../auth/dtos/update.password.dto";
import {UpdateEmailDto} from "../../auth/dtos/update.email.dto";

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }
    async loginUser( email: string ): Promise<User | undefined> {
        return this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
    }
    async createUser(registerDto: UserRegisterDto): Promise<User | { errorMessage: string }> {
        const userInDb = await this.prisma.user.findFirst({
            where: {email: registerDto.email}
        });
        if (userInDb) {
            return {
                errorMessage: "User already exists!"
            }
        } else {
            const genSaltOrRound = await genSalt(10)
            return this.prisma.user.create({
                data: {
                    ...registerDto,
                    password: await hash(registerDto.password, genSaltOrRound)
                }
            });
        }
    }

    async updatePassword(payload: UpdatePasswordDto, userid: { user: {id: number, name: string }, email: string }): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {user_id: userid.user.id}
        });
        const areEqual = await compare(payload.old_password,
            user.password);
        if (!user || !areEqual) {
            throw new HttpException("invalid_credentials",
                HttpStatus.UNAUTHORIZED);
        }

        return this.prisma.user.update({
            where: {user_id: userid.user.id},
            data: {password:  await hash(payload.new_password, 10)}
        });
    }

    async updateEmail(payload: UpdateEmailDto, userid: { user: {id: number, name: string }, email: string }):Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {user_id: userid.user.id}
        });

        if (!user || user.email !== payload.old_email) {
            throw new HttpException("invalid_credentials",
                HttpStatus.UNAUTHORIZED);
        }

        return this.prisma.user.update({
            where: {user_id: userid.user.id},
            data: {email: payload.new_email}
        });

    }
}
