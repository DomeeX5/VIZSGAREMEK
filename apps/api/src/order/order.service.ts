import {Injectable, NotFoundException} from '@nestjs/common';
import {AddressDto} from "./order.address.dto";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async createOrder( userid: { user: {id: number, name: string }, email: string }, payid: string, address: AddressDto) {
        const user = await this.prisma.user.findUnique({
            where: { user_id: userid.user.id },
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

        return this.prisma.$transaction([
            this.prisma.order.create({
                data: {

                    order_date: new Date(),
                    User: {
                        connect: {
                            user_id: userid.user.id,
                        },
                    },
                    Payment_type: {
                        connect: {
                            pay_id: parseInt(payid)
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
                            house_number: parseInt(address.house_number)
                        }
                    }
                }
            }),
            this.prisma.cartItem.deleteMany({
                where: {
                    User_user_id: userid.user.id
                },
            })
        ]);
    }
}
