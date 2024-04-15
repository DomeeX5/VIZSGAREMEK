import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../service/product.service';
import { ExtendedProduct } from 'client/src/interfaces';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductController', () => {
    let controller: ProductController;
    let productService: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService, PrismaService],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        productService = module.get<ProductService>(ProductService);
    });

    const page = 1;
    const limit = 10;
    const products: ExtendedProduct[] = [
        {
            product_id: 1,
            product_name: 'Product 1',
            product_type: 'Type A',
            product_spectype: 'Spec Type 1',
            price: 10.99,
            description: 'Description for Product 1',
            ProductPictures: [{ image: 'image1.jpg', id: 1, productId: 1 }, { image: 'image2.jpg', id: 2, productId: 1 }],
        },
        {
            product_id: 2,
            product_name: 'Product 2',
            product_type: 'Type B',
            product_spectype: 'Spec Type 1',
            price: 10.99,
            description: 'Description for Product 1',
            ProductPictures: [{ image: 'image1.jpg', id: 3, productId: 2 }, { image: 'image2.jpg', id: 4, productId: 2 }],
        }
    ];

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getProductCount', () => {
        it('should return total count of products', async () => {
            const totalCount = 10;
            jest.spyOn(productService, 'getAllProductsCount').mockResolvedValue(totalCount);

            const result = await controller.getProductCount();

            expect(result).toEqual({ totalCount });
        });
    });

    describe('getAllProducts', () => {
        it('should return products with pagination', async () => {
            jest.spyOn(productService, 'getAllProductsWithLimit').mockResolvedValue(products);

            const result = await controller.getAllProducts(page, limit);

            expect(result).toEqual(products);
        });
    });

    describe('search', () => {
        it('should return products matching the query', async () => {
            const query = 'test';
            jest.spyOn(productService, 'productFindMany').mockResolvedValue(products);

            const result = await controller.search(query);

            expect(result).toEqual(products);
        });
    });

    describe('getProductsMobile', () => {
        it('should return all products', async () => {
            jest.spyOn(productService, 'getAllProducts').mockResolvedValue(products);

            const result = await controller.getProductsMobile();

            expect(result).toEqual(products);
        });
    });

    describe('getProductsByType', () => {
        it('should return products by type with pagination', async () => {
            const selectedType = 'type';
            jest.spyOn(productService, 'getProductByType').mockResolvedValue(products);

            const result = await controller.getProductsByType(selectedType);

            expect(result).toEqual(products);
        });
    });

    describe('getProductsBySpecType', () => {
        it('should return products by specific type with pagination', async () => {
            const selectedType = 'specType';
            const selected = 'selected';
            jest.spyOn(productService, 'getProductBySpecType').mockResolvedValue(products);

            const result = await controller.getProductsBySpecType(selected, selectedType);

            expect(result).toEqual(products);
        });
    });

    describe('getProduct', () => {
        it('should return product by id', async () => {
            const id = 1;
            const product: ExtendedProduct = {
                product_id: 1,
                product_name: 'Product 1',
                product_type: 'Type A',
                product_spectype: 'Spec Type 1',
                price: 10.99,
                description: 'Description for Product 1',
                ProductPictures: [{ image: 'image1.jpg', id: 1, productId: 1 }],
            };
            jest.spyOn(productService, 'getProduct').mockResolvedValue(product);

            const result = await controller.getProduct(id);

            expect(result).toEqual(product);
        });
    });
});
