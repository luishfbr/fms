/*
  Warnings:

  - The values [TEXT,CPF,CNPJ,DATE,SELECTION,PHONE] on the enum `FieldType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FieldType_new" AS ENUM ('nome-completo', 'cpf', 'cnpj', 'data-de-admissao', 'data-de-rescisao', 'data', 'dia', 'mes', 'ano');
ALTER TABLE "Field" ALTER COLUMN "fieldType" TYPE "FieldType_new" USING ("fieldType"::text::"FieldType_new");
ALTER TYPE "FieldType" RENAME TO "FieldType_old";
ALTER TYPE "FieldType_new" RENAME TO "FieldType";
DROP TYPE "FieldType_old";
COMMIT;
