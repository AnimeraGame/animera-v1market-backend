import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Web3 from 'web3';
import { PrismaService } from './prisma.service';
import { Prisma, transactions } from '@prisma/client';
import { Transaction, TransactionReceipt } from 'web3-core';
import { BlockTransactionString } from 'web3-eth';
import EthCrypto from 'eth-crypto';
import abiDecoder from 'abi-decoder';
import moment from 'moment';

interface CreateTransactionProps {
  contractId: bigint;
  transactionReceipt: TransactionReceipt;
  transaction: Transaction;
  blockData: BlockTransactionString;
  abi: Prisma.JsonValue;
}

interface UpdateNFTByEventProps {
  from: string;
  to: string;
  tokenId: string;
}

@Injectable()
export class Web3Service implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  createTransaction({
    contractId,
    transaction,
    transactionReceipt,
    blockData,
    abi
  }: CreateTransactionProps): Promise<transactions> {
    const dataToSave = {
      contractId: contractId,
      transactionHash: transaction.hash,
      transactionIndex: transaction.transactionIndex,
      gasPrice: BigInt(transaction.gasPrice),
      from: transaction.from,
      to: transaction.to,
      gas: transaction.gas,
      status: transactionReceipt.status,
      input: transaction.input,
      blockHash: transaction.blockHash,
      blockNumber: transaction.blockNumber,
      value: BigInt(transaction.value),
      datetime: new Date(Number(blockData.timestamp) * 1000),
      decodedInput: null,
      txNameFromInput: null
    };
    if (transaction?.input) {
      abiDecoder.addABI(abi);

      dataToSave.decodedInput = abiDecoder.decodeMethod(transaction.input);
      dataToSave.txNameFromInput = dataToSave?.decodedInput?.name || null;
    }
    try {
      const transaction = this.prisma.transactions.create({
        data: dataToSave as any
      });
      return transaction;
    } catch (e) {
      Logger.log(
        'there is error from double creating transactions - can be ignored'
      );
    }
  }

  async updateNFTByEvent(events: Array<UpdateNFTByEventProps>) {
    events.map(async event => {
      if (event !== null && event !== undefined) {
        const tokenId = Number(event.tokenId).toString();
        const dataToSave = {
          owner_wallet_address: '0x' + event.to.substring(26),
          token_id: tokenId,
          nft_metadata_id: null,
          created_at: new Date(),
          updated_at: new Date()
        };
        try {
          const metadata = await this.prisma.nft_metadata.findFirst({
            where: {
              token_id: tokenId
            }
          });
          if (metadata) {
            dataToSave.nft_metadata_id = metadata.id;
          }
        } catch (error: any) {
          Logger.log(`error on fetch nft_metadata- ${JSON.stringify(error)}`);
        }
        await this.prisma.nfts.upsert({
          where: {
            token_id: tokenId
          },
          create: dataToSave,
          update: dataToSave
        });
      }
    });
  }

  // async genereateECDSASignature(reward: number, walletAddress: string, userId: number) {
  //   const contract = await this.prisma.contracts.findFirst({
  //     where: {
  //       name: 'prizeDev'
  //     }
  //   });
  //   const rewardsBN = (reward * Math.pow(10, 8)).toString();
  //   const expirationTime = Math.floor(moment().valueOf() / 1000) + 86400;
  //   const message = EthCrypto.hash.keccak256([
  //     { type: "uint256", value: rewardsBN },
  //     { type: "uint256", value: contract.nonce },
  //     { type: "uint256", value: expirationTime },
  //     { type: "address", value: walletAddress },
  //   ]);

  //   const signature = EthCrypto.sign(process.env.WALLET_PRIVATE_KEY, message);
  //   const response = {
  //       message: message,
  //       signature: signature,
  //       public_key: process.env.WALLET_ADDRESS,
  //       nonce: contract.nonce,
  //       expirationTime: expirationTime,
  //       reward: rewardsBN
  //   }
  //   await this.prisma.users.update({
  //     where: {
  //       id: userId
  //     },
  //     data: {
  //       lastSignAt: new Date()
  //     }
  //   });
  //   await this.prisma.contracts.update({
  //     where: {
  //       id: contract.id
  //     },
  //     data: {
  //       nonce: contract.nonce + 1
  //     }
  //   });
  //   return response;
  // }

  async onModuleInit() {
    const contracts = await this.prisma.contracts.findMany({
      include: {
        blockchain: true
      }
    });

    for (const {
      address,
      abi,
      name,
      initialBlockNumber,
      lastBlockNumber,
      id: contractId,
      blockchain: { wsProvider, rpcProvider },
      listenEvents
    } of contracts) {
      try {
        if (listenEvents) {
          const options = {
            // Enable auto reconnection
            reconnect: {
              auto: true,
              delay: 15000, // ms
              maxAttempts: 5,
              onTimeout: false
            },
            clientConfig: {
              maxReceivedFrameSize: 2000000, // bytes - default: 1MiB, current: 2MiB
              maxReceivedMessageSize: 10000000 // bytes - default: 8MiB, current: 10Mib
            }
          };
          console.log('polygon ws provider', rpcProvider);
          const web3 = new Web3(new Web3.providers.HttpProvider(rpcProvider));
          const contract = new web3.eth.Contract(abi as any, address);

          // All events handler
          contract.events
            .allEvents()
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            .on('data', async event => {
              Logger.log(event);

              const transactionPromise = web3.eth.getTransaction(
                event.transactionHash
              );

              const transactionReceiptPromise = web3.eth.getTransactionReceipt(
                event.transactionHash
              );

              const blockDataPromise = web3.eth.getBlock(event.blockNumber);

              const [transaction, transactionReceipt, blockData] =
                await Promise.all([
                  transactionPromise,
                  transactionReceiptPromise,
                  blockDataPromise
                ]);

              const logs = transactionReceipt.logs;
              if (name === 'NFT') {
                let transferEvents = logs.map(log => {
                  if (
                    log.topics[0] ===
                    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
                  ) {
                    return {
                      from: log.topics[1],
                      to: log.topics[2],
                      tokenId: log.topics[3]
                    };
                  }
                });

                transferEvents = transferEvents.filter(e => e !== undefined);
                await this.updateNFTByEvent(transferEvents);
              }
              await this.createTransaction({
                contractId,
                transaction,
                transactionReceipt,
                blockData,
                abi
              });
            });

          const currentBlockNumber = await web3.eth.getBlockNumber();
          console.log('current block number', currentBlockNumber);

          let blockNumber =
            lastBlockNumber > initialBlockNumber
              ? lastBlockNumber
              : initialBlockNumber;
          while (blockNumber < currentBlockNumber) {
            // Prev transactions sync
            const txHashListFromAPI = await contract
              .getPastEvents('allEvents', {
                fromBlock: blockNumber,
                toBlock:
                  currentBlockNumber < blockNumber + 1000
                    ? currentBlockNumber
                    : blockNumber + 1000
              })
              .then(events =>
                events.map(event => {
                  if (name === 'Market') {
                    console.log('market event', event);
                  }
                  return event.transactionHash;
                })
              );

            const txHashListFromDb = await this.prisma.transactions
              .findMany({
                where: { contractId: contractId },
                select: { transactionHash: true }
              })
              .then(events =>
                events.map(({ transactionHash }) => transactionHash)
              );

            const txHashListFromDB = new Set(txHashListFromDb);
            const missedTransactions = [...new Set(txHashListFromAPI)].filter(
              tx => {
                return !txHashListFromDB.has(tx);
              }
            );

            if (missedTransactions.length)
              Logger.log(
                `${address} contract - noticed ${missedTransactions.length} missed transactions`
              );

            for (const txHash of missedTransactions) {
              const transaction = await web3.eth.getTransaction(txHash);
              const transactionReceipt = await web3.eth.getTransactionReceipt(
                txHash
              );
              console.log('transaction receipt', transactionReceipt);
              const logs = transactionReceipt.logs;
              if (name === 'NFT') {
                const transferEvents = logs.map(log => {
                  if (
                    log.topics[0] ===
                      '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' &&
                    log.address === address
                  ) {
                    return {
                      from: log.topics[1],
                      to: log.topics[2],
                      tokenId: log.topics[3]
                    };
                  }
                });

                if (transferEvents.length > 0) {
                  await this.updateNFTByEvent(transferEvents);
                }
              }

              if (name === 'Market') {
                const sellEvents = logs.map(log => {
                  if (
                    log.topics[0] ===
                    '0xc016fc6eec116472bfe0549668f2c0a088bd1924bdac4b36f426b5b8085e132f'
                  ) {
                    console.log('sell event', log);
                  }
                });
              }

              const blockData = await web3.eth.getBlock(
                transaction.blockNumber
              );
              try {
                await this.createTransaction({
                  contractId,
                  transactionReceipt,
                  transaction,
                  blockData,
                  abi
                });
              } catch (err) {
                Logger.log(`duplicated transactions - ${err}`);
              }
            }

            await this.prisma.contracts.update({
              where: {
                id: contractId
              },
              data: {
                lastBlockNumber: blockNumber + 1000
              }
            });

            blockNumber += 1000;
          }
          Logger.log(`${address} contract synchronized`);
        }
      } catch (err) {
        Logger.log(err);
      }
    }
  }
}
