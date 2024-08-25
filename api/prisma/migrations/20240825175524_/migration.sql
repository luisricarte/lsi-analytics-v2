/*
  Warnings:

  - You are about to drop the column `csvId` on the `DATAFONTS` table. All the data in the column will be lost.
  - You are about to drop the `CSVFont` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DATAFONTS" DROP CONSTRAINT "DATAFONTS_csvId_fkey";

-- DropIndex
DROP INDEX "DATAFONTS_csvId_key";

-- AlterTable
ALTER TABLE "DATAFONTS" DROP COLUMN "csvId",
ADD COLUMN     "csvData" JSONB,
ADD COLUMN     "csvName" TEXT;

-- DropTable
DROP TABLE "CSVFont";
