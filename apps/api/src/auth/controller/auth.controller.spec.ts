import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../../users/service/users.service';
import {UserLoginDto} from "../dtos/user.login.dto";
import {UserRegisterDto} from "../dtos/user.register.dto";
import {User} from "@prisma/client";

jest.mock('../service/auth.service');
jest.mock('../../users/service/users.service');

describe('AuthController', () => {
    let controller: AuthController;
    let authService: jest.Mocked<AuthService>;
    let usersService: jest.Mocked<UsersService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService, UsersService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService) as jest.Mocked<AuthService>;
        usersService = module.get<UsersService>(UsersService) as jest.Mocked<UsersService>;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('should return a JWT token', async () => {
            const userLoginDto: UserLoginDto = {
                email: 'test@example.com',
                password: 'password123',
            };
            const expectedToken = 'fake.jwt.token';

            authService.login.mockResolvedValue({
                "accessToken": expectedToken,
                "payload": {
                    "email": userLoginDto.email,
                    "sub": {
                        "id": 1,
                        "name": 'Test User',
                    },
                },
            });

            const result = await controller.login({ body: userLoginDto });

            expect(authService.login).toHaveBeenCalledWith(userLoginDto);
            expect(result).toEqual({
                accessToken: expectedToken,
                payload: {
                    email: userLoginDto.email,
                    sub: {
                        id: 1,
                        name: 'Test User',
                    },
                },
            });
        });
    });

    describe('register', () => {
        it('should create a new user', async () => {
            const createUserDto: UserRegisterDto = {
                username: 'testUser',
                email: 'test@example.com',
                password: 'password123',
            };

            const newUser: User = {
                user_id: 1,
                username: 'TestUser',
                email: 'test@example.com',
                password: 'password',
                Privilages_priv_id: 10

            };

            usersService.createUser.mockResolvedValue(newUser);

            const result = await controller.register(createUserDto);

            expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
            expect(result).toEqual(newUser);
        });
    });
});
