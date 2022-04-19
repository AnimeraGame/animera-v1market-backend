/*
  Warnings:

  - You are about to drop the `direct_offers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "direct_offers" DROP CONSTRAINT "direct_offers_nft_id_fkey";

-- DropTable
DROP TABLE "direct_offers";

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "nft_id" TEXT,
    "token_id" INTEGER NOT NULL,
    "token_address" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "seller" TEXT NOT NULL,
    "buyer" TEXT,
    "seller_signature" TEXT NOT NULL,
    "buyer_signature" TEXT,
    "tx" VARCHAR(100),
    "status" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "closed_at" TIMESTAMP(6),
    "expire_at" TIMESTAMP(6),

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sales_tx_key" ON "sales"("tx");

-- CreateIndex
CREATE INDEX "index_sales_on_nft_id" ON "sales"("nft_id");

-- CreateIndex
CREATE INDEX "index_sales_on_closed_at" ON "sales"("closed_at");

-- CreateIndex
CREATE INDEX "index_sales_on_status" ON "sales"("status");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "nfts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
