/*
  Warnings:

  - You are about to drop the column `valueColumn` on the `AREA_CHART` table. All the data in the column will be lost.
  - You are about to drop the column `valueColumns` on the `MAP_CHART` table. All the data in the column will be lost.
  - Added the required column `valueColumn` to the `MAP_CHART` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AREA_CHART" DROP COLUMN "valueColumn",
ADD COLUMN     "valueColumns" TEXT[];

-- AlterTable
ALTER TABLE "MAP_CHART" DROP COLUMN "valueColumns",
ADD COLUMN     "valueColumn" TEXT NOT NULL;
