import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Product } from '@prisma/client';
import { ExtendedProduct } from 'client/src/interfaces';

describe('ProductService', () => {
    let service: ProductService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductService, PrismaService],
        }).compile();

        service = module.get<ProductService>(ProductService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockExtendedProducts: ExtendedProduct[] = [
        {
            product_id: 1,
            product_name: "Test Product",
            product_type: "Test Type",
            product_spectype: "Test SpecificType",
            price: 10,
            description: "Test Description",
            ProductPictures: [{
                image: "test.jpg",
                id: 1,
                productId: 1,
            }],
        },
        {
            product_id: 2,
            product_name: "Test Product 2",
            product_type: "Test Type",
            product_spectype: "Test SpecificType",
            price: 20,
            description: "Test Description",
            ProductPictures: [{
                image: "test.jpg",
                id: 1,
                productId: 1,
            }],
        },
        {
            product_id: 3,
            product_name: "Test Product 2",
            product_type: "Test Type",
            product_spectype: "Test SpecificType",
            price: 30,
            description: "Test Description",
            ProductPictures: [{
                image: "test.jpg",
                id: 1,
                productId: 1,
            }],
        },
        {
            product_id: 3,
            product_name: "Test Product 2",
            product_type: "Test Type",
            product_spectype: "Test SpecificType",
            price: 30,
            description: "Test Description",
            ProductPictures: [{
                image: "test.jpg",
                id: 1,
                productId: 1,
            }],
        },];
    const mockProducts: Product[] = [
        {
            product_id: 1,
            product_name: 'Mock Product',
            product_type: 'Mock Type',
            product_spectype: 'Mock Spec Type',
            price: 10,
            description: 'Mock Description',
        },
        {
            product_id: 2,
            product_name: 'Mock Product',
            product_type: 'Mock Type',
            product_spectype: 'Mock Spec Type',
            price: 10,
            description: 'Mock Description',
        },
        {
            product_id: 3,
            product_name: 'Mock Product',
            product_type: 'Mock Type',
            product_spectype: 'Mock Spec Type',
            price: 10,
            description: 'Mock Description',
        }];

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllProductsCount', () => {
        it('should return the count of all products', async () => {

            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(mockProducts);

            const count = await service.getAllProductsCount();

            expect(count).toBe(mockProducts.length);
            expect(prismaService.product.findMany).toHaveBeenCalled();
        });
    });

    describe('productFindMany', () => {
        it('should return products matching the query', async () => {
            const mockQuery = 'Product 2';
            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(mockExtendedProducts);

            const result = await service.productFindMany(mockQuery);

            expect(result).toEqual(mockExtendedProducts);
            expect(prismaService.product.findMany).toHaveBeenCalledWith({
                where: {
                    product_name: {
                        contains: mockQuery,
                    },
                },
                include: {
                    ProductPictures: true,
                },
            });
        });
    });

    describe('getAllProductsWithLimit', () => {
        it('should return products with pagination', async () => {
            const mockPage = 1;
            const mockLimit = 10;
            const mockSkip = (mockPage - 1) * mockLimit;

            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(mockExtendedProducts);

            const result = await service.getAllProductsWithLimit(mockPage, mockLimit);

            expect(result).toEqual(mockExtendedProducts);
            expect(prismaService.product.findMany).toHaveBeenCalledWith({
                include: {
                    ProductPictures: true,
                },
                skip: mockSkip,
                take: mockLimit,
            });
        });
    });

    describe('getAllProducts', () => {
        it('should return all products', async () => {
            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(mockExtendedProducts);

            const result = await service.getAllProducts();

            expect(result).toEqual(mockExtendedProducts);
            expect(prismaService.product.findMany).toHaveBeenCalledWith({
                include: {
                    ProductPictures: true,
                },
            });
        });
    });

    describe('getProductByType', () => {
        it('should return products of a specific type with pagination', async () => {
            const mockType = 'mockType';
            const mockPage = 1;
            const mockLimit = 10;
            const mockSkip = (mockPage - 1) * mockLimit;
            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(mockProducts);

            const result = await service.getProductByType(mockType);

            expect(result).toEqual(mockProducts);
            expect(prismaService.product.findMany).toHaveBeenCalledWith({
                where: {
                    product_type: mockType,
                },
                include: {
                    ProductPictures: {
                        select: {
                            image: true,
                        },
                    },
                }
            });
        });
    });

    describe('getProductBySpecType', () => {
        it('should return products of a specific special type with pagination', async () => {
            const mockType = 'mockType';
            const mockPage = 1;
            const mockLimit = 10;
            const mockSkip = (mockPage - 1) * mockLimit;
            jest.spyOn(prismaService.product, 'findMany').mockResolvedValue(mockProducts);

            const result = await service.getProductBySpecType(mockType);

            expect(result).toEqual(mockProducts);
            expect(prismaService.product.findMany).toHaveBeenCalledWith({
                where: {
                    product_spectype: mockType,
                },
                include: {
                    ProductPictures: {
                        select: {
                            image: true,
                        },
                    },
                }
            });
        });
    });

    describe('getProduct', () => {
        it('should return product by ID', async () => {
            const mockProductId = 1;
            const mockProduct: Product = {
                product_id: 2,
                product_name: 'product',
                price: 100,
                product_spectype: 'spectype',
                product_type: 'type',
                description: 'description'
            }; // Mocked product
            jest.spyOn(prismaService.product, 'findFirst').mockResolvedValue(mockProduct);

            const result = await service.getProduct(mockProductId);

            expect(result).toEqual(mockProduct);
            expect(prismaService.product.findFirst).toHaveBeenCalledWith({
                where: {
                    product_id: mockProductId,
                },
                include: {
                    ProductPictures: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
        });
    });
});

