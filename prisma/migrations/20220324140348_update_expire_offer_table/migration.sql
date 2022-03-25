/*
  Warnings:

  - You are about to drop the column `buyer` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `seller` on the `direct_offers` table. All the data in the column will be lost.
  - You are about to drop the column `seller_deadline` on the `direct_offers` table. All the data in the column will be lost.
  - Added the required column `seller_id` to the `direct_offers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_buyer_fkey";

-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_seller_fkey";

-- DropIndex
DROP INDEX "index_direct_offers_on_winner_id";

-- AlterTable
ALTER TABLE "direct_offers" DROP COLUMN "buyer",
DROP COLUMN "seller",
DROP COLUMN "seller_deadline",
ADD COLUMN     "buyer_id" TEXT,
ADD COLUMN     "expire_at" TIMESTAMP(6),
ADD COLUMN     "seller_id" TEXT NOT NULL,
ALTER COLUMN "tx" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "index_direct_offers_on_winner_id" ON "direct_offers"("buyer_id");

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
