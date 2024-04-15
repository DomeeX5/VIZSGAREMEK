import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Service for interacting with the Prisma ORM.
 * Extends PrismaClient from the Prisma client library.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    /**
     * Initializes the Prisma client upon module initialization.
     */
    async onModuleInit() {
        await this.$connect();
    }
}
