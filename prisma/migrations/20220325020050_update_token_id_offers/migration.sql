/*
  Warnings:

  - You are about to drop the column `tokenId` on the `direct_offers` table. All the data in the column will be lost.
  - Added the required column `token_id` to the `direct_offers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "direct_offers" DROP COLUMN "tokenId",
ADD COLUMN     "token_id" INTEGER NOT NULL;
