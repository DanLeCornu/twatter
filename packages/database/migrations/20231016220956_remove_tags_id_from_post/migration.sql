/*
  Warnings:

  - You are about to drop the column `tagsId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_tagsId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tagsId";

-- CreateTable
CREATE TABLE "_PostToTags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PostToTags_AB_unique" ON "_PostToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToTags_B_index" ON "_PostToTags"("B");

-- AddForeignKey
ALTER TABLE "_PostToTags" ADD CONSTRAINT "_PostToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTags" ADD CONSTRAINT "_PostToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
