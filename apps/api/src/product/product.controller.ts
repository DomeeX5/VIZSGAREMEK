import {Body, Controller, Get, Param} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(`type/:selectedType`)
  async getProductsByType(@Param('selectedType') selectedType: string) {
    return await this.productService.getProductByType(selectedType);
  }

  @Get('type/:selectedType/:selected')
  async getProductsBySpecType(
      @Param('selected') selected: string,
      @Param('selectedType') selectedType: string
  ) {
    await this.getProductsByType(selectedType);
    return await this.productService.getProductBySpecType(selected);
  }

  @Get()
  async getProduct(@Param('id') id: number) {
    await this.productService.getProduct(id);
  }
}
