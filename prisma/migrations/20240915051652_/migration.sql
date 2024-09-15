/*
  Warnings:

  - A unique constraint covering the columns `[commonId]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - Made the column `commonId` on table `File` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "File" ALTER COLUMN "commonId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "File_commonId_key" ON "File"("commonId");
