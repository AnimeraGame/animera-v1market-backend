-- CreateTable
CREATE TABLE "blockchains" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100),
    "status" INTEGER,
    "rpcProvider" TEXT,
    "wsProvider" TEXT,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "blockchains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "address" VARCHAR(255) NOT NULL DEFAULT E'',
    "blockchainId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "abi" JSONB NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "listenEvents" BOOLEAN NOT NULL DEFAULT false,
    "initialBlockNumber" INTEGER NOT NULL DEFAULT 0,
    "nonce" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL,
    "source" TEXT,
    "campaignId" TEXT,
    "sub" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "transactionHash" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "walletAddress" VARCHAR(50),
    "nonce" VARCHAR(50),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "lastSignAt" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "transactionIndex" BIGINT NOT NULL,
    "blockHash" TEXT NOT NULL,
    "blockNumber" BIGINT NOT NULL,
    "datetime" TIMESTAMP(6) NOT NULL,
    "input" TEXT,
    "decodedInput" JSONB,
    "txNameFromInput" TEXT,
    "from" TEXT,
    "to" TEXT,
    "status" BOOLEAN DEFAULT false,
    "value" BIGINT NOT NULL DEFAULT 0,
    "gas" BIGINT NOT NULL,
    "cumulativeGasUsed" BIGINT NOT NULL DEFAULT 0,
    "gasPrice" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nfts" (
    "id" TEXT NOT NULL,
    "nft_metadata_id" TEXT,
    "sale_info" JSONB,
    "status" INTEGER,
    "show" BOOLEAN,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "owner_wallet_address" VARCHAR(50),
    "token_id" TEXT NOT NULL,
    "is_on_marketplace" BOOLEAN NOT NULL DEFAULT false,
    "last_sale" TIMESTAMP(6),

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nft_metadata" (
    "id" TEXT NOT NULL,
    "metadata" JSONB,
    "token_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "nft_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direct_offers" (
    "id" TEXT NOT NULL,
    "type" SMALLINT NOT NULL DEFAULT 0,
    "bundle_id" TEXT,
    "nft_id" TEXT,
    "offer_id" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "currency" VARCHAR(10) NOT NULL DEFAULT E'CBC',
    "from" TEXT NOT NULL,
    "winner_id" TEXT,
    "tx" VARCHAR(100) NOT NULL,
    "buy_tx" VARCHAR(100),
    "status" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "closed_at" TIMESTAMP(6),

    CONSTRAINT "direct_offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_transactionHash_key" ON "transactions"("transactionHash");

-- CreateIndex
CREATE UNIQUE INDEX "nfts_token_id_key" ON "nfts"("token_id");

-- CreateIndex
CREATE INDEX "index_nfts_on_nft_metadata_id" ON "nfts"("nft_metadata_id");

-- CreateIndex
CREATE UNIQUE INDEX "nft_metadata_token_id_key" ON "nft_metadata"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "direct_offers_offer_id_key" ON "direct_offers"("offer_id");

-- CreateIndex
CREATE UNIQUE INDEX "direct_offers_tx_key" ON "direct_offers"("tx");

-- CreateIndex
CREATE UNIQUE INDEX "direct_offers_buy_tx_key" ON "direct_offers"("buy_tx");

-- CreateIndex
CREATE INDEX "index_direct_offers_on_nft_id" ON "direct_offers"("nft_id");

-- CreateIndex
CREATE INDEX "index_direct_offers_on_closed_at" ON "direct_offers"("closed_at");

-- CreateIndex
CREATE INDEX "index_direct_offers_on_status" ON "direct_offers"("status");

-- CreateIndex
CREATE INDEX "index_direct_offers_on_winner_id" ON "direct_offers"("winner_id");

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_blockchainId_fkey" FOREIGN KEY ("blockchainId") REFERENCES "blockchains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nfts" ADD CONSTRAINT "nfts_nft_metadata_id_fkey" FOREIGN KEY ("nft_metadata_id") REFERENCES "nft_metadata"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_nft_id_fkey" FOREIGN KEY ("nft_id") REFERENCES "nfts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_from_fkey" FOREIGN KEY ("from") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_offers" ADD CONSTRAINT "direct_offers_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
