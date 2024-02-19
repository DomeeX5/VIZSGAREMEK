import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserDto} from "../users/users.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(loginDto: UserDto): Promise<any> {
        const user = await this.authService.validateUser(loginDto);
        if (!user) {
            throw new UnauthorizedException('user_validation', 'user_validation');
        }
        return user;
    }
}