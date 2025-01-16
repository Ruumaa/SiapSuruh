/*
  Warnings:

  - Made the column `is_permanently_suspended` on table `provider` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `provider` MODIFY `is_permanently_suspended` BOOLEAN NOT NULL DEFAULT false;
