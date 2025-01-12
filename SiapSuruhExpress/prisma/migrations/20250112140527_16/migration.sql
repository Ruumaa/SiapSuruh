-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- DropIndex
DROP INDEX `User_username_key` ON `user`;

-- AlterTable
ALTER TABLE `order` MODIFY `order_date` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `report` MODIFY `blocked_until` VARCHAR(191) NULL;
