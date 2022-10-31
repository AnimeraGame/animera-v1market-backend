-- CreateTable
CREATE TABLE "history" (
    "id" BIGSERIAL NOT NULL,
    "tokenId" INTEGER NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);
