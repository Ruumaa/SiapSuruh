/*
  Warnings:

  - You are about to drop the column `is_permanently_suspended` on the `provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `provider` DROP COLUMN `is_permanently_suspended`;
