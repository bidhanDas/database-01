/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `demo1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `col1` VARCHAR(191) NOT NULL,
    `col2` VARCHAR(191) NULL,
    `col3` VARCHAR(191) NOT NULL,
    `col4` VARCHAR(191) NOT NULL DEFAULT 'hello',
    `col5` INTEGER UNSIGNED NOT NULL,
    `col6` INTEGER NOT NULL,
    `col7` BIGINT NOT NULL,
    `col8` BIGINT UNSIGNED NOT NULL,
    `col9` SMALLINT NOT NULL,
    `col10` SMALLINT UNSIGNED NOT NULL,
    `col11` MEDIUMINT NOT NULL,
    `col12` MEDIUMINT UNSIGNED NOT NULL,
    `col13` TINYINT NOT NULL,
    `col14` TINYINT UNSIGNED NOT NULL,
    `col15` DECIMAL(65, 30) NOT NULL,
    `col16` DOUBLE NOT NULL,
    `col17` VARCHAR(1000) NOT NULL,
    `col18` TINYTEXT NOT NULL,
    `col19` TEXT NOT NULL,
    `col20` LONGTEXT NOT NULL,
    `col21` CHAR(30) NOT NULL,
    `col22` MEDIUMTEXT NOT NULL,

    UNIQUE INDEX `demo1_col3_key`(`col3`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demo2` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `col1` DATETIME(3) NOT NULL,
    `col2` DATE NOT NULL,
    `col3` TIME NOT NULL,
    `col4` TIMESTAMP NOT NULL,
    `col5` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `demo3` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `col1` BLOB NOT NULL,
    `col2` LONGBLOB NOT NULL,
    `col3` MEDIUMBLOB NOT NULL,
    `col4` TINYBLOB NOT NULL,
    `col5` BINARY(100) NOT NULL,
    `col6` VARBINARY(100) NOT NULL,
    `col7` ENUM('Admin', 'Staff') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
