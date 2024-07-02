-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "orgId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pets_orgId_idx" ON "pets"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "pets_orgId_name_key" ON "pets"("orgId", "name");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
