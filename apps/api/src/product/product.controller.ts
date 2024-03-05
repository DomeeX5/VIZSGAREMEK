import {Body, Controller, Get, Param, Query} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(`type`)
  async getProductsByType(@Body('selectedType') selectedType: string) {
    return await this.productService.getProductByType(selectedType);
  }

  @Get('specificType')
  async getProductsBySpecType(
      @Body('selected') selected: string,
      @Body('selectedType') selectedType: string
  ) {
    await this.getProductsByType(selectedType);
    return await this.productService.getProductBySpecType(selected);
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return await this.productService.getProduct(id);
  }
}
