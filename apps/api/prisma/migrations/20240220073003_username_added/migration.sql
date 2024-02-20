/*
  Warnings:

  - You are about to drop the column `Customer_cust_id` on the `order` table. All the data in the column will be lost.
  - You are about to alter the column `type_name` on the `payment_type` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `priv_name` on the `privilages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `product_name` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to drop the column `Zip_zip_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `state` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zip` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_pic` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `city` DROP FOREIGN KEY `City_Country_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `city` DROP FOREIGN KEY `City_State_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_Zip_zip_id_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_userUser_id_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_Customer_cust_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_Privilages_priv_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_Zip_zip_id_fkey`;

-- DropForeignKey
ALTER TABLE `zip` DROP FOREIGN KEY `Zip_City_city_id_City_Country_country_id_fkey`;

-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `Customer_cust_id`;

-- AlterTable
ALTER TABLE `payment_type` MODIFY `type_name` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `privilages` MODIFY `priv_id` INTEGER NOT NULL,
    MODIFY `priv_name` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `product_pic` LONGBLOB NOT NULL,
    MODIFY `product_name` VARCHAR(45) NOT NULL,
    MODIFY `descreption` VARCHAR(500) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `Zip_zip_id`,
    DROP COLUMN `address`,
    MODIFY `username` VARCHAR(20) NOT NULL,
    MODIFY `email` VARCHAR(45) NOT NULL,
    MODIFY `password` VARCHAR(45) NOT NULL,
    MODIFY `Privilages_priv_id` INTEGER NULL DEFAULT 20;

-- DropTable
DROP TABLE `city`;

-- DropTable
DROP TABLE `country`;

-- DropTable
DROP TABLE `customer`;

-- DropTable
DROP TABLE `state`;

-- DropTable
DROP TABLE `zip`;

-- CreateTable
CREATE TABLE `Address` (
    `address_id` INTEGER NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    `state` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `street` VARCHAR(45) NOT NULL,
    `house_number` INTEGER NOT NULL,
    `User_user_id` INTEGER NOT NULL,

    PRIMARY KEY (`address_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Privilages_priv_id_fkey` FOREIGN KEY (`Privilages_priv_id`) REFERENCES `Privilages`(`priv_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
