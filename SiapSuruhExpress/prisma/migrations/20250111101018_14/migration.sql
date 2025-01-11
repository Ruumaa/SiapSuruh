/*
  Warnings:

  - A unique constraint covering the columns `[provider_id]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Service_provider_id_key` ON `Service`(`provider_id`);
