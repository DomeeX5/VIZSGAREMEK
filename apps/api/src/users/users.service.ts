import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {UserDto, UpdatePasswordDto} from "./users.dto";
import {compare, hash} from "bcrypt"

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {
    }

    private async hashPassword(password: string, salt: number){
        return await hash(password, salt);
    }

    async loginUser(loginDto: UserDto): Promise<any> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: loginDto.email,
            }
        });
        if (!user) {
            throw new HttpException("invalid_email",
                HttpStatus.UNAUTHORIZED);
        }
        const areEqual = await compare(loginDto.password, user.password);
        if (!areEqual) {
            throw new HttpException("invalid_password",
                HttpStatus.UNAUTHORIZED);
        }

        const {password: p, ...rest} = user;
        return rest;
    }
    async createUser(registerDto: UserDto): Promise<any> {
        const userInDb = await this.prisma.user.findFirst({
            where: {email: registerDto.email}
        });
        if (userInDb) {
            throw new HttpException("user_already_exist",
                HttpStatus.CONFLICT);
        }
        return this.prisma.user.create({
            data: {
                ...registerDto,
                password: await hash(registerDto.password, 10)
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
