import {Body, Controller, NotFoundException, Param, Post, Query} from '@nestjs/common';
import {OrderService} from "./order.service";
import {AddressDto} from "./order.address.dto";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post('new')
    async createOrder(
        @Query('userid') userid: number,
        @Body('payment') payid: number,
        @Body('address') address: AddressDto
    ) {
        return await this.orderService.createOrder(userid, payid, address);
    }

}
