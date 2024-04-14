import {Body, Controller, NotFoundException, Param, Post, Query, Req, UseGuards} from '@nestjs/common';
import {OrderService} from "../service/order.service";
import {AddressDto} from "../order.address.dto";
import {JwtAuthGuard} from "../../auth/guards/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiResponse, ApiTags} from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@Controller('order')
@ApiTags('Order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Post('new')
    @ApiBearerAuth()
    @ApiBody(
        {
            type: AddressDto,
            description: 'Order creation from cart items',
            examples: {
                createOrderExample: {
                    summary: 'Example of order request',
                    value: {
                        payment: 30,
                        address: {
                            country: "Magyarország",
                            state: "Fejér",
                            city: "Ráckeresztúr",
                            street: "Orgona utca",
                            house_number: "4"
                        }
                    }
                }
            }
        }
    )
    @ApiResponse({
        status: 201,
        description: 'Order created successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized. Order creation failed.',
    })
    async createOrder(
        @Req() req: Request,
        @Body('paymentType') payid: string,
        @Body('address') address: AddressDto
    ) {
        const userId = req['user'];
        return await this.orderService.createOrder(userId, payid, address);
    }

}
