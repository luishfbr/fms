/*
  Warnings:

  - You are about to drop the column `addData` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `box` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `cnpj` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `folder` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `logoutDate` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `registration` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `shelf` on the `fileTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `fileTemplates` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shelf" TEXT,
    "box" TEXT,
    "folder" TEXT,
    "name" TEXT,
    "cpf" TEXT,
    "cnpj" TEXT,
    "registration" TEXT,
    "addData" TEXT,
    "logoutDate" TEXT,
    "month" TEXT,
    "year" TEXT,
    "description" TEXT,
    "fileTemplate_id" TEXT NOT NULL,
    CONSTRAINT "fields_fileTemplate_id_fkey" FOREIGN KEY ("fileTemplate_id") REFERENCES "fileTemplates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fileTemplates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT,
    "modelName" TEXT,
    "sector_id" TEXT NOT NULL,
    CONSTRAINT "fileTemplates_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_fileTemplates" ("id", "modelName", "sector_id", "url") SELECT "id", "modelName", "sector_id", "url" FROM "fileTemplates";
DROP TABLE "fileTemplates";
ALTER TABLE "new_fileTemplates" RENAME TO "fileTemplates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
