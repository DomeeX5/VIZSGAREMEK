import {Module} from "@nestjs/common";
import {PrismaService} from "./prisma.service";


/**
 * Module for providing the Prisma service throughout the application.
 */
@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})


export default class PrismaModule {}
