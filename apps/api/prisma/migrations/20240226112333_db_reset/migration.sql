-- CreateTable
CREATE TABLE `Payment_type` (
    `pay_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`pay_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Privilages` (
    `priv_id` INTEGER NOT NULL,
    `priv_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`priv_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(400) NOT NULL,
    `Privilages_priv_id` INTEGER NULL DEFAULT 20,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_date` DATETIME(3) NOT NULL,
    `ship_date` DATETIME(3) NULL,
    `Payment_type_pay_id` INTEGER NOT NULL,
    `User_user_id` INTEGER NULL,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(45) NOT NULL,
    `product_type` VARCHAR(30) NOT NULL,
    `product_spectype` VARCHAR(30) NOT NULL,
    `price` INTEGER NOT NULL,
    `description` VARCHAR(500) NULL,
    `product_pic` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `Product_product_id` INTEGER NOT NULL,
    `Order_order_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `actual_price` INTEGER NOT NULL,

    PRIMARY KEY (`Product_product_id`, `Order_order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `cart_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `User_user_id` INTEGER NOT NULL,
    `Product_product_id` INTEGER NOT NULL,

    UNIQUE INDEX `CartItem_User_user_id_Product_product_id_key`(`User_user_id`, `Product_product_id`),
    PRIMARY KEY (`cart_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_Privilages_priv_id_fkey` FOREIGN KEY (`Privilages_priv_id`) REFERENCES `Privilages`(`priv_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_Payment_type_pay_id_fkey` FOREIGN KEY (`Payment_type_pay_id`) REFERENCES `Payment_type`(`pay_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_Product_product_id_fkey` FOREIGN KEY (`Product_product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_Order_order_id_fkey` FOREIGN KEY (`Order_order_id`) REFERENCES `Order`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_Product_product_id_fkey` FOREIGN KEY (`Product_product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
