import { Body, Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { Product } from "@prisma/client";
import { ExtendedProduct } from "client/src/interfaces";
import { ApiTags, ApiQuery, ApiParam, ApiResponse } from "@nestjs/swagger";

/**
 * Controller for handling product-related endpoints.
 */
@Controller('products')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   * Retrieves the total count of products.
   */
  @Get('count')
  @ApiResponse({ status: 200, description: 'Returns the total count of products' })
  async getProductCount() {
    const totalCount = await this.productService.getAllProductsCount()
    return {
      totalCount: totalCount
    }
  }

  /**
   * Retrieves all products with pagination.
   * @param page The page number for pagination.
   * @param limit The maximum number of products per page.
   */
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

  /**
   * Searches for products matching the provided query.
   * @param query The search query to filter products.
   */
  @Get('search')
  @ApiQuery({ name: 'query', type: String, description: 'The search query to filter products' })
  @ApiResponse({ status: 200, description: 'Returns products matching the search query' })
  async search(@Query('query') query: string): Promise<ExtendedProduct[]> {
    return this.productService.productFindMany(query);
  }

  /**
   * Retrieves all products suitable for mobile devices.
   */
  @Get('mobile')
  @ApiResponse({ status: 200, description: 'Returns all products suitable for mobile devices' })
  async getProductsMobile() {
    return this.productService.getAllProducts();
  }

  /**
   * Retrieves a specific product by ID.
   * @param id The unique identifier of the product.
   */
  @Get(':id')
  @ApiParam({ name: 'id', type: Number, description: 'The unique identifier of the product' })
  @ApiResponse({ status: 200, description: 'Returns a specific product by ID' })
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProduct(id);
  }

  /**
   * Retrieves products by type with pagination.
   * @param selectedType The type of products to retrieve.
   */
  @Get('type')
  @ApiQuery({ name: 'selectedType', type: String, description: 'The type of products to retrieve' })
  @ApiResponse({ status: 200, description: 'Returns products by type with pagination' })
  async getProductsByType(
      @Query('selectedType') selectedType: string,
  ) {
    return await this.productService.getProductByType(selectedType);
  }

  /**
   * Retrieves products by specific type with pagination.
   * @param selected The specific type of products to retrieve.
   * @param selectedType The general type of products to filter further.
   */
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
