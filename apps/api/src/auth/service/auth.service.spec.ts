import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/service/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { getModelToken } from '@nestjs/sequelize';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import {UserLoginDto} from "../dtos/user.login.dto";

describe('AuthService', () => {
    let service: AuthService;
    let userService: UsersService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                UsersService,
                PrismaService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue('fakeAccessToken'),
                        verify: jest.fn().mockReturnValue({ user: { sub: 123 } }),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        userService = module.get<UsersService>(UsersService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('login', () => {
        it('should return access token if login is successful', async () => {
            const user: UserLoginDto = {
                email: 'test@example.com',
                password: 'password',
            };

            const userFromDb: User = {
                email: 'test@example.com',
                password: '$2a$12$6QjXvOKrCe5kakcRxPzkP.6B0ncaR06RNA.eHG4ps9djURl.Bt9mS',
                user_id: 123,
                username: 'testuser',
                Privilages_priv_id: 20
            };

            jest.spyOn(userService, 'loginUser').mockResolvedValue(userFromDb);
            jest.spyOn(jwtService, 'sign');

            const result = await service.login(user);

            expect(result).toEqual({ accessToken: 'fakeAccessToken' });
            expect(userService.loginUser).toHaveBeenCalledWith(user.email);
            expect(jwtService.sign).toHaveBeenCalledWith({
                email: userFromDb.email,
                sub: {
                    id: userFromDb.user_id,
                    name: userFromDb.username,
                },
            });
        });

        it('should return error message if login is unsuccessful', async () => {
            const user: UserLoginDto = {
                email: 'test@example.com',
                password: 'password',
            };

            jest.spyOn(userService, 'loginUser').mockResolvedValue(null);

            const result = await service.login(user);

            expect(result).toEqual({ errorMessage: 'Invalid email or password!' });
        });
    });

    describe('getUserIdFromToken', () => {
        it('should return user id from token if token is valid', async () => {
            const token = 'Bearer validToken';

            const result = await service.getUserIdFromToken(token);

            expect(result).toEqual(123);
            expect(jwtService.verify).toHaveBeenCalledWith('validToken');
        });

        it('should return null if token is invalid', async () => {
            const token = 'invalidToken';

            const result = await service.getUserIdFromToken(token);

            expect(result).toBeNull();
        });
    });

});