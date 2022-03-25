/*
  Warnings:

  - You are about to drop the column `bundle_id` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `buy_tx` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `offer_id` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `winner_id` on the `direct_offers` table. All the data in the column will be lost.
  - Added the required column `seller` to the `direct_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_deadline` to the `direct_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller_signature` to the `direct_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `direct_offers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_address` to the `direct_offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_from_fkey";

-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_winner_id_fkey";

-- DropIndex
DROP INDEX "direct_offers_buy_tx_key";

-- DropIndex
DROP INDEX "direct_offers_offer_id_key";

-- DropIndex
DROP INDEX "index_direct_offers_on_winner_id";

-- AlterTable
ALTER TABLE "direct_offers" DROP COLUMN "bundle_id",
DROP COLUMN "buy_tx",
DROP COLUMN "currency",
DROP COLUMN "from",
DROP COLUMN "offer_id",
DROP COLUMN "type",
DROP COLUMN "winner_id",
ADD COLUMN     "buyer" TEXT,
ADD COLUMN     "buyer_signature" TEXT,
ADD COLUMN     "seller" TEXT NOT NULL,
ADD COLUMN     "seller_deadline" INTEGER NOT NULL,
ADD COLUMN     "seller_signature" TEXT NOT NULL,
ADD COLUMN     "tokenId" INTEGER NOT NULL,
ADD COLUMN     "token_address" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "index_direct_offers_on_winner_id" ON "direct_offers"("buyer");

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_seller_fkey" FOREIGN KEY ("seller") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_buyer_fkey" FOREIGN KEY ("buyer") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
