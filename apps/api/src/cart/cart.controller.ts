import {Controller, Post, Delete, Get, Param, Body, UseGuards, Req} from '@nestjs/common';
import { CartService } from './cart.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
      @Req() req: Request,
      @Body('productId') productId: number,
      @Body('quantity') quantity: number,
  ) {
    const userId = req['user']
    return await this.cartService.addToCart(userId, productId, quantity);
  }

  @Post('remove')
  async removeOneFromCart(
      @Req() req: Request,
      @Body('productId') productId: number,
      @Body('quantity') quantity: number,
  ) {
    const userId = req['user'];
    await this.cartService.removeOneFromCart(userId, productId, quantity);
  }

  @Post('remove-item')
  async removeFromCart(
      @Req() req: Request,
      @Body('productId') productId: number
  ) {
    const userId = req['user'];
    await this.cartService.removeItemFromCart(userId, productId);
  }

  @Get('items')
  async getCartItems(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.getCartItems(userId);
  }

  @Get('total')
  async calculateTotalPrice(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.calculateTotalPrice(userId);
  }

  @Get('item-count')
  async getCountCart(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.getCountCart(userId);
  }
}
