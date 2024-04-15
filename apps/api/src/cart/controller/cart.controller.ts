import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('cart')
@ApiBearerAuth()
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add a product to the cart' })
  @ApiBody({
    description: 'Product ID and quantity to add to the cart',
    examples: {
      addToCartExample: {
        summary: 'Example of adding to cart request',
        value: {
          productId: 4,
          quantity: 1,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Product added to cart successfully' })
  @ApiResponse({ status: 401, description: 'Adding to cart failed' })
  async addToCart(
      @Req() req: Request,
      @Body('productId') productId: number,
      @Body('quantity') quantity: number,
  ) {
    const userId = req['user'];
    return await this.cartService.addToCart(userId, productId, quantity);
  }

  @Get('items')
  @ApiOperation({ summary: 'Get all items in the cart' })
  @ApiResponse({ status: 200, description: 'Returns all items in the cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCartItems(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.getCartItems(userId);
  }

  @Get('total')
  @ApiOperation({ summary: 'Calculate the total price of all items in the cart' })
  @ApiResponse({ status: 200, description: 'Returns the total price of all items in the cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async calculateTotalPrice(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.calculateTotalPrice(userId);
  }

  @Post('remove')
  @ApiOperation({ summary: 'Remove a specific quantity of a product from the cart' })
  @ApiBody({
    description: 'Product ID and quantity to remove from the cart',
    examples: {
      removeOneFromCartExample: {
        summary: 'Example of removing from cart request',
        value: {
          productId: 4,
          quantity: 1,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Product removed from cart successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeOneFromCart(
      @Req() req: Request,
      @Body('productId') productId: number,
      @Body('quantity') quantity: number,
  ) {
    const userId = req['user'];
    await this.cartService.removeOneFromCart(userId, productId, quantity);
  }

  @Post('remove-item')
  @ApiOperation({ summary: 'Remove an entire item from the cart' })
  @ApiBody({
    description: 'Product ID to remove from the cart',
    examples: {
      removeItemFromCartExample: {
        summary: 'Example of removing item from cart request',
        value: {
          productId: 4,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Item removed from cart successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async removeFromCart(
      @Req() req: Request,
      @Body('productId') productId: number
  ) {
    const userId = req['user'];
    await this.cartService.removeItemFromCart(userId, productId);
  }

  @Get('item-count')
  @ApiOperation({ summary: 'Get the total number of items in the cart' })
  @ApiResponse({ status: 200, description: 'Returns the total number of items in the cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCountCart(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.getCountCart(userId);
  }
}
