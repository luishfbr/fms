/*
  Warnings:

  - You are about to drop the column `access_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otpSecret` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `totpIsEnable` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_UserSectors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fields` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fileTemplates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sectors` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'CREATOR');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('TEXT', 'CPF', 'CNPJ', 'DATE', 'SELECTION', 'PHONE');

-- DropForeignKey
ALTER TABLE "_UserSectors" DROP CONSTRAINT "_UserSectors_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserSectors" DROP CONSTRAINT "_UserSectors_B_fkey";

-- DropForeignKey
ALTER TABLE "fields" DROP CONSTRAINT "fields_fileTemplate_id_fkey";

-- DropForeignKey
ALTER TABLE "fileTemplates" DROP CONSTRAINT "fileTemplates_sector_id_fkey";

-- DropIndex
DROP INDEX "Account_provider_providerAccountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "access_token",
DROP COLUMN "createdAt",
DROP COLUMN "expires_at",
DROP COLUMN "id_token",
DROP COLUMN "refresh_token",
DROP COLUMN "scope",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "otpSecret",
DROP COLUMN "totpIsEnable",
ALTER COLUMN "email" SET NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "_UserSectors";

-- DropTable
DROP TABLE "fields";

-- DropTable
DROP TABLE "fileTemplates";

-- DropTable
DROP TABLE "sectors";

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileTemplate" (
    "id" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,

    CONSTRAINT "FileTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "fieldType" "FieldType" NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "fileTemplateId" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fileTemplateId" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SectorToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sector_name_key" ON "Sector"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SectorToUser_AB_unique" ON "_SectorToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SectorToUser_B_index" ON "_SectorToUser"("B");

-- AddForeignKey
ALTER TABLE "FileTemplate" ADD CONSTRAINT "FileTemplate_sectorId_fkey" FOREIGN KEY ("sectorId") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_fileTemplateId_fkey" FOREIGN KEY ("fileTemplateId") REFERENCES "FileTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_fileTemplateId_fkey" FOREIGN KEY ("fileTemplateId") REFERENCES "FileTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToUser" ADD CONSTRAINT "_SectorToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SectorToUser" ADD CONSTRAINT "_SectorToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
