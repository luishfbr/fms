-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_work_contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shelf" TEXT NOT NULL,
    "box" TEXT NOT NULL,
    "folder" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "addData" TEXT NOT NULL,
    "logoutDate" TEXT,
    "sector_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    CONSTRAINT "work_contracts_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "work_contracts_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "fileTemplates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_work_contracts" ("addData", "box", "cpf", "folder", "id", "logoutDate", "model_id", "name", "registration", "sector_id", "shelf") SELECT "addData", "box", "cpf", "folder", "id", "logoutDate", "model_id", "name", "registration", "sector_id", "shelf" FROM "work_contracts";
DROP TABLE "work_contracts";
ALTER TABLE "new_work_contracts" RENAME TO "work_contracts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
