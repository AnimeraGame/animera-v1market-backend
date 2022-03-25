/*
  Warnings:

  - You are about to drop the column `nonce` on the `contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "nonce",
ADD COLUMN     "lastBlockNumber" INTEGER NOT NULL DEFAULT 0;
