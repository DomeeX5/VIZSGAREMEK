import { Injectable } from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {compare} from "bcrypt";
import {User} from "@prisma/client";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDto, UserRegisterDto} from "../users/users.dto";
import {validate} from "class-validator";

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
            }
        } else {
            return {
                errorMessage: "Invalid email or password!"
            }
        }
    }
}
