/*
  Warnings:

  - The `associatedMap` column on the `MAP_CHART` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MAP_CHART" DROP COLUMN "associatedMap",
ADD COLUMN     "associatedMap" TEXT;

-- DropEnum
DROP TYPE "AssociatedMap";
