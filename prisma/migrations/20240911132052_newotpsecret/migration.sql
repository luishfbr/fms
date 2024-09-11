-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otpSecret" TEXT,
ADD COLUMN     "totpIsEnabled" BOOLEAN NOT NULL DEFAULT false;
