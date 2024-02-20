import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {UserDto} from "../users/users.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(loginDto: UserDto) {
        const user = await this.usersService.loginUser(loginDto);
        if (user && user.password === loginDto.password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.user_id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}