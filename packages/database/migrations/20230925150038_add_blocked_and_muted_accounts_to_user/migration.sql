-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "handle" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "_MutedAccounts" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_BlockedAccounts" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MutedAccounts_AB_unique" ON "_MutedAccounts"("A", "B");

-- CreateIndex
CREATE INDEX "_MutedAccounts_B_index" ON "_MutedAccounts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlockedAccounts_AB_unique" ON "_BlockedAccounts"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockedAccounts_B_index" ON "_BlockedAccounts"("B");

-- AddForeignKey
ALTER TABLE "_MutedAccounts" ADD CONSTRAINT "_MutedAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MutedAccounts" ADD CONSTRAINT "_MutedAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedAccounts" ADD CONSTRAINT "_BlockedAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedAccounts" ADD CONSTRAINT "_BlockedAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
