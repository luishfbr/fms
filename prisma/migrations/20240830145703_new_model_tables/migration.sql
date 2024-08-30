/*
  Warnings:

  - You are about to drop the column `description` on the `fileTemplates` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fileTemplateId" TEXT,
    CONSTRAINT "fields_fileTemplateId_fkey" FOREIGN KEY ("fileTemplateId") REFERENCES "fileTemplates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fileTemplates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,
    CONSTRAINT "fileTemplates_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_fileTemplates" ("id", "name", "sector_id") SELECT "id", "name", "sector_id" FROM "fileTemplates";
DROP TABLE "fileTemplates";
ALTER TABLE "new_fileTemplates" RENAME TO "fileTemplates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
