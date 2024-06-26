import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UserRegisterDto} from "../../auth/dtos/user.register.dto";
import {UpdatePasswordDto} from "../../auth/dtos/update.password.dto";

jest.mock('../../prisma/prisma.service');
jest.mock('bcrypt', () => ({
    compare: jest.fn().mockResolvedValue(true),
    genSalt: jest.fn().mockResolvedValue('salt'),
    hash: jest.fn().mockResolvedValue('hashedPassword')
}));

describe('UsersService', () => {
    let service: UsersService;
    let prismaService: PrismaService;

    const user: User = {
        user_id: 1,
        email: 'test@example.com',
        password: '$2a$10$Mz5woCynCAhoh9aucZbnPOM0u6VRik38pAGDn92ICY1ynLy2316wG',
        username: 'test',
        Privilages_priv_id: 10

    };


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findFirst: jest.fn(),
                            findUnique: jest.fn(),
                            create: jest.fn(),
                            update: jest.fn(),
                        },
                        $transaction: jest.fn()
                    }
                }
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('loginUser', () => {
        it('should return user if found', async () => {
            const spy = jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

            const result = await service.loginUser(user.email);

            expect(result).toEqual(user);
            expect(spy).toHaveBeenCalled();
            expect(prismaService.user.findFirst).toHaveBeenCalledWith({
                where: { email: user.email },
            });
        });

        it('should return undefined if user not found', async () => {
            const email = 'test@example.com';

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(undefined);

            const result = await service.loginUser(email);

            expect(result).toBeUndefined();
            expect(prismaService.user.findFirst).toHaveBeenCalledWith({
                where: { email: email },
            });
        });
    });

    describe('createUser', () => {
        it('should create user if email not found', async () => {
            const registerDto: UserRegisterDto = {
                email: 'new@example.com',
                username: 'test',
                password: 'password',
            };

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(undefined);
            (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

            await service.createUser(registerDto);
            expect(bcrypt.genSalt).toHaveBeenCalled();
            expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 'salt');
            expect(prismaService.user.create).toHaveBeenCalledWith({
                data: {
                    ...registerDto,
                    password: 'hashedPassword',
                },
            });
        });

        it('should return error message if email already exists', async () => {
            const registerDto: UserRegisterDto = {
                email: 'existing@example.com',
                username: 'test',
                password: 'password',
            };

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);

            const result = await service.createUser(registerDto);

            expect(result).toEqual({ errorMessage: 'User already exists!' });
            expect(prismaService.user.create).not.toHaveBeenCalled();
        });
    });

    describe('updatePassword', () => {
        it('should update password if old password matches', async () => {
            const payload: UpdatePasswordDto = {
                old_password: 'oldPassword',
                new_password: 'newPassword',
            };
            const usermock = {
                user_id: 1,
                username: 'test',
                email: 'test@example.com',
                password: '$2b$10$32H8zQLUyDm.ZKNs7bUskOF5/WeXe02LQ1xvmJj8V7ehNvIwsRg8y',
                Privilages_priv_id: 10
            };

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(usermock);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (bcrypt.hash as jest.Mock).mockResolvedValue('newHashedPassword');

            const result = await service.updatePassword(payload, { user: { id: usermock.user_id, name: usermock.username }, email: usermock.email });

            expect(result).toEqual({
                ...user,
                password: '$2b$10$32H8zQLUyDm.ZKNs7bUskOF5/WeXe02LQ1xvmJj8V7ehNvIwsRg8y',
            });
            expect(prismaService.user.update).toHaveBeenCalledWith({
                where: { user_id: user.user_id },
                data: { password: 'newHashedPassword' },
            });
        });

        it('should throw an error if old password does not match', async () => {
            const updatePasswordDto: UpdatePasswordDto = {
                old_password: 'wrongPassword',
                new_password: 'newHashedPassword',
            };
            const usermock = {
                user_id: 1,
                username: 'test',
                email: 'test@example.com',
                password: '$2b$10$32H8zQLUyDm.ZKNs7bUskOF5/WeXe02LQ1xvmJj8V7ehNvIwsRg8y',
                Privilages_priv_id: 10
            };

            jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(usermock);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(service.updatePassword(updatePasswordDto, { user: { id: usermock.user_id, name: usermock.username }, email: usermock.email }))
                .rejects.toThrow(new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED));
            expect(prismaService.user.update).not.toHaveBeenCalled();
        });
    });

});
