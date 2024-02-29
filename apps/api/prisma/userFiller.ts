import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
    const privilages = [
        {
            priv_id: 10,
            priv_name: "admin"
        },
        {
            priv_id: 20,
            priv_name: "user"
        }
    ]

    const users = [
        {
            username : "testUser",
            email : "testUser@test1.com",
            password: "Password123_"
        },
        {
            username : "testUser",
            email : "testUser@test2.com",
            password: "Password123_"
        },
        {
            username : "testUser",
            email : "testUser@test3.com",
            password: "Password123_"
        },
    ];

    for (const priv of privilages) {
        await prisma.privilages.create({
            data: {
                priv_id: priv.priv_id,
                priv_name: priv.priv_name
            }
        })
    }

    for (const user of users) {
        await prisma.user.create({
            data: {
                username : user.username,
                email : user.email,
                password: user.password
            }
        });
    }

    console.log('Users seeded successfully!');
}

seedUsers()
    .catch((error) => {
        console.error('Error seeding products:', error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
