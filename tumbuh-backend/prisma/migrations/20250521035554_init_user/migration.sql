-- CreateTable
CREATE TABLE "PrimordialUsers" (
    "id" TEXT NOT NULL,
    "twitterId" TEXT NOT NULL,
    "twitterHandle" TEXT,
    "address" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrimordialUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrimordialUsers_twitterId_key" ON "PrimordialUsers"("twitterId");

-- CreateIndex
CREATE UNIQUE INDEX "PrimordialUsers_address_key" ON "PrimordialUsers"("address");
