/*
  Warnings:

  - You are about to drop the `CASCATE_CHART` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CASCATE_CHART" DROP CONSTRAINT "CASCATE_CHART_viewId_fkey";

-- DropTable
DROP TABLE "CASCATE_CHART";

-- CreateTable
CREATE TABLE "WATERFALL_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumns" TEXT[],
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WATERFALL_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WATERFALL_CHART_viewId_key" ON "WATERFALL_CHART"("viewId");

-- AddForeignKey
ALTER TABLE "WATERFALL_CHART" ADD CONSTRAINT "WATERFALL_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
