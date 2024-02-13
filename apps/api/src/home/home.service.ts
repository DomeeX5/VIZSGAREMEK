import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";

@Injectable()
export class HomeService {
    getHello(): string {
        return 'Hello!';
    }
}
