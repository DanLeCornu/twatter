-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tagsId" UUID;

-- CreateTable
CREATE TABLE "Tags" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_tagsId_fkey" FOREIGN KEY ("tagsId") REFERENCES "Tags"("id") ON DELETE SET NULL ON UPDATE CASCADE;
