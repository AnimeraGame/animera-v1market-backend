/*
  Warnings:

  - The primary key for the `blockchains` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `blockchains` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `contracts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `contracts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `estates` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `estates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nft_id` column on the `estates` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `nft_metadata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `nft_metadata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `nfts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `nfts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `nft_metadata_id` column on the `nfts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `blockchainId` on the `contracts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `contractId` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_blockchainId_fkey";

-- DropForeignKey
ALTER TABLE "estates" DROP CONSTRAINT "estates_nft_id_fkey";

-- DropForeignKey
ALTER TABLE "nfts" DROP CONSTRAINT "nfts_nft_metadata_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_userId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_contractId_fkey";

-- AlterTable
ALTER TABLE "blockchains" DROP CONSTRAINT "blockchains_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "blockchains_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "blockchainId",
ADD COLUMN     "blockchainId" BIGINT NOT NULL,
ADD CONSTRAINT "contracts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "estates" DROP CONSTRAINT "estates_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "nft_id",
ADD COLUMN     "nft_id" BIGINT,
ADD CONSTRAINT "estates_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "nft_metadata" DROP CONSTRAINT "nft_metadata_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "nft_metadata_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "nfts" DROP CONSTRAINT "nfts_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "nft_metadata_id",
ADD COLUMN     "nft_metadata_id" BIGINT,
ADD CONSTRAINT "nfts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" BIGINT NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "contractId",
ADD COLUMN     "contractId" BIGINT NOT NULL,
ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "index_sales_on_nft_id" ON "estates"("nft_id");

-- CreateIndex
CREATE INDEX "index_nfts_on_nft_metadata_id" ON "nfts"("nft_metadata_id");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_blockchainId_fkey" FOREIGN KEY ("blockchainId") REFERENCES "blockchains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts" ADD CONSTRAINT "nfts_nft_metadata_id_fkey" FOREIGN KEY ("nft_metadata_id") REFERENCES "nft_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estates" ADD CONSTRAINT "estates_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "nfts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
