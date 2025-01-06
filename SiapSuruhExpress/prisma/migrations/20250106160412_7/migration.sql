/*
  Warnings:

  - You are about to alter the column `action_taken` on the `report` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(3))`.

*/
-- AlterTable
ALTER TABLE `report` MODIFY `action_taken` ENUM('PENDING', 'NONE', 'SUSPENSION', 'DELETION') NULL DEFAULT 'PENDING';
