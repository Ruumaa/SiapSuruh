/*
  Warnings:

  - Made the column `phone_number` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phone_number` INTEGER NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;
