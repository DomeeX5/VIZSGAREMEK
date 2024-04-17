import {Test, TestingModule} from '@nestjs/testing';
import {CartController} from './cart.controller';
import {CartService} from '../service/cart.service';
import {Product} from "@prisma/client";
import {mockRequest} from "../../customRequest";

jest.mock('../service/cart.service');

describe('CartController', () => {
    let controller: CartController;
    let cartService: jest.Mocked<CartService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CartController],
            providers: [CartService],
        }).compile();


        controller = module.get<CartController>(CartController);
        cartService = module.get<CartService>(CartService) as jest.Mocked<CartService>;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('addToCart', () => {
        it('should add product to cart', async () => {
            const req = mockRequest();
            const productId = 1;
            const quantity = 2;

            const expectedResponse = {
                cartItems: [{
                    product: {
                        product_id: 1,
                        product_name: 'TestProduct',
                        product_type: 'TestType',
                        product_spectype: 'TestSpecType',
                        price: 10,
                        description: 'TestDescription',
                        ProductPictures: [{
                            id: 1,
                            image: 'test_image.jpg',
                            productId: 1
                        }]
                    },
                    quantity: 2
                }],
                totalPrice: 20,
            };

            cartService.addToCart.mockResolvedValue(expectedResponse);

            const result = await controller.addToCart(req, productId, quantity);

            expect(cartService.addToCart).toHaveBeenCalledWith(req.user, productId, quantity);
            expect(result).toEqual(expectedResponse);
        });
    });



    describe('removeOneFromCart', () => {
        it('should remove one product from cart', async () => {
            const req = mockRequest();
            const productId = 1;
            const quantity = 1;

            await controller.removeOneFromCart(req, productId, quantity);

            expect(cartService.removeOneFromCart).toHaveBeenCalledWith(req.user, productId, quantity);
        });
    });

    describe('removeFromCart', () => {
        it('should remove product from cart', async () => {
            const req = mockRequest();
            const productId = 1;

            await controller.removeItemFromCart(req, productId);

            expect(cartService.removeItemFromCart).toHaveBeenCalledWith(req.user, productId);
        });
    });

    describe('getCartItems', () => {
        it('should get cart items', async () => {
            const req = mockRequest();
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
            const expectedResponse= [
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


            cartService.getCartItems.mockResolvedValue(expectedResponse);

            const result = await controller.getCartItems(req);

            expect(cartService.getCartItems).toHaveBeenCalledWith(req.user);
            expect(result).toEqual(expectedResponse);
        });
    });

    describe('calculateTotalPrice', () => {
        it('should calculate total price', async () => {
            const req = mockRequest();
            const expectedTotalPrice = 20;

            cartService.calculateTotalPrice.mockResolvedValue(expectedTotalPrice);

            const result = await controller.calculateTotalPrice(req);

            expect(cartService.calculateTotalPrice).toHaveBeenCalledWith(req.user);
            expect(result).toEqual(expectedTotalPrice);
        });
    });

    describe('getCountCart', () => {
        it('should get count of items in cart', async () => {
            const req = mockRequest();
            const expectedCount = { count: 2 };

            cartService.getCountCart.mockResolvedValue(expectedCount);

            const result = await controller.getCountCart(req);

            expect(cartService.getCountCart).toHaveBeenCalledWith(req.user);
            expect(result).toEqual(expectedCount);
        });
    });
})