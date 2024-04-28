import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Product } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/all')
  findAll(): Promise<Product[]> {
    return this.adminService.findAll();
  }

  @Post('/new')
  createProduct(@Body() productData: Product): Promise<Product> {
    return this.adminService.createProduct(productData);
  }

  @Put('/update/:id')
  updateProduct(@Param('id') id: string, @Body() productData: Product): Promise<Product> {
    return this.adminService.updateProduct(Number(id), productData);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.adminService.deleteProduct(Number(id));
  }
}
