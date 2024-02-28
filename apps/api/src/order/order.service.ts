import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {CartItem, Order, Payment_type} from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder( userid: number, payid: number) {
        const user = await this.prisma.user.findUnique({
            where: { user_id: userid },
            include: {
                CartItem: {
                    include: {
                        Product: true,
                    }
                }
            }
        })

        if (!user.CartItem.length) {
            throw new NotFoundException("A kosár üres!")
        }

        const transaction = await this.prisma.$transaction([
            this.prisma.order.create({
                data: {
                    order_date: new Date(),
                    User: { connect: {user_id: userid}},
                    Payment_type: { connect: {pay_id: payid}},
                    order_items: {
                        createMany: {
                            data: user.CartItem.map((cartItem) => ({
                                quantity: cartItem.quantity,
                                actual_price: cartItem.Product.price,
                                Product: { connect: { product_id: cartItem.Product.product_id } },
                                Product_product_id: cartItem.Product_product_id
                            })),
                        },
                    },
                },
            }),
            this.prisma.cartItem.deleteMany({
                where: {
                    User_user_id: userid
                },
            })
        ])

        return transaction;
    }
}
