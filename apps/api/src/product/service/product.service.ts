import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '@prisma/client';
import { ExtendedProduct } from 'client/src/interfaces';

/**
 * Service for handling product-related operations.
 */
@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    /**
     * Retrieves the total count of all products.
     * @returns The total count of products.
     */
    async getAllProductsCount(): Promise<number> {
        const products = await this.prisma.product.findMany();
        return products.length;
    }

    /**
     * Searches for products based on the provided query.
     * @param query The search query to filter products.
     * @returns Products matching the search query.
     */
    async productFindMany(query: string): Promise<ExtendedProduct[]> {
        return this.prisma.product.findMany({
            where: {
                product_name: {
                    contains: query,
                },
            },
            include: {
                ProductPictures: true,
            },
        });
    }

    /**
     * Retrieves all products with pagination.
     * @param page The page number for pagination.
     * @param limit The maximum number of products per page.
     * @returns All products with pagination.
     */
    async getAllProductsWithLimit(page: number, limit: number): Promise<Product[]> {
        const skip = (page - 1) * limit;
        return this.prisma.product.findMany({
            include: {
                ProductPictures: true,
            },
            skip,
            take: limit,
        });
    }

    /**
     * Retrieves all products.
     * @returns All products.
     */
    async getAllProducts(): Promise<Product[]> {
        return this.prisma.product.findMany({
            include: {
                ProductPictures: true,
            },
        });
    }

    /**
     * Retrieves products by their type.
     * @param selectedType The type of products to retrieve.
     * @returns Products matching the specified type.
     */
    async getProductByType(selectedType: string): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            where: {
                product_type: selectedType,
            },
            include: {
                ProductPictures: {
                    select: {
                        image: true,
                    },
                },
            },
        });
        return products;
    }

    /**
     * Retrieves products by their specific type.
     * @param selectedType The specific type of products to retrieve.
     * @returns Products matching the specified specific type.
     */
    async getProductBySpecType(selectedType: string): Promise<Product[]> {
        const products = await this.prisma.product.findMany({
            where: {
                product_spectype: selectedType,
            },
            include: {
                ProductPictures: {
                    select: {
                        image: true,
                    },
                },
            },
        });
        return products;
    }

    /**
     * Retrieves a product by its ID.
     * @param selected The unique identifier of the product.
     * @returns The product with the specified ID.
     */
    async getProduct(selected: number): Promise<Product> {
        const productById = await this.prisma.product.findFirst({
            where: {
                product_id: selected,
            },
            include: {
                ProductPictures: {
                    select: {
                        image: true,
                    },
                },
            },
        });
        return productById;
    }
}
