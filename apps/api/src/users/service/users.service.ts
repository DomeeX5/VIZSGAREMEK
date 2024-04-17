import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { UserRegisterDto } from '../../auth/dtos/user.register.dto';
import { UpdatePasswordDto } from '../../auth/dtos/update.password.dto';
import { UpdateEmailDto } from '../../auth/dtos/update.email.dto';

/**
 * Service responsible for user-related operations.
 */
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    /**
     * Authenticates a user based on email.
     * @param email The email of the user.
     * @returns A Promise resolving to the user if found, otherwise undefined.
     */
    async loginUser(email: string): Promise<User | undefined> {
        return this.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
    }

    /**
     * Creates a new user.
     * @param registerDto Data for user registration.
     * @returns A Promise resolving to the created user or an error message if user already exists.
     */
    async createUser(registerDto: UserRegisterDto): Promise<User | { errorMessage: string }> {
        const userInDb = await this.prisma.user.findFirst({
            where: { email: registerDto.email },
        });
        if (userInDb) {
            return {
                errorMessage: 'User already exists!',
            };
        } else {
            const genSaltOrRound = await genSalt(10);
            return this.prisma.user.create({
                data: {
                    ...registerDto,
                    password: await hash(registerDto.password, genSaltOrRound),
                },
            });
        }
    }

    /**
     * Updates the password of a user.
     * @param updatePasswordDto Data for updating the password.
     * @param payload User ID and name.
     * @returns A Promise resolving to the updated user.
     */
    async updatePassword(updatePasswordDto: UpdatePasswordDto, payload: { user: { id: number; name: string }; email: string }) {
        const user = await this.prisma.user.findFirst({
            where: { user_id: payload.user.id },
        });
        const areEqual = await compare(updatePasswordDto.old_password, user.password);
        if (!user || !areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        await this.prisma.user.update({
            where: { user_id: payload.user.id },
            data: { password: await hash(updatePasswordDto.new_password, 10) },
        })

        const updatedUser = await this.prisma.user.findFirst({
                where: {user_id: payload.user.id }
        })
        return updatedUser;
    }

    /**
     * Updates the email of a user.
     * @param payload Data for updating the email.
     * @param userid User ID and name.
     * @returns A Promise resolving to the updated user.
     */
    async updateEmail(payload: UpdateEmailDto, userid: { user: { id: number; name: string }; email: string }): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { user_id: userid.user.id },
        });

        if (!user || user.email !== payload.old_email) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return this.prisma.user.update({
            where: { user_id: userid.user.id },
            data: { email: payload.new_email },
        });
    }
}
