import {Body, Controller, Get, Param} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    await this.productService.getAllProducts();
  }

  @Get(`:selectedType`)
  async getProductsByType(@Param('selectedType') selectedType: string) {
    await this.productService.getProductByType(selectedType);
  }

  @Get(':selectedType/:selected')
  async getProductsBySpecType(
      @Param('selected') selected: string,
      @Param('selectedType') selectedType: string
  ) {
    await this.getProductsByType(selectedType);
    await this.productService.getProductBySpecType(selected);
  }

  @Get()
  async getProduct(@Param('id') id: number) {
    await this.productService.getProduct(id);
  }
}
