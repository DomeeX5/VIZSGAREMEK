import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Product} from "@prisma/client";
import {ExtendedProduct} from "client/src/interfaces";

@Injectable()
export class CartService {

    constructor(private prisma: PrismaService) {}

    async removeFromCart(userid: { user: {id: number, name: string }, email: string }, productid: number, quantity: number) {
        await this.prisma.cartItem.deleteMany({
            where: {
                User_user_id: userid.user.id,
                Product_product_id: productid,
                quantity: quantity
            },

        })
    }

    async getCartItems(userid: { user: {id: number, name: string }, email: string }) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: {
                User_user_id: userid.user.id,
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

    async calculateTotalPrice(userid: { user: {id: number, name: string }, email: string }) {
        const cartItems = await this.getCartItems(userid);
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }

    async addToCart(userid: { user: {id: number, name: string }, email: string }, productId: number, quantity: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                user_id: userid.user.id,
            }
        })

        if (!user) {
            throw new HttpException("A kosárba helyezéshez be kell jelentkezned!", HttpStatus.BAD_REQUEST)
        }

        const product = await this.prisma.product.findUnique({
            where: {
                product_id: productId,
            }
        })

        if (!product) {
            throw new HttpException("A termék amit a kosárhoz szeretnél adni, nem létezik.", HttpStatus.BAD_REQUEST)
        }

        const existingCart = await this.prisma.cartItem.findFirst({
            where: {
                User_user_id: userid.user.id,
                Product_product_id: productId,
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
                    User: { connect: { user_id: userid.user.id } },
                    Product: { connect: { product_id: productId } },
                },
            });
        }

        const updatedCartItems = await this.getCartItems(userid);
        const totalPrice = await this.calculateTotalPrice(userid);
        return {
            cartItems: updatedCartItems,
            totalPrice: totalPrice
        };
    }
}
