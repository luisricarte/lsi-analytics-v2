/*
  Warnings:

  - A unique constraint covering the columns `[csvId]` on the table `DATAFONTS` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "DATAFONTS" ADD COLUMN     "csvId" TEXT;

-- CreateTable
CREATE TABLE "CSVFont" (
    "id" TEXT NOT NULL,
    "archiveName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "CSVFont_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DATAFONTS_csvId_key" ON "DATAFONTS"("csvId");

-- AddForeignKey
ALTER TABLE "DATAFONTS" ADD CONSTRAINT "DATAFONTS_csvId_fkey" FOREIGN KEY ("csvId") REFERENCES "CSVFont"("id") ON DELETE SET NULL ON UPDATE CASCADE;
