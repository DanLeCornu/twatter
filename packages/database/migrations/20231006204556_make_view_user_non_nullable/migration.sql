/*
  Warnings:

  - Made the column `userId` on table `View` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_userId_fkey";

-- AlterTable
ALTER TABLE "View" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
