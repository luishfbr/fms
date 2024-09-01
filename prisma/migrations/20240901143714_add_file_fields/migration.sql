-- CreateTable
CREATE TABLE "fileTemplateFields" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "file_template_id" TEXT NOT NULL,
    CONSTRAINT "fileTemplateFields_file_template_id_fkey" FOREIGN KEY ("file_template_id") REFERENCES "fileTemplates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "fieldsId" TEXT,
    "fileTemplateFieldsId" TEXT,
    CONSTRAINT "options_fieldsId_fkey" FOREIGN KEY ("fieldsId") REFERENCES "fields" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "options_fileTemplateFieldsId_fkey" FOREIGN KEY ("fileTemplateFieldsId") REFERENCES "fileTemplateFields" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_options" ("fieldsId", "id", "value") SELECT "fieldsId", "id", "value" FROM "options";
DROP TABLE "options";
ALTER TABLE "new_options" RENAME TO "options";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
