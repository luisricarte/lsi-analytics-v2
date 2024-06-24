/*
  Warnings:

  - You are about to drop the column `valueColumns` on the `DONUT_CHART` table. All the data in the column will be lost.
  - Added the required column `valueColumn` to the `DONUT_CHART` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DONUT_CHART" DROP COLUMN "valueColumns",
ADD COLUMN     "valueColumn" TEXT NOT NULL;
