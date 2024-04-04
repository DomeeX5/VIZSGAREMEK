import {Body, Controller, Get, Param, ParseIntPipe, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import {Product} from "@prisma/client";
import {ExtendedProduct} from "client/src/interfaces";

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('count')
  async getProductCount() {
    const totalCount = await this.productService.getAllProductsCount()
    return {
      totalCount: totalCount
    }
  }

  @Get('all')
  async getAllProducts(
      @Query('page', ParseIntPipe) page: number,
      @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.productService.getAllProductsWithLimit(page, limit);
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<ExtendedProduct[]> {
    return this.productService.productFindMany(query);
  }

  @Get('mobile')
  async getProductsMobile() {
    return this.productService.getAllProducts();
  }

  @Get(`type`)
  async getProductsByType(
      @Body('selectedType') selectedType: string,
      @Query('page', ParseIntPipe) page: number,
      @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.productService.getProductByType(selectedType, page, limit);
  }

  @Get('specificType')
  async getProductsBySpecType(
      @Body('selected') selected: string,
      @Body('selectedType') selectedType: string,
      @Query('page', ParseIntPipe) page: number,
      @Query('limit', ParseIntPipe) limit: number,
  ) {
    await this.getProductsByType(selectedType, page, limit);
    return await this.productService.getProductBySpecType(selected, page, limit);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return await this.productService.getProduct(id);
  }
}
