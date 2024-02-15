import {Module, ValidationPipe} from "@nestjs/common";
import { RegisterController } from "./register.controller";
import {RegisterService} from "./register.service";
import {PrismaService} from "../prisma.service";
import {APP_PIPE} from "@nestjs/core";


@Module({
    imports: [],
    controllers: [RegisterController],
    providers: [RegisterService,
        PrismaService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({ transform: true })
        }],
})

export class RegisterModule {}