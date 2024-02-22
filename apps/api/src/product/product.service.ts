import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ProductService {

    constructor(private prisma: PrismaService) {}

    async getAllProducts() {
        await this.prisma.product.findMany();
    }

    async getProductByType(selectedOption: string) {
        await this.prisma.product.findMany( {
            where: {
                product_type: selectedOption,
            }
        })
    }

    async getProductBySpecType(selectedOption: string) {
        await this.prisma.product.findMany({
            where: {
                product_spectype: selectedOption,
            }
        })
    }

    async getProduct(selected: number) {
        await this.prisma.product.findUnique({
            where: {
                product_id: selected,
            }
        })
    }
}
