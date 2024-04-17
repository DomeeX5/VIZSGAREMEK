import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {Prisma, Product} from "@prisma/client";
import {ExtendedProduct} from "client/src/interfaces";

@Injectable()
export class CartService {

    constructor(private prisma: PrismaService) {}

    /**
     * Removes a specific quantity of a product from the user's cart.
     * @param userid - The ID and name of the user along with their email.
     * @param productid - The ID of the product to remove.
     * @param quantity - The quantity of the product to remove.
     */
    async removeOneFromCart(userid: { user: {id: number, name: string }, email: string }, productid: number, quantity: number) {
        const existingCart = await this.prisma.cartItem.findFirst({
            where: {
                User_user_id: userid.user.id,
                Product_product_id: productid,
            }
        });

        if (existingCart) {
            if (existingCart.quantity - quantity <= 0) {
                await this.removeItemFromCart(userid, productid)
            } else {
                await this.prisma.cartItem.update({
                    where: {
                        cart_item_id: existingCart.cart_item_id,
                    },
                    data: {
                        quantity: existingCart.quantity - quantity,
                    },
                });
            }
        }
    }


    /**
     * Removes an entire item from the user's cart.
     * @param userid - The ID and name of the user along with their email.
     * @param productid - The ID of the product to remove.
     */
    async removeItemFromCart(userid: { user: {id: number, name: string }, email: string }, productid: number) {
            await this.prisma.cartItem.delete({
                where: {
                    User_user_id_Product_product_id: {
                        User_user_id: userid.user.id,
                        Product_product_id: productid
                    }
                }
            })
    }


    /**
     * Retrieves the total number of items in the user's cart.
     * @param userid - The ID and name of the user along with their email.
     * @returns The total number of items in the cart.
     */
    async getCountCart(userid: { user: {id: number, name: string }, email: string }) {
        const cartItems = await this.prisma.cartItem.findMany({
            where: {
                User_user_id: userid.user.id,
            },
            select: {
                quantity: true
            },
        });
        return {
            count: cartItems.reduce((partialSum, a) => partialSum + a.quantity, 0)
        };
    }

    /**
     * Retrieves all items in the user's cart.
     * @param userid - The ID and name of the user along with their email.
     * @returns All items in the cart along with their quantities.
     */
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

        if (!cartItems || cartItems.length === 0) {
            return [];
        }

        return cartItems.map((item) => ({
            product: item.Product,
            quantity: item.quantity
        }))
    }

    /**
     * Calculates the total price of all items in the user's cart.
     * @param userid - The ID and name of the user along with their email.
     * @returns The total price of all items in the cart.
     */
    async calculateTotalPrice(userid: { user: {id: number, name: string }, email: string }) {
        const cartItems = await this.getCartItems(userid);
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
    }

    /**
     * Adds a product to the user's cart.
     * @param userid - The ID and name of the user along with their email.
     * @param productId - The ID of the product to add to the cart.
     * @param quantity - The quantity of the product to add.
     * @returns The updated cart items along with the total price.
     */
    async addToCart(userid: { user: {id: number, name: string }, email: string }, productId: number, quantity: number) {
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
