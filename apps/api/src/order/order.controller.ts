import {Body, Controller, NotFoundException, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {OrderService} from "./order.service";
import {AddressDto} from "./order.address.dto";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post('new')
    async createOrder(
        @Req() req: Request,
        @Body('payment') payid: number,
        @Body('address') address: AddressDto
    ) {
        const userid = req['user_id'];
        return await this.orderService.createOrder(userid, payid, address);
    }

}
