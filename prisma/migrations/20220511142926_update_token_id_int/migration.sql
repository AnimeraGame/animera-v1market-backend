/*
  Warnings:

  - A unique constraint covering the columns `[token_id]` on the table `nft_metadata` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token_id]` on the table `nfts` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `token_id` on the `nft_metadata` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `token_id` on the `nfts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "nft_metadata" DROP COLUMN "token_id",
ADD COLUMN     "token_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "nfts" DROP COLUMN "token_id",
ADD COLUMN     "token_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "nft_metadata_token_id_key" ON "nft_metadata"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "nfts_token_id_key" ON "nfts"("token_id");
