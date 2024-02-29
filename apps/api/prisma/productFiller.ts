import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProducts() {
    const products = [
        {
            name: 'Product 1',
            type: 'Type 1',
            specType: 'SpecType 1',
            price: 100,
            description: 'Description for Product 1',
            imageUrl: 'https://i.imgur.com/yCNTBy1.jpeg'
        },
        {
            name: 'Product 2',
            type: 'Type 2',
            specType: 'SpecType 2',
            price: 200,
            description: 'Description for Product 2',
            imageUrl: 'https://i.imgur.com/Cna6uZd.png'
        },

    ];

    for (const product of products) {
        const createdProduct = await prisma.product.create({
            data: {
                product_name: product.name,
                product_type: product.type,
                product_spectype: product.specType,
                price: product.price,
                description: product.description
            }
        });

        await prisma.productPictures.create({
            data: {
                image: product.imageUrl,
                productId: createdProduct.product_id
            }
        });
    }

    console.log('Products seeded successfully!');
}

seedProducts()
    .catch((error) => {
        console.error('Error seeding products:', error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
