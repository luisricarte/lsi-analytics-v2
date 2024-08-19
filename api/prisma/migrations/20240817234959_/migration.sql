-- CreateTable
CREATE TABLE "GEO_DATA" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "geojson" JSONB NOT NULL,

    CONSTRAINT "GEO_DATA_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GEO_DATA" ADD CONSTRAINT "GEO_DATA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
