-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "currentPrice" INTEGER NOT NULL DEFAULT 0,
    "approvedHandle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);
