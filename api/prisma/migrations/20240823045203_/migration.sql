-- AlterTable
ALTER TABLE "MAP_CHART" ADD COLUMN     "colors" TEXT[] DEFAULT ARRAY['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695']::TEXT[],
ADD COLUMN     "hoverDescription" TEXT NOT NULL DEFAULT 'Campo',
ADD COLUMN     "label" TEXT[] DEFAULT ARRAY['Alto', 'Baixo']::TEXT[],
ADD COLUMN     "maxValue" INTEGER NOT NULL DEFAULT 1;
