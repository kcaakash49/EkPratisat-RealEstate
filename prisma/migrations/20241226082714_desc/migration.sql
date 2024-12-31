/*
  Warnings:

  - You are about to drop the column `descriptions` on the `Listings` table. All the data in the column will be lost.
  - Added the required column `description` to the `Listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listings" DROP COLUMN "descriptions",
ADD COLUMN     "description" TEXT NOT NULL;
