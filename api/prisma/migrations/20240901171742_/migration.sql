/*
  Warnings:

  - Added the required column `color` to the `KPI_CHART` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formattedMeta` to the `KPI_CHART` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KPI_CHART" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "formattedMeta" TEXT NOT NULL;
