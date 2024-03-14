import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Product} from "@prisma/client";
import {take} from "rxjs";

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async getAllProducts(page: number, limit: number) {
        const skip = (page - 1) * limit;
        return this.prisma.product.findMany({
            include: {
                ProductPictures: true
            },
            skip,
            take: limit,
        });
    }

    async getProductByType(selectedType: string): Promise<Product[]>{
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
            }
        })
        return products;
    }

    async getProductBySpecType(selectedType: string) {
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
            }
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
