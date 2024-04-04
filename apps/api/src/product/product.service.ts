import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Product} from "@prisma/client";
import {take} from "rxjs";
import {ExtendedProduct} from "client/src/interfaces";

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async getAllProductsCount() {
        const products = await this.prisma.product.findMany()
        return products.length;
    }

    async productFindMany(query: string): Promise<ExtendedProduct[]> {
        return this.prisma.product.findMany({
            where: {
                product_name: {
                    contains: query,

                },
            },
            include: {
                ProductPictures: true
            }
        });
    }
    async getAllProductsWithLimit(page: number, limit: number) {
        const skip = (page - 1) * limit;
        return this.prisma.product.findMany({
            include: {
                ProductPictures: true
            },
            skip,
            take: limit,
        });
    }

    async getAllProducts() {
        return this.prisma.product.findMany({
            include: {
                ProductPictures: true
            },
        });
    }
    async getProductByType(selectedType: string, page: number, limit: number): Promise<Product[]>{
        const skip = (page - 1) * limit;
        const products = await this.prisma.product.findMany( {
            where: {
                product_type: selectedType,
            },
            include: {
                ProductPictures: {
                    select: {
                        image: true,
                    }
                }
            },
            skip,
            take: limit
        })
        return products;
    }

    async getProductBySpecType(selectedType: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const products = await this.prisma.product.findMany( {
            where: {
                product_spectype: selectedType,
            },
            include: {
                ProductPictures: {
                    select: {
                        image: true,
                    }
                }
            },
            skip,
            take: limit
        })
        return products as Product[];
    }

    async getProduct(selected: number) {
        const productById = await this.prisma.product.findFirst({
            where: {
                product_id: selected,
            },
            include: {
                ProductPictures: {
                    select: {
                        image: true
                    }
                }
            }
        });

        return productById;
    }
}
