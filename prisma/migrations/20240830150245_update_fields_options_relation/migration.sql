-- CreateTable
CREATE TABLE "options" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "fieldsId" TEXT,
    CONSTRAINT "options_fieldsId_fkey" FOREIGN KEY ("fieldsId") REFERENCES "fields" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
