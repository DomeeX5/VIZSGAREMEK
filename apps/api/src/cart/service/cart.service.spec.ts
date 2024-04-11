import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { PrismaService } from '../../prisma/prisma.service';
import { HttpException } from '@nestjs/common';
import {CartItem, Product} from "@prisma/client";

describe('CartService', () => {
    let service: CartService;
    let prismaService: PrismaService;
    type Cart = {
        product:
            {
                ProductPictures:
                    {
                        id: number;
                        image: string;
                        productId: number;
                    }[];
            } & {
            product_id: number;
            product_name: string;
            product_type: string;
            product_spectype: string;
            price: number;
            description: string;
        };
        quantity: number;
    }[]

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CartService,
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                        },
                        product: {
                            findUnique: jest.fn(),
                        },
                        cartItem: {
                            findFirst: jest.fn(),
                            update: jest.fn(),
                            create: jest.fn(),
                            deleteMany: jest.fn(),
                            findMany: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<CartService>(CartService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('addToCart', () => {
        it('should throw an error if user is not found', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

            await expect(service.addToCart(userId, 1, 1)).rejects.toThrow(HttpException);
        });

        it('should throw an error if product is not found', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({} as any);
            jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(null);

            await expect(service.addToCart(userId, 1, 1)).rejects.toThrow(HttpException);
        });

        it('should update quantity if cart item already exists', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            const productId = 1;
            const existingCartItem: CartItem = { cart_item_id: 1, quantity: 2, User_user_id: userId.user.id, Product_product_id: productId};
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({} as any);
            jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue({} as any);
            jest.spyOn(prismaService.cartItem, 'findFirst').mockResolvedValue(existingCartItem);

            await service.addToCart(userId, productId, 1);

            expect(prismaService.cartItem.update).toHaveBeenCalledWith({
                where: { cart_item_id: existingCartItem.cart_item_id },
                data: { quantity: existingCartItem.quantity + 1 },
            });
        });

        it('should create new cart item if it does not exist', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            const productId = 1;
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({} as any);
            jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue({} as any);
            jest.spyOn(prismaService.cartItem, 'findFirst').mockResolvedValue(null);

            await service.addToCart(userId, productId, 1);

            expect(prismaService.cartItem.create).toHaveBeenCalledWith({
                data: {
                    quantity: 1,
                    User: { connect: { user_id: userId.user.id } },
                    Product: { connect: { product_id: productId } },
                },
            });
        });
    });

    describe('removeFromCart', () => {
        it('should remove item from cart', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            const productId = 1;

            await service.removeOneFromCart(userId, productId, 1);

            expect(prismaService.cartItem.deleteMany).toHaveBeenCalledWith({
                where: {
                    User_user_id: userId.user.id,
                    Product_product_id: productId,
                },
            });
        });
    });

    describe('getCartItems', () => {
        it('should return cart items for a user', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            const product: Product = { product_id: 1, product_name: 'test', price: 100, product_type: 'asd', product_spectype: 'asd2', description: 'desc' };
            const cartItems: CartItem[] = [{ cart_item_id: 1, User_user_id: userId.user.id, quantity: 2, Product_product_id: product.product_id }];
            jest.spyOn(prismaService.cartItem, 'findMany').mockResolvedValue(cartItems.map(item => ({ ...item, Product: product })));

            const result = await service.getCartItems(userId);

            expect(result).toEqual(cartItems.map((item) => ({
                product: product,
                quantity: item.quantity,
            })));
        });


    });
    describe('calculateTotalPrice', () => {
        it('should return total price of cart items for a user', async () => {
            const userId = { user: { id: 1, name: 'Test User' }, email: 'test@example.com' };
            const Products: Product[] = [
                {
                    product_id: 1,
                    product_name: 'Product 1',
                    price: 10,
                    product_type: 'type1',
                    product_spectype: 'spectype1',
                    description: 'Description 1'
                },
                {
                    product_id: 2,
                    product_name: 'Product 2',
                    price: 15,
                    product_type: 'type2',
                    product_spectype: 'spectype2',
                    description: 'Description 2'
                }
            ]

            const cartItems: Cart = [
                {
                    product: {
                        ProductPictures: [
                            {
                                id: 1,
                                image: 'string',
                                productId: Products[0].product_id
                            },
                        ],
                        product_id: Products[0].product_id,
                        product_name: Products[0].product_name,
                        product_type: Products[0].product_type,
                        product_spectype: Products[0].product_spectype,
                        price: Products[0].price,
                        description: Products[0].description
                    },
                    quantity: 2
                },
                {
                    product: {
                        ProductPictures: [
                            {
                                id: 2,
                                image: 'string',
                                productId: Products[1].product_id
                            },
                        ],
                        product_id: Products[1].product_id,
                        product_name: Products[1].product_name,
                        product_type: Products[1].product_type,
                        product_spectype: Products[1].product_spectype,
                        price: Products[1].price,
                        description: Products[1].description
                    },
                    quantity: 1
                }
            ];


            jest.spyOn(service, 'getCartItems').mockResolvedValue(cartItems);

            const totalPrice = await service.calculateTotalPrice(userId);

            expect(totalPrice).toEqual(35);
        });
    });
});






