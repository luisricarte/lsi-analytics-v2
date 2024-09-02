/*
  Warnings:

  - Added the required column `lastResult` to the `KPI_CHART` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KPI_CHART" ADD COLUMN     "lastResult" DOUBLE PRECISION NOT NULL;
