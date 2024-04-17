import {Controller, Post, Get, Body, UseGuards, Req, Put, Delete} from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import {ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

/**
 * Controller for managing user shopping carts.
 */
@UseGuards(JwtAuthGuard)
@Controller('cart')
@ApiBearerAuth()
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  /**
   * Adds a product to the cart.
   * @param req - The HTTP request object.
   * @param productId - The ID of the product to add.
   * @param quantity - The quantity of the product to add.
   * @returns A promise resolving to the result of adding the product to the cart.
   */
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

  /**
   * Retrieves all items in the cart.
   * @param req - The HTTP request object.
   * @returns A promise resolving to the items in the cart.
   */
  @Get('items')
  @ApiOperation({ summary: 'Get all items in the cart'})
  @ApiResponse({ status: 200, description: 'Returns all items in the cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCartItems(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.getCartItems(userId);
  }

  /**
   * Calculates the total price of all items in the cart.
   * @param req - The HTTP request object.
   * @returns A promise resolving to the total price of all items in the cart.
   */
  @Get('total')
  @ApiOperation({ summary: 'Calculate the total price of all items in the cart' })
  @ApiResponse({ status: 200, description: 'Returns the total price of all items in the cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async calculateTotalPrice(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.calculateTotalPrice(userId);
  }

  /**
   * Removes a specific quantity of a product from the cart.
   * @param req - The HTTP request object.
   * @param productId - The ID of the product to remove.
   * @param quantity - The quantity of the product to remove.
   * @returns A promise resolving when the product is removed from the cart.
   */
  @Put('remove')
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

  /**
   * Removes an entire item from the cart.
   * @param req - The HTTP request object.
   * @param productId - The ID of the product to remove.
   * @returns A promise resolving when the item is removed from the cart.
   */
  @Delete('remove-item')
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
  async removeItemFromCart(
      @Req() req: Request,
      @Body('productId') productId: number
  ) {
    const userId = req['user'];
    await this.cartService.removeItemFromCart(userId, productId);
  }


  /**
   * Gets the total number of items in the cart.
   * @param req - The HTTP request object.
   * @returns A promise resolving to the total number of items in the cart.
   */
  @Get('item-count')
  @ApiOperation({ summary: 'Get the total number of items in the cart' })
  @ApiResponse({ status: 200, description: 'Returns the total number of items in the cart' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCountCart(@Req() req: Request) {
    const userId = req['user'];
    return await this.cartService.getCountCart(userId);
  }
}
