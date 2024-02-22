/*
  Warnings:

  - You are about to drop the column `descreption` on the `product` table. All the data in the column will be lost.
  - Added the required column `product_spectype` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `descreption`,
    ADD COLUMN `description` VARCHAR(500) NULL,
    ADD COLUMN `product_spectype` VARCHAR(30) NOT NULL,
    ADD COLUMN `product_type` VARCHAR(30) NOT NULL;
