/*
  Warnings:

  - You are about to drop the `point_archive_props` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `work_contracts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "point_archive_props";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "work_contracts";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fileTemplates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT,
    "modelName" TEXT,
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
    "sector_id" TEXT NOT NULL,
    CONSTRAINT "fileTemplates_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_fileTemplates" ("id", "name", "sector_id", "url") SELECT "id", "name", "sector_id", "url" FROM "fileTemplates";
DROP TABLE "fileTemplates";
ALTER TABLE "new_fileTemplates" RENAME TO "fileTemplates";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
