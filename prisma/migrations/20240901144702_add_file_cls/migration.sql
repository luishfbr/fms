/*
  Warnings:

  - You are about to drop the `fileTemplateFields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `content` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `fileTemplateFieldsId` on the `options` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "fileTemplateFields";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "file_template_id" TEXT NOT NULL,
    "fieldsId" TEXT,
    CONSTRAINT "files_fieldsId_fkey" FOREIGN KEY ("fieldsId") REFERENCES "fields" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_files" ("file_template_id", "id", "name") SELECT "file_template_id", "id", "name" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
CREATE TABLE "new_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "fieldsId" TEXT,
    CONSTRAINT "options_fieldsId_fkey" FOREIGN KEY ("fieldsId") REFERENCES "fields" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_options" ("fieldsId", "id", "value") SELECT "fieldsId", "id", "value" FROM "options";
DROP TABLE "options";
ALTER TABLE "new_options" RENAME TO "options";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
