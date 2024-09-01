/*
  Warnings:

  - You are about to drop the column `formattedMeta` on the `KPI_CHART` table. All the data in the column will be lost.
  - Added the required column `formattedGoal` to the `KPI_CHART` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KPI_CHART" DROP COLUMN "formattedMeta",
ADD COLUMN     "formattedGoal" TEXT NOT NULL;
