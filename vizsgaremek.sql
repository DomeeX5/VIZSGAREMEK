-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 28. 20:38
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `vizsgaremek2`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `country` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `house_number` int(11) NOT NULL,
  `User_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `cartitem`
--

CREATE TABLE `cartitem` (
  `cart_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `User_user_id` int(11) NOT NULL,
  `Product_product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `cartitem`
--

INSERT INTO `cartitem` (`cart_item_id`, `quantity`, `User_user_id`, `Product_product_id`) VALUES
(28, 1, 8, 1),
(29, 1, 8, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order`
--

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL,
  `order_date` datetime(3) NOT NULL,
  `ship_date` datetime(3) DEFAULT NULL,
  `Payment_type_pay_id` int(11) NOT NULL,
  `User_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `order`
--

INSERT INTO `order` (`order_id`, `order_date`, `ship_date`, `Payment_type_pay_id`, `User_user_id`) VALUES
(1, '2024-04-02 10:39:17.797', NULL, 10, 5),
(2, '2024-04-11 11:55:52.185', NULL, 20, 5),
(3, '2024-04-17 08:09:09.863', NULL, 30, 7);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderitem`
--

CREATE TABLE `orderitem` (
  `Product_product_id` int(11) NOT NULL,
  `Order_order_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `actual_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `orderitem`
--

INSERT INTO `orderitem` (`Product_product_id`, `Order_order_id`, `quantity`, `actual_price`) VALUES
(1, 3, 1, 219899),
(2, 1, 8, 100),
(2, 2, 23, 100),
(2, 3, 1, 154999),
(3, 1, 1, 200),
(4, 2, 21, 200),
(7, 3, 1, 13999),
(8, 3, 1, 939999);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `order_address`
--

CREATE TABLE `order_address` (
  `address_id` int(11) NOT NULL,
  `country` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `house_number` int(11) NOT NULL,
  `Order_order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `order_address`
--

INSERT INTO `order_address` (`address_id`, `country`, `state`, `city`, `street`, `house_number`, `Order_order_id`) VALUES
(1, 'Magyarország', 'Fejér', 'Ráckeresztúr', 'Orgona utca', 4, 1),
(2, 'adfkdsb', 'hhkfdsjfs', 'sdjfdsfjksd', 'dfjsfhdsj', 23, 2),
(3, 'Magyarország', 'Pest', 'Százhalombatta', 'Petőfi Sándor utca', 23, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `payment_type`
--

CREATE TABLE `payment_type` (
  `pay_id` int(11) NOT NULL,
  `type_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `payment_type`
--

INSERT INTO `payment_type` (`pay_id`, `type_name`) VALUES
(10, 'Utalás'),
(20, 'Bank kártyás'),
(30, 'Átvétel');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `privilages`
--

CREATE TABLE `privilages` (
  `priv_id` int(11) NOT NULL,
  `priv_name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `privilages`
--

INSERT INTO `privilages` (`priv_id`, `priv_name`) VALUES
(10, 'admin'),
(20, 'user');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `product_type` varchar(30) NOT NULL,
  `product_spectype` varchar(30) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `product_spectype`, `price`, `description`) VALUES
(1, 'HP Pavilion 14-ec0010nh Windows 10 fehér note', 'Type 1', 'SpecType 1', 219899, '\r\n\r\nA HP Pavilion 14-ec0010nh 472Y6EA laptop számos lenyűgöző újítással érkezik. Egyedi kinézetével magára vonja a tekintetet. Kiválóan alkalmas mind munkavégzésre, mind szórakozásra. Nagy teljesítménye megfelel a legkomolyabb kihívásoknak is.'),
(2, 'Bosch SMS25AI05E Serie 2 Mosogatógép', 'Type 1', 'SpecType 1', 154999, 'Energiatakarékosság és teljesítmény Energiaosztály: E\r\n12 teríték mosogatására alkalmas\r\nEnergiafelhasználás eco program 50 °C-on: 258 kWh/év\r\nEnergiafogyasztás eco program 50 °C-on: 0.9 kWh\r\nVízfogyasztás eco program 50 °C-on: 2660 Liter/év\r\nVízfelhasználás eco program 50 °C-on: 9.5 l\r\nSzárítási hatékonyság: A (A-tól G-ig terjedő skálán)\r\nProgramidő eco program 50 °C-on: 210 perc\r\nZajszint: 48 dB (re 1 pW)\r\n2 speciális opció: \r\nVarioSpeed Plus, \r\nFéltöltet Piros színű display kijelz'),
(3, 'Gorenje WNEI94BS Elöltöltős mosógép', 'Type 2', 'SpecType 2', 164799, 'Description for Product 2'),
(4, 'Tesla 24MC625BF 24\" Full HD IPS Monitor', 'Type 2', 'SpecType 2', 78989, 'Description for Product 2'),
(5, 'Xplora XGO3 Nano Sim Gyerek okosóra', 'Type 1', 'SpecType 1', 52989, 'Az Xplora XGO3 okosóra gyerekeknek tökéletes bevezetés a digitális világba! Minden kulcsfontosságú funkcióval rendelkezik a biztonságos induláshoz. Kényelmet, biztonságot és szórakozást nyújt a mindennapokban az egész család számára. A mobilkapcsolatnak köszönhetően a gyerekek gondtalanul fedezhetik fel a világot, és bármikor kommunikálhatnak barátaikkal és rokonaikkal.'),
(6, 'X-X Suli i1304 i3 12100/8GB/480GB SSD Bill.', 'Type 1', 'SpecType 1', 179999, 'Internetezésre, filmnézésre, munkára és más hasonló feladatokra is tökéletesen alkalmas, de megfelelő videokártyával akár a legújabb játékok futtatására is elegendő a teljesítmény. Válaszd ki melyik X-X illik legjobban hozzád.'),
(7, 'Trust GXT 838 Gamer Billentyűzet + Egér', 'Type 2', 'SpecType 2', 13999, ''),
(8, 'GIGABYTE GeForce RTX 4090 AERO OC 24G ', 'Type 2', 'SpecType 2', 939999, ''),
(9, 'Lamax Sphere2 Vezeték nélküli hangszóró', 'Type 1', 'SpecType 1', 8490, 'Description for Product 1'),
(10, 'Dyras BL-43US14EU 43\" UHD SMART LED TV', 'Type 1', 'SpecType 1', 99900, 'Description for Product 1'),
(11, 'Hyundai HYD-601B Hőlégfúvó, 2000W', 'Type 2', 'SpecType 2', 8999, 'Description for Product 2'),
(12, 'Sony WFC500B.CE7 Vezeték nélküli fülhallgató', 'Type 2', 'SpecType 2', 25999, ''),
(13, 'AgfaPhoto Realkids Cam 2 ', 'Type 1', 'SpecType 1', 24000, 'Description for Product 1'),
(14, 'Xiaomi Redmi Note 12S 8/256GB', 'Type 1', 'SpecType 1', 89989, 'Description for Product 1'),
(15, 'Hyundai HYD-1005A Kézi gyalugép', 'Type 2', 'SpecType 2', 19999, 'Description for Product 2'),
(16, 'Denver DCW-380 Drón Fekete ', 'Type 2', 'SpecType 2', 22000, 'Description for Product 2'),
(17, 'Product 1', 'Type 1', 'SpecType 1', 100, 'Description for Product 1'),
(18, 'Product 1', 'Type 1', 'SpecType 1', 100, 'Description for Product 1'),
(19, 'Product 2', 'Type 2', 'SpecType 2', 200, 'Description for Product 2'),
(20, 'Product 2', 'Type 2', 'SpecType 2', 200, 'Description for Product 2'),
(21, 'Product 1', 'Type 1', 'SpecType 1', 100, 'Description for Product 1'),
(22, 'Product 2', 'Type 2', 'SpecType 2', 200, 'Description for Product 2'),
(23, 'Product 1', 'Type 1', 'SpecType 1', 100, 'Description for Product 1'),
(24, 'Product 2', 'Type 2', 'SpecType 2', 200, 'Description for Product 2'),
(25, 'Product 1', 'Type 1', 'SpecType 1', 100, 'Description for Product 1'),
(26, 'Product 1', 'Type 1', 'SpecType 1', 100, 'Description for Product 1'),
(27, 'Product 2', 'Type 2', 'SpecType 2', 200, 'Description for Product 2'),
(28, 'Product 2', 'Type 2', 'SpecType 2', 200, 'Description for Product 2');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `productpictures`
--

CREATE TABLE `productpictures` (
  `id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `productpictures`
--

INSERT INTO `productpictures` (`id`, `image`, `productId`) VALUES
(1, 'https://images.euronics.hu/product_images/800x600/resize/9683174490142_d1ass981.jpg?v=2', 2),
(2, 'https://images.euronics.hu/product_images/800x600/resize/264951_nsk16c2y.png?v=2', 1),
(3, 'https://images.euronics.hu/product_images/800x600/resize/10111177981982_gzi65qp4.jpg?v=3', 3),
(4, 'https://images.euronics.hu/product_images/800x600/resize/s1_i1rikh5k.jpg?v=1', 4),
(5, 'https://images.euronics.hu/product_images/800x600/resize/s1_8uwglhkx.webp?v=2', 5),
(6, 'https://images.euronics.hu/product_images/800x600/resize/1_mvu48fov.jpg?v=1', 6),
(7, 'https://images.euronics.hu/product_images/800x600/resize/9395084754974_j2ze08xr.jpg?v=2', 7),
(8, 'https://images.euronics.hu/product_images/800x600/resize/6_myc5rq56.png?v=1', 8),
(9, 'https://images.euronics.hu/product_images/800x600/resize/10040130600990_mxiiwrpf.jpg?v=2', 9),
(10, 'https://images.euronics.hu/product_images/800x600/resize/bl-43us14eu_qqqo6k7l.png?v=1', 10),
(11, 'https://images.euronics.hu/product_images/800x600/resize/1_1xhpswby.png?v=1', 11),
(12, 'https://images.euronics.hu/product_images/800x600/resize/10028467945502_252qb35s.jpg?v=3', 12),
(13, 'https://images.euronics.hu/product_images/800x600/resize/s1_8w1xpjwb.jpg?v=2', 13),
(14, 'https://images.euronics.hu/product_images/800x600/resize/k1_fzyaqstq.jpg?v=2', 14),
(15, 'https://images.euronics.hu/product_images/800x600/resize/s1_jri0fma1.jpg?v=1', 15),
(16, 'https://images.euronics.hu/product_images/800x600/resize/9633152729118_sztslhce.jpg?v=2', 16),
(17, 'https://i.imgur.com/yCNTBy1.jpeg', 17),
(18, 'https://i.imgur.com/yCNTBy1.jpeg', 18),
(19, 'https://i.imgur.com/Cna6uZd.png', 20),
(20, 'https://i.imgur.com/Cna6uZd.png', 19),
(21, 'https://i.imgur.com/yCNTBy1.jpeg', 21),
(22, 'https://i.imgur.com/Cna6uZd.png', 22),
(23, 'https://i.imgur.com/yCNTBy1.jpeg', 23),
(24, 'https://i.imgur.com/Cna6uZd.png', 24),
(25, 'https://i.imgur.com/yCNTBy1.jpeg', 25),
(26, 'https://i.imgur.com/yCNTBy1.jpeg', 26),
(27, 'https://i.imgur.com/Cna6uZd.png', 27),
(28, 'https://i.imgur.com/Cna6uZd.png', 28),
(29, 'https://images.euronics.hu/product_images/800x600/resize/9683174555678_muteufru.jpg?v=2', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(400) NOT NULL,
  `Privilages_priv_id` int(11) DEFAULT 20
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `Privilages_priv_id`) VALUES
(5, 'kl190live', 'haha@gmail.com', '$2b$10$z82GLOunn83N8dUHC/QjEukVAyWmq0Ks1fqRmC2FhRPR4CqhYhA66', 20),
(6, 'Levi', 'huhu@gmail.com', '$2b$10$yYl16VOV3CbroIsU5eqGV.Pcfh6igjCEc9vhJa60Yr7o3T1pbATBi', 20),
(7, 'Levente', 'hahaha@gmail.com', '$2b$10$CaTrP07iVUYB4MsQG6FRCeNt4PHdQ7NWcmsENhv9p/.kn5KTOcdmG', 20),
(8, 'domeex', 'domeex@test.hu', '$2b$10$QXfH5W61DmBPAzB01V8XzOq0ZtYDD3dcqDyhZiGdAc/ftMJY44C/6', 20);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('5184c906-6a75-40a0-abc7-42b06ff98c07', '52b8796ad4013d56e3d71cf8b53be67a567aae3c4100d5cb3c0650ed0d2e073b', '2024-03-06 07:16:44.738', '20240306071644_init', NULL, NULL, '2024-03-06 07:16:44.203', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `Address_User_user_id_fkey` (`User_user_id`);

--
-- A tábla indexei `cartitem`
--
ALTER TABLE `cartitem`
  ADD PRIMARY KEY (`cart_item_id`),
  ADD UNIQUE KEY `CartItem_User_user_id_Product_product_id_key` (`User_user_id`,`Product_product_id`),
  ADD KEY `CartItem_Product_product_id_fkey` (`Product_product_id`);

--
-- A tábla indexei `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `Order_Payment_type_pay_id_fkey` (`Payment_type_pay_id`),
  ADD KEY `Order_User_user_id_fkey` (`User_user_id`);

--
-- A tábla indexei `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`Product_product_id`,`Order_order_id`),
  ADD KEY `OrderItem_Order_order_id_fkey` (`Order_order_id`);

--
-- A tábla indexei `order_address`
--
ALTER TABLE `order_address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `Order_address_Order_order_id_fkey` (`Order_order_id`);

--
-- A tábla indexei `payment_type`
--
ALTER TABLE `payment_type`
  ADD PRIMARY KEY (`pay_id`);

--
-- A tábla indexei `privilages`
--
ALTER TABLE `privilages`
  ADD PRIMARY KEY (`priv_id`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- A tábla indexei `productpictures`
--
ALTER TABLE `productpictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductPictures_productId_fkey` (`productId`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD KEY `User_Privilages_priv_id_fkey` (`Privilages_priv_id`);

--
-- A tábla indexei `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `cartitem`
--
ALTER TABLE `cartitem`
  MODIFY `cart_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT a táblához `order`
--
ALTER TABLE `order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `order_address`
--
ALTER TABLE `order_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `payment_type`
--
ALTER TABLE `payment_type`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `productpictures`
--
ALTER TABLE `productpictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `Address_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `cartitem`
--
ALTER TABLE `cartitem`
  ADD CONSTRAINT `CartItem_Product_product_id_fkey` FOREIGN KEY (`Product_product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `CartItem_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_Payment_type_pay_id_fkey` FOREIGN KEY (`Payment_type_pay_id`) REFERENCES `payment_type` (`pay_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Order_User_user_id_fkey` FOREIGN KEY (`User_user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `OrderItem_Order_order_id_fkey` FOREIGN KEY (`Order_order_id`) REFERENCES `order` (`order_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `OrderItem_Product_product_id_fkey` FOREIGN KEY (`Product_product_id`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `order_address`
--
ALTER TABLE `order_address`
  ADD CONSTRAINT `Order_address_Order_order_id_fkey` FOREIGN KEY (`Order_order_id`) REFERENCES `order` (`order_id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `productpictures`
--
ALTER TABLE `productpictures`
  ADD CONSTRAINT `ProductPictures_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`product_id`) ON UPDATE CASCADE;

--
-- Megkötések a táblához `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `User_Privilages_priv_id_fkey` FOREIGN KEY (`Privilages_priv_id`) REFERENCES `privilages` (`priv_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
