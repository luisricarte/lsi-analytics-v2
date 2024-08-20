/*
  Warnings:

  - You are about to drop the column `mapaId` on the `MAP_CHART` table. All the data in the column will be lost.
  - You are about to drop the column `uploadedMapId` on the `MAP_CHART` table. All the data in the column will be lost.
  - You are about to drop the `GEO_DATA` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GEO_DATA" DROP CONSTRAINT "GEO_DATA_userId_fkey";

-- DropForeignKey
ALTER TABLE "MAP_CHART" DROP CONSTRAINT "MAP_CHART_mapaId_fkey";

-- AlterTable
ALTER TABLE "MAP_CHART" DROP COLUMN "mapaId",
DROP COLUMN "uploadedMapId",
ADD COLUMN     "fileContent" TEXT,
ADD COLUMN     "fileName" TEXT;

-- DropTable
DROP TABLE "GEO_DATA";
