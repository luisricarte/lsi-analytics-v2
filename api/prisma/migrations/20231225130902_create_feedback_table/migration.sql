-- CreateEnum
CREATE TYPE "FeedbackType" AS ENUM ('BUG', 'IDEA', 'SUPPORT');

-- CreateTable
CREATE TABLE "FEEDBACKS" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "FeedbackType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FEEDBACKS_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FEEDBACKS" ADD CONSTRAINT "FEEDBACKS_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USERS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
