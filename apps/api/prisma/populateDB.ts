import {PrismaClient} from "@prisma/client";
import {Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaService} from "../src/prisma.service";


@Injectable()
export class dbFiller implements OnModuleInit {
    constructor(private prisma: PrismaService) {}
    async main(): Promise<void> {
        await this.prisma.product.createMany({
            data: [
                {
                    product_name: "GIGABYTE GTX 1660 SUPER D6 6G 6GB GDDR6 videokártya",
                    product_type: "GPU",
                    product_spectype: "computer_part",
                    price: 110000,
                    description: "Chipset gyártó: nVidia\n" +
                        "DirectX: 12\n" +
                        "Gyártó: GIGABYTE\n" +
                        "Hűtés típusa: Aktív\n" +
                        "Kivitel: Dobozos\n" +
                        "Magórajel: 1785 Mhz\n" +
                        "Memória.: 6\n" +
                        "Memória sávszélesség: 192 Bit\n" +
                        "Memória órajel: 14000 Mhz\n" +
                        "OpenGL: 4.6\n" +
                        "SLI/CrossFire támogatás: Van\n" +
                        "Chipset típusa: GTX1660 Super\n" +
                        "DVI: 0 db\n" +
                        "Csatlakozófelület: PCI-e x16\n" +
                        "D-Sub:\n" +
                        "Memória típusa: GDDR6\n" +
                        "Low profile: Nincs\n" +
                        "Displayport: 3\n" +
                        "HDMI: 1 X\n" +
                        "Mini Displayport:\n" +
                        "USB Type-C: db",
                    product_pic: "https://i.imgur.com/KsRGYOE.jpeg"
                },
                {
                    product_name: "GIGABYTE RTX 3060 Gaming OC 12G 2.0 12GB GDDR6 videokártya",
                    product_type: "GPU",
                    product_spectype: "computer_part",
                    price: 135000,
                    description: "Chip gyártó : Nvidia\n" +
                        "Chip típus : Nvidia GeForce RTX 3060\n" +
                        "Chip órajel : 1837 MHz\n" +
                        "Csatoló felület : PCI-E 4.0\n" +
                        "Memória méret : 12 GB\n" +
                        "Memória típus : GDDR6\n" +
                        "Memória órajel : 15000 MHz\n" +
                        "Memória interfész : 192 bit\n" +
                        "Portok : DisplayPort\n" +
                        "HDMI\n" +
                        "Chip hűtés : Aktív",
                    product_pic: "https://i.imgur.com/DWVzqdP.jpeg"
                }
            ]

        })
    }

    async onModuleInit() {
        await this.main()
    }
}

