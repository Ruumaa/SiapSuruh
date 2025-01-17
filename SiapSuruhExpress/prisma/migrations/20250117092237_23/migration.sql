-- DropForeignKey
ALTER TABLE `provider` DROP FOREIGN KEY `Provider_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `Provider` ADD CONSTRAINT `Provider_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
