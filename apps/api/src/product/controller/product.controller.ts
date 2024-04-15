import { Body, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { Product } from "@prisma/client";
import { ExtendedProduct } from "client/src/interfaces";
import { ApiTags, ApiQuery, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('count')
  @ApiResponse({ status: 200, description: 'Returns the total count of products' })
  async getProductCount() {
    const totalCount = await this.productService.getAllProductsCount()
    return {
      totalCount: totalCount
    }
  }

  @Get('all')
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'The page number for pagination' })
  @ApiQuery({ name: 'limit', type: Number, required: false, description: 'The maximum number of products per page' })
  @ApiResponse({ status: 200, description: 'Returns all products with pagination' })
  async getAllProducts(
      @Query('page', ParseIntPipe) page?: number,
      @Query('limit', ParseIntPipe) limit?: number,
  ) {
    return this.productService.getAllProductsWithLimit(page, limit);
  }

  @Get('search')
  @ApiQuery({ name: 'query', type: String, description: 'The search query to filter products' })
  @ApiResponse({ status: 200, description: 'Returns products matching the search query' })
  async search(@Query('query') query: string): Promise<ExtendedProduct[]> {
    return this.productService.productFindMany(query);
  }

  @Get('mobile')
  @ApiResponse({ status: 200, description: 'Returns all products suitable for mobile devices' })
  async getProductsMobile() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the product' })
  @ApiResponse({ status: 200, description: 'Returns a specific product by ID' })
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProduct(id);
  }

  @Get('type')
  @ApiQuery({ name: 'selectedType', type: String, description: 'The type of products to retrieve' })
  @ApiResponse({ status: 200, description: 'Returns products by type with pagination' })
  async getProductsByType(
      @Query('selectedType') selectedType: string,
  ) {
    return await this.productService.getProductByType(selectedType);
  }

  @Get('specific-type')
  @ApiQuery({ name: 'selected', type: String, description: 'The specific type of products to retrieve' })
  @ApiQuery({ name: 'selectedType', type: String, description: 'The general type of products to filter further' })
  @ApiResponse({ status: 200, description: 'Returns products by specific type with pagination' })
  async getProductsBySpecType(
      @Query('selected') selected: string,
      @Query('selectedType') selectedType: string
  ) {
    await this.getProductsByType(selectedType);
    return await this.productService.getProductBySpecType(selected);
  }
}
