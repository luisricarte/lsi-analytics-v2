-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ViewType" ADD VALUE 'DONUTCHART';
ALTER TYPE "ViewType" ADD VALUE 'HORIZONTALBARCHART';
ALTER TYPE "ViewType" ADD VALUE 'CASCATECHART';
ALTER TYPE "ViewType" ADD VALUE 'KPICHART';

-- CreateTable
CREATE TABLE "DONUT_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumns" TEXT[],
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DONUT_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HORIZONTAL_BAR_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumns" TEXT[],
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HORIZONTAL_BAR_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CASCATE_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumns" TEXT[],
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CASCATE_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KPI_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumns" TEXT[],
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KPI_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DONUT_CHART_viewId_key" ON "DONUT_CHART"("viewId");

-- CreateIndex
CREATE UNIQUE INDEX "HORIZONTAL_BAR_CHART_viewId_key" ON "HORIZONTAL_BAR_CHART"("viewId");

-- CreateIndex
CREATE UNIQUE INDEX "CASCATE_CHART_viewId_key" ON "CASCATE_CHART"("viewId");

-- CreateIndex
CREATE UNIQUE INDEX "KPI_CHART_viewId_key" ON "KPI_CHART"("viewId");

-- AddForeignKey
ALTER TABLE "DONUT_CHART" ADD CONSTRAINT "DONUT_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HORIZONTAL_BAR_CHART" ADD CONSTRAINT "HORIZONTAL_BAR_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CASCATE_CHART" ADD CONSTRAINT "CASCATE_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KPI_CHART" ADD CONSTRAINT "KPI_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
