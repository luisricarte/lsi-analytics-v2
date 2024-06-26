-- CreateTable
CREATE TABLE "BAR_CHART" (
    "id" TEXT NOT NULL,
    "labelColumn" TEXT NOT NULL,
    "valueColumn" TEXT NOT NULL,
    "viewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BAR_CHART_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BAR_CHART_viewId_key" ON "BAR_CHART"("viewId");

-- AddForeignKey
ALTER TABLE "BAR_CHART" ADD CONSTRAINT "BAR_CHART_viewId_fkey" FOREIGN KEY ("viewId") REFERENCES "VIEWS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
