/*
  Warnings:

  - The values [CASCATECHART] on the enum `ViewType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ViewType_new" AS ENUM ('PIECHART', 'BARCHART', 'LINECHART', 'DONUTCHART', 'HORIZONTALBARCHART', 'WATERFALLCHART', 'KPICHART', 'NUMBERVIEW', 'SELECTFILTER');
ALTER TABLE "VIEWS" ALTER COLUMN "type" TYPE "ViewType_new" USING ("type"::text::"ViewType_new");
ALTER TYPE "ViewType" RENAME TO "ViewType_old";
ALTER TYPE "ViewType_new" RENAME TO "ViewType";
DROP TYPE "ViewType_old";
COMMIT;
