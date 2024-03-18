import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UserRegisterDto, UpdatePasswordDto} from "./users.dto";
import {compare, genSalt, hash} from "bcrypt"
import {User} from "@prisma/client";

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
    async createUser(registerDto: UserRegisterDto): Promise<any> {
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
