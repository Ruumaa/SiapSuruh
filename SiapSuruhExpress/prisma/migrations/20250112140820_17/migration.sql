/*
  Warnings:

  - You are about to alter the column `order_date` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `blocked_until` on the `report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `order_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `report` MODIFY `blocked_until` DATETIME(3) NULL;
