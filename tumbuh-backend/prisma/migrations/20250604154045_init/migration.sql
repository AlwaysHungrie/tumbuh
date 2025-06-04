/*
  Warnings:

  - You are about to drop the `PrimordialUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PrimordialUsers";

-- DropTable
DROP TABLE "Sale";

-- CreateTable
CREATE TABLE "TumbuhMetadata" (
    "id" TEXT NOT NULL,
    "currentPrice" INTEGER NOT NULL DEFAULT 0,
    "isAcceptingWater" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TumbuhMetadata_pkey" PRIMARY KEY ("id")
);
