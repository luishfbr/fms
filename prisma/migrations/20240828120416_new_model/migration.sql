/*
  Warnings:

  - You are about to drop the column `user_id` on the `sectors` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_UserSectors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UserSectors_A_fkey" FOREIGN KEY ("A") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserSectors_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sectors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);
INSERT INTO "new_sectors" ("id", "name") SELECT "id", "name" FROM "sectors";
DROP TABLE "sectors";
ALTER TABLE "new_sectors" RENAME TO "sectors";
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_UserSectors_AB_unique" ON "_UserSectors"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSectors_B_index" ON "_UserSectors"("B");
