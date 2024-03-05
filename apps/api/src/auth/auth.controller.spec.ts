import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {Test, TestingModule} from "@nestjs/testing";
import {UsersService} from "../users/users.service";
import {PrismaService} from "../prisma.service";
import {UserRegisterDto} from "../users/users.dto";

describe('AuthController', () => {
    let controller: AuthController;
    let mockAuthService: AuthService;
    let mockUserService: UsersService;

    beforeEach(async () => {
        mockAuthService = {} as AuthService;
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: UsersService,
                    useValue: mockUserService
                },
                PrismaService
            ]
        }).compile();

        controller = module.get<AuthController>(AuthController)
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return user created by authService.createUser()', () => {
        mockUserService.createUser = async (createUserDto: UserRegisterDto) => {
            return {
                ...createUserDto
            }
        };

        const mockUser = controller.register({
            email: 'test@example.com',
            username: 'testUser',
            password: 'Password123_'
        });

        expect(mockUser).toEqual(mockUserService.createUser)
    });
});