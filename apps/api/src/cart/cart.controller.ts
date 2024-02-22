// cart.controller.ts

import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:userId/:productId')
  async addToCart(
      @Param('userId') userId: number,
      @Param('productId') productId: number,
      @Body('quantity') quantity: number,
  ) {
    await this.cartService.addToCart(userId, productId, quantity);
  }

  @Delete('remove/:userId/:productId')
  async removeFromCart(
      @Param('userId') userId: number,
      @Param('productId') productId: number,
  ) {
    await this.cartService.removeFromCart(userId, productId);
  }

  @Get(':userId')
  async getCartItems(@Param('userId') userId: number) {
    return this.cartService.getCartItems(userId);
  }

  @Get('total/:userId')
  async calculateTotalPrice(@Param('userId') userId: number) {
    return this.cartService.calculateTotalPrice(userId);
  }
}
