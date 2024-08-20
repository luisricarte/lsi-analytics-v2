/*
  Warnings:

  - You are about to drop the column `geojson` on the `GEO_DATA` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `GEO_DATA` table. All the data in the column will be lost.
  - Added the required column `fileContent` to the `GEO_DATA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `GEO_DATA` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GEO_DATA" DROP COLUMN "geojson",
DROP COLUMN "name",
ADD COLUMN     "fileContent" JSONB NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MAP_CHART" ADD COLUMN     "mapaId" TEXT,
ADD COLUMN     "uploadedMapId" TEXT;

-- AddForeignKey
ALTER TABLE "MAP_CHART" ADD CONSTRAINT "MAP_CHART_mapaId_fkey" FOREIGN KEY ("mapaId") REFERENCES "GEO_DATA"("id") ON DELETE CASCADE ON UPDATE CASCADE;
