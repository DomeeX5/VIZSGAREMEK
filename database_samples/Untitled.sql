CREATE TABLE `orders` (
  `order_id` integer PRIMARY KEY,
  `total` integer,
  `customer_name` varchar2,
  `order_time` timestamp
);

CREATE TABLE `order_item` (
  `quantity` integer
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY,
  `price` integer,
  `name` varchar2,
  `description` varchar2
);

CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY,
  `email` varchar2,
  `username` varchar2,
  `password` varchar2,
  `admin` bool
);

CREATE TABLE `customers` (
  `customer_id` integer PRIMARY KEY,
  `full_name` varchar2,
  `address` varchar2
);

ALTER TABLE `order_item` ADD FOREIGN KEY (`quantity`) REFERENCES `orders` (`order_id`);

ALTER TABLE `order_item` ADD FOREIGN KEY (`quantity`) REFERENCES `products` (`id`);
