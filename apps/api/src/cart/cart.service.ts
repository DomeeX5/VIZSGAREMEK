import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Product} from "@prisma/client";

@Injectable()
export class CartService {

    constructor(private prisma: PrismaService) {}

    async addToCart(userid: number, productid: number, quantity: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: userid,
            }
        })

        if (!user) {
            throw new HttpException("A kosárba helyezéshez be kell jelentkezned!", HttpStatus.BAD_REQUEST)
        }

        const product = await this.prisma.product.findUnique({
            where: {
                product_id: productid,
            }
        })

        if (!product) {
            throw new HttpException("A termék amit a kosárhoz szeretnél adni, nem létezik.", HttpStatus.BAD_REQUEST)
        }

        const existingCart = await this.prisma.cartItem.findFirst({
            where: {
                User_user_id: userid,
                Product_product_id: productid,
            }
        })

        if (existingCart) {
            await this.prisma.cartItem.update({
                where: {
                    cart_item_id: existingCart.cart_item_id,
                },
                data: {
                    quantity: existingCart.quantity + quantity,
                }
            })
        } else {
            await this.prisma.cartItem.create({
                data: {
                    quantity,
                    User: { connect: { user_id: userid } },
                    Product: { connect: { product_id: productid } },
                },
            });
        }
    }

    async removeFromCart(userid: number, productid: number) {
        await this.prisma.cartItem.deleteMany({
            where: {
                User_user_id: userid,
                Product_product_id: productid,
            }
        })
    }

    async getCartItems(userid: number): Promise<any> {
        const cartItems = await this.prisma.cartItem.findMany({
            where: {
                User_user_id: userid,
            },
            include: {
                Product: {
                    include: {
                        ProductPictures: true
                    }
                }
            }
        });
        return cartItems.map((item) => ({
            product: item.Product,
            quantity: item.quantity
        }))
    }

    async calculateTotalPrice(userid: number): Promise<number> {
        const cartItems = await this.getCartItems(userid);
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }
}
