/*
  Warnings:

  - You are about to drop the column `buyer_id` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `seller_id` on the `direct_offers` table. All the data in the column will be lost.
  - Added the required column `seller` to the `direct_offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_buyer_id_fkey";

-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_seller_id_fkey";

-- DropIndex
DROP INDEX "index_direct_offers_on_winner_id";

-- AlterTable
ALTER TABLE "direct_offers" DROP COLUMN "buyer_id",
DROP COLUMN "seller_id",
ADD COLUMN     "buyer" TEXT,
ADD COLUMN     "seller" TEXT NOT NULL;
