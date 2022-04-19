-- CreateTable
CREATE TABLE "offers" (
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

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offers_tx_key" ON "offers"("tx");

-- CreateIndex
CREATE INDEX "index_offers_on_nft_id" ON "offers"("nft_id");

-- CreateIndex
CREATE INDEX "index_offers_on_closed_at" ON "offers"("closed_at");

-- CreateIndex
CREATE INDEX "index_offers_on_status" ON "offers"("status");

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "nfts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
