import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {compare} from "bcrypt";
import {User} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {UserDto} from "../users/users.dto";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private jwtService: JwtService) {
    }
    async validateUser(email: string, password: string) {
        const user = await this.userService.loginUser(email)

        if (user && (await compare(password, user.password))) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = {
            email: user.email,
            sub: {
                id: user.user_id,
                name: user.username,
            }
        }

        return {
            ...user,
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload,{expiresIn: '7d'})
        }
    }

    async refreshToken(user: User) {
        const payload = {
            email: user.email,
            sub: {
                id: user.user_id,
                name: user.username,
            }
        }

        return {
            accessToken: this.jwtService.sign(payload),
        }
    }
}
