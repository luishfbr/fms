/*
  Warnings:

  - You are about to drop the column `fieldsId` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `file_template_id` on the `files` table. All the data in the column will be lost.
  - Added the required column `field_id` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "field_id" TEXT NOT NULL,
    CONSTRAINT "files_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "fields" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_files" ("id", "name") SELECT "id", "name" FROM "files";
DROP TABLE "files";
ALTER TABLE "new_files" RENAME TO "files";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
