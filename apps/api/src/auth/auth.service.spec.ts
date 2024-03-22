import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../users/users.dto';
import { User } from '@prisma/client';
import { getModelToken } from '@nestjs/sequelize';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

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


/*import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../users/users.service";
import {PrismaService} from "../prisma/prisma.service";
import {UserLoginDto} from "../users/users.dto";
import {User} from "@prisma/client";
describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let prismaService: PrismaService;

    describe('login (UsersService, AuthService)', () => {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    AuthService,
                    {
                        provide: UsersService,
                        useValue: {
                            loginUser: jest.fn().mockImplementation(email => {
                                if (email === 'testUser@test2.com'){
                                    return {
                                        email: 'testUser@test2.com',
                                        user_id: 1,
                                        username: 'test',
                                        password: '$2b$10$42ey67lOKrVCU6H0N75e5.IbuLVnVXPaIUsY6gzaT8ipIHSfnC/n.'
                                    }
                                } else {
                                    return null;
                                }
                            })
                        },
                    },
                    {
                        provide: JwtService,
                        useValue: {
                            errorMessage: 'Invalid email or password!',
                            sign: jest.fn().mockReturnValue('mockedToken')
                        }
                    },
                    PrismaService,
                ],
            }).compile();

            authService = module.get<AuthService>(AuthService);
            usersService = module.get<UsersService>(UsersService);
        })

        it('should login with correct credentials', async () => {
            const userLoginDto: UserLoginDto = {
                email: "testUser@test2.com",
                password: "Password123_"
            };
            const loginResponse = await authService.login(userLoginDto);
            expect(usersService.loginUser).toHaveBeenCalledWith(userLoginDto.email);
            expect(loginResponse).toHaveProperty('accessToken');
            expect(loginResponse).toMatchObject({ accessToken: 'mockedToken' });
        });

        it('should return with errorMessage with incorrect credentials', async () => {
            const userLoginDto: UserLoginDto = {
                email: "testUser@test.com",
                password: "Password123_"
            };
            const loginResponse = await authService.login(userLoginDto);
            expect(usersService.loginUser).toHaveBeenCalledWith(userLoginDto.email);
            expect(loginResponse).toHaveProperty('errorMessage');
            expect(loginResponse).toMatchObject({errorMessage: 'Invalid email or password!'});
        });
    });
    describe('login (PrismaService)', () => {
        beforeEach(async () => {
            const module: TestingModule = await Test.createTestingModule({
                providers: [
                    AuthService,
                    UsersService,
                    JwtService,
                    {
                        provide: PrismaService,
                        useValue: {
                            user: { findFirst: jest.fn() },
                        }
                    },
                ],
            }).compile();
            usersService = module.get<UsersService>(UsersService);
            prismaService = module.get<PrismaService>(PrismaService);
        })

        it('should find user by email', async () => {
            const testEmail = 'testUser@test2.com';
            const testUser: User = {
                email: testEmail,
                user_id: 1,
                username: 'test',
                password: 'Password123_',
                Privilages_priv_id: 20
            }

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(testUser);
            const foundUser = await usersService.loginUser(testEmail);
            expect(prismaService.user.findFirst).toHaveBeenCalledWith({
                where: { email: testEmail },
            });
            expect(foundUser).toEqual(testUser);
        });

    });

});
*/