/*
  Warnings:

  - The `fileContent` column on the `MAP_CHART` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MAP_CHART" DROP COLUMN "fileContent",
ADD COLUMN     "fileContent" JSONB;
