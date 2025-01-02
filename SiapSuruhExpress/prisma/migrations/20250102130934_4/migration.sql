-- CreateTable
CREATE TABLE `ProviderCategories` (
    `provider_id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`provider_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` VARCHAR(191) NOT NULL,
    `reported_by_id` VARCHAR(191) NOT NULL,
    `reported_provider_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `action_taken` ENUM('NONE', 'WARNING', 'SUSPENSION', 'DELETION') NULL,
    `admin_id` VARCHAR(191) NOT NULL,
    `action_reason` VARCHAR(191) NULL,
    `blocked_until` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProviderCategories` ADD CONSTRAINT `ProviderCategories_provider_id_fkey` FOREIGN KEY (`provider_id`) REFERENCES `Provider`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProviderCategories` ADD CONSTRAINT `ProviderCategories_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
