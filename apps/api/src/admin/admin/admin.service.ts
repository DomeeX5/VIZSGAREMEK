import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class AdminService {

    constructor(private prisma: PrismaService) {}
    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async createProduct(productData: Product): Promise<Product> {
        return this.prisma.product.create({ data: productData });
    }

    async updateProduct(id: number, productData: Product): Promise<Product> {
        return this.prisma.product.update({
            where: { product_id: id },
            data: productData,
        });
    }

    async deleteProduct(id: number): Promise<Product> {
        return this.prisma.product.delete({ where: { product_id: id } });
    }
}
