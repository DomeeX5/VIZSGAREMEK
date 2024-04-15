import { Injectable } from '@nestjs/common';
import {UsersService} from "../../users/service/users.service";
import {compare} from "bcrypt";
import {User} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {validate} from "class-validator";
import {UserLoginDto} from "../dtos/user.login.dto";
import {UserRegisterDto} from "../dtos/user.register.dto";

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService, private jwtService: JwtService) {
    }

    async login(user: UserLoginDto) {
        const userFromDb = await this.userService.loginUser(user.email)
        if (userFromDb && (await compare(user.password, userFromDb.password))) {
            const payload = {
                email: userFromDb.email,
                sub: {
                    id: userFromDb.user_id,
                    name: userFromDb.username,
                }
            }

            return {
                accessToken: this.jwtService.sign(payload),
                payload
            }
        } else {
            return {
                errorMessage: "Invalid email or password!"
            }
        }
    }

    async getUserIdFromToken(token: string): Promise<number | null> {
        try {
            if (!token || !token.startsWith('Bearer')) {
                throw new Error('Invalid token format');
            }

            const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
            return decoded.user.sub;
        } catch (e) {
            return null;
        }
    }
}
