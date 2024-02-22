/*
  Warnings:

  - You are about to alter the column `product_pic` on the `product` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `product_pic` VARCHAR(100) NOT NULL;
