import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddressDto } from './order.address.dto';
import { NotFoundException } from '@nestjs/common';
import {CartItem} from "@prisma/client";

describe('OrderService', () => {
    let service: OrderService;
    let prismaService: PrismaService;
    type UserType = {
        User: {
            CartItem: {
               Product: {
                   ProductPictures: {
                       id: number,
                       image: string,
                       productId: number
                   }[]
               } & {
                       product_id: number,
                       product_name: string,
                       product_type: string,
                       product_spectype: string,
                       price: number,
                       description: string
                   }
            }[]
       }
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn()
                        },
                        order: {
                            create: jest.fn()
                        },
                        cartItem: {
                            deleteMany: jest.fn()
                        }
                    }
                }
            ]
        }).compile();

        service = module.get<OrderService>(OrderService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createOrder', () => {
        it('should create an order and delete the cart items', async () => {
            const mockPayId = 1;
            const productId = 1;
            const mockAddress: AddressDto = {
                country: 'MockCountry',
                state: 'MockState',
                city: 'MockCity',
                street: 'MockStreet',
                house_number: 123,
            };

            const mockUser = {
                user_id: 1,
                CartItem: [{ quantity: 1, Product: { price: 100, product_id: 1 } }],
            };
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({} as any);
            jest.spyOn(prismaService.order, 'create').mockResolvedValue({} as any);
            jest.spyOn(prismaService.cartItem, 'deleteMany').mockResolvedValue({count: 1});

            await service.createOrder(mockUser.user_id, productId, mockAddress);
        });
    });
});
