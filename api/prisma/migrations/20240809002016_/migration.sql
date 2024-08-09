/*
  Warnings:

  - Made the column `associatedMap` on table `MAP_CHART` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MAP_CHART" ALTER COLUMN "associatedMap" SET NOT NULL;
