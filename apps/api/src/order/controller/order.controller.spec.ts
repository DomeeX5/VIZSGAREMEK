import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { AddressDto } from '../order.address.dto';
import {  mockRequest } from '../../customRequest';

jest.mock('../service/order.service');

describe('OrderController', () => {
    let controller: OrderController;
    let orderService: jest.Mocked<OrderService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [OrderService],
        }).compile();

        controller = module.get<OrderController>(OrderController);
        orderService = module.get<OrderService>(OrderService) as jest.Mocked<OrderService>;
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createOrder', () => {
        it('should create order', async () => {
            const req = mockRequest();
            const paymentType = 'type';
            const address: AddressDto = {
                country: 'Country',
                state: 'State',
                city: 'City',
                street: 'Street',
                house_number: '123',
            };

            const expectedResponse: [{
                order_id: number;
                order_date: Date;
                ship_date: Date;
                Payment_type_pay_id: number;
                User_user_id: number;
            }, { count: number }] = [
                {
                    order_id: 1,
                    order_date: new Date(),
                    ship_date: new Date(),
                    Payment_type_pay_id: 1,
                    User_user_id: 1
                },
                {
                    count: 0
                }
            ];


            orderService.createOrder.mockResolvedValue(expectedResponse);

            const result = await controller.createOrder(req, paymentType, address);

            expect(orderService.createOrder).toHaveBeenCalledWith(req.user, paymentType, address);
            expect(result).toEqual(expectedResponse);
        });
    });
});
