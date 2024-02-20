/*
  Warnings:

  - Added the required column `product_pic` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `product_pic` LONGBLOB NOT NULL;
