-- CreateTable
CREATE TABLE "work_contracts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shelf" INTEGER NOT NULL,
    "box" INTEGER NOT NULL,
    "folder" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "point_archive_props" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "shelf" INTEGER NOT NULL,
    "box" INTEGER NOT NULL,
    "folder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "sector_id" TEXT NOT NULL,
    "model_id" TEXT NOT NULL,
    CONSTRAINT "point_archive_props_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "point_archive_props_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "fileTemplates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
