import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('OrderService', () => {
    let orderService: OrderService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                        },
                        order: {
                            create: jest.fn(),
                        },
                        cartItem: {
                            deleteMany: jest.fn(),
                        },
                        $transaction: jest.fn()
                    },
                },
            ],
        }).compile();

        orderService = module.get<OrderService>(OrderService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(orderService).toBeDefined();
    });

    describe('createOrder', () => {
        it('should create order if user exists and cart is not empty', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@email.com'};
            const payId = '123';
            const address = {
                country: 'Test Country',
                state: 'Test State',
                city: 'Test City',
                street: 'Test Street',
                house_number: '123',
            };

            const mockUser = {
                user_id: 1,
                username: 'Test User',
                email: 'test@example.com',
                password: 'password',
                Privilages_priv_id: 10,
                CartItem: [
                    {
                        quantity: 2,
                        Product: {
                            price: 10,
                            ProductPictures: [],
                        },
                        Product_product_id: 1,
                    }
                ]
            };


            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
            jest.spyOn(prismaService.order, 'create').mockResolvedValue({ order_id: 1, order_date: new Date(), ship_date: new Date(), Payment_type_pay_id: 1, User_user_id: 1 });
            jest.spyOn(prismaService.cartItem, 'deleteMany').mockResolvedValue({ count: 1});

            await orderService.createOrder(userId, payId, address);

            expect(prismaService.order.create).toHaveBeenCalled();
            expect(prismaService.cartItem.deleteMany).toHaveBeenCalled();
        });

        it('should throw NotFoundException if user does not exist or cart is empty', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@email.com'};
            const payId = '123';
            const address = {
                country: 'Test Country',
                state: 'Test State',
                city: 'Test City',
                street: 'Test Street',
                house_number: '123',
            };

            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

            await expect(orderService.createOrder(userId, payId, address)).rejects.toThrowError(NotFoundException);
        });
    });
});
