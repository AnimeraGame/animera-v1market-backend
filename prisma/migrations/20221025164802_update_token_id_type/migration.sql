-- CreateIndex
CREATE INDEX "index_history_on_nft_id" ON "history"("tokenId");

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "nfts"("token_id") ON DELETE RESTRICT ON UPDATE CASCADE;
