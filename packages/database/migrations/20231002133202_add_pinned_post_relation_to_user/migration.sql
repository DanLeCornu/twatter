/*
  Warnings:

  - A unique constraint covering the columns `[pinnedPostId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "pinnedPostId" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "User_pinnedPostId_key" ON "User"("pinnedPostId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pinnedPostId_fkey" FOREIGN KEY ("pinnedPostId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
