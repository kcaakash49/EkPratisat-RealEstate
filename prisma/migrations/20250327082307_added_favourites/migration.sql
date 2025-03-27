-- AlterTable
ALTER TABLE "Listings" ADD COLUMN     "amenities" TEXT[],
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Favourites" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "listingId" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favourites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_id_key" ON "Favourites"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_userId_listingId_key" ON "Favourites"("userId", "listingId");

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favourites" ADD CONSTRAINT "Favourites_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
