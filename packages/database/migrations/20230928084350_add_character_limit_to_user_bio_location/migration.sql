/*
  Warnings:

  - You are about to alter the column `bio` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(160)`.
  - You are about to alter the column `location` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" SET DATA TYPE VARCHAR(160),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(30);
