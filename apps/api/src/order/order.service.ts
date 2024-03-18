import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {CartItem, Order, Payment_type} from '@prisma/client';
import {AddressDto} from "./order.address.dto";
import {connect} from "rxjs";

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder( userid: number, payid: number, address: AddressDto) {
        const user = await this.prisma.user.findUnique({
            where: { user_id: userid },
            include: {
                CartItem: {
                    include: {
                        Product: {
                            include: {
                                ProductPictures: true
                            }
                        }
                    }
                },
            }
        })

        if (!user || !user.CartItem.length) {
            throw new NotFoundException("A felhasznó nem létezik, vagy a kosár üres!")
        }

        const transaction = await this.prisma.$transaction([
            this.prisma.order.create({
                data: {

                    order_date: new Date(),
                    User: {
                        connect: {
                            user_id: userid,
                        },
                    },
                    Payment_type: {
                        connect: {
                            pay_id: payid
                        }
                    },
                    order_items: {
                        createMany: {
                            data: user.CartItem.map((cartItem) => ({
                                quantity: cartItem.quantity,
                                actual_price: cartItem.Product.price,
                                Product_product_id: cartItem.Product_product_id
                            })),
                        },
                    },
                    Order_address: {
                        create: {
                            country: address.country,
                            state: address.state,
                            city: address.city,
                            street: address.street,
                            house_number: address.house_number
                        }
                    }
                }
            }),
            /*this.prisma.cartItem.deleteMany({
                where: {
                    User_user_id: userid
                },
            })*/
        ])

        return transaction;
    }
}
