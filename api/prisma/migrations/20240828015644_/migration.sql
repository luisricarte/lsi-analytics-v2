/*
  Warnings:

  - You are about to drop the column `csvData` on the `DATAFONTS` table. All the data in the column will be lost.
  - You are about to drop the column `csvName` on the `DATAFONTS` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DATAFONTS" DROP COLUMN "csvData",
DROP COLUMN "csvName",
ADD COLUMN     "tableName" TEXT;
