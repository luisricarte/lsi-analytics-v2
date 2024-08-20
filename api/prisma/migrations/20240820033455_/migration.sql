/*
  Warnings:

  - You are about to drop the column `fileContent` on the `GEO_DATA` table. All the data in the column will be lost.
  - Made the column `userId` on table `GEO_DATA` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "GEO_DATA" DROP CONSTRAINT "GEO_DATA_userId_fkey";

-- AlterTable
ALTER TABLE "GEO_DATA" DROP COLUMN "fileContent",
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "GEO_DATA" ADD CONSTRAINT "GEO_DATA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
