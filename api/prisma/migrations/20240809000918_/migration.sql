-- CreateEnum
CREATE TYPE "AssociatedMap" AS ENUM ('BRASIL', 'ESTADOS_UNIDOS', 'PARAIBA', 'MUNDO');

-- AlterTable
ALTER TABLE "MAP_CHART" ADD COLUMN     "associatedMap" "AssociatedMap" DEFAULT 'BRASIL';
