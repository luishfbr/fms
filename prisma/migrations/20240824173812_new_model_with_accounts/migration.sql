/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN "otpSecret" TEXT;
ALTER TABLE "User" ADD COLUMN "password" TEXT;
ALTER TABLE "User" ADD COLUMN "totpIsEnable" BOOLEAN DEFAULT false;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Authenticator";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "sectors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "sectors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "fileTemplates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sector_id" TEXT NOT NULL,
    CONSTRAINT "fileTemplates_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "sectors" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "file_template_id" TEXT NOT NULL,
    CONSTRAINT "files_file_template_id_fkey" FOREIGN KEY ("file_template_id") REFERENCES "fileTemplates" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "sectors_name_key" ON "sectors"("name");
