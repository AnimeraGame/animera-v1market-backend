import { PrismaClient, Prisma } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const blockchainData: Prisma.blockchainsCreateInput[] = [
  {
    name: 'MumbaiTestnet',
    status: 1,
    rpcProvider: 'https://rpc-mumbai.maticvigil.com',
    wsProvider: 'wss://rpc-mumbai.matic.today',
    currency: 'MATIC',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    id: 1
  },
  {
    name: 'Polygon',
    status: 1,
    rpcProvider: 'https://rpc-mainnet.matic.network',
    wsProvider: 'wss://rpc-mainnet.matic.network',
    currency: 'MATIC',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    id: 2
  }
];

const contractsData: Prisma.contractsCreateInput[] = [
  {
    id: 1,
    address: '0xcCBF1868c7182020E518E6847b6C839623754E9a',
    name: 'NFT',
    abi: [
      {
        type: 'constructor',
        inputs: [{ name: 'uriUrl_', type: 'string', internalType: 'string' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'Approval',
        type: 'event',
        inputs: [
          {
            name: 'owner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'approved',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'tokenId',
            type: 'uint256',
            indexed: true,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'ApprovalForAll',
        type: 'event',
        inputs: [
          {
            name: 'owner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'operator',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'approved',
            type: 'bool',
            indexed: false,
            internalType: 'bool'
          }
        ],
        anonymous: false
      },
      {
        name: 'MintMarsPunk',
        type: 'event',
        inputs: [
          {
            name: '_creator',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: '_tokenId',
            type: 'uint256',
            indexed: true,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'OwnershipTransferred',
        type: 'event',
        inputs: [
          {
            name: 'previousOwner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'newOwner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          }
        ],
        anonymous: false
      },
      {
        name: 'Transfer',
        type: 'event',
        inputs: [
          {
            name: 'from',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'to',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'tokenId',
            type: 'uint256',
            indexed: true,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'approve',
        type: 'function',
        inputs: [
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'getApproved',
        type: 'function',
        inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view'
      },
      {
        name: 'isApprovedForAll',
        type: 'function',
        inputs: [
          { name: 'owner', type: 'address', internalType: 'address' },
          { name: 'operator', type: 'address', internalType: 'address' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'view'
      },
      {
        name: 'mint',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'name',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view'
      },
      {
        name: 'owner',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view'
      },
      {
        name: 'ownerOf',
        type: 'function',
        inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view'
      },
      {
        name: 'renounceOwnership',
        type: 'function',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'safeTransferFrom',
        type: 'function',
        inputs: [
          { name: 'from', type: 'address', internalType: 'address' },
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'safeTransferFrom',
        type: 'function',
        inputs: [
          { name: 'from', type: 'address', internalType: 'address' },
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
          { name: '_data', type: 'bytes', internalType: 'bytes' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'setApprovalForAll',
        type: 'function',
        inputs: [
          { name: 'operator', type: 'address', internalType: 'address' },
          { name: 'approved', type: 'bool', internalType: 'bool' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'supportsInterface',
        type: 'function',
        inputs: [
          { name: 'interfaceId', type: 'bytes4', internalType: 'bytes4' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'view'
      },
      {
        name: 'symbol',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view'
      },
      {
        name: 'tokenIds',
        type: 'function',
        inputs: [],
        outputs: [{ name: '_value', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'tokenURI',
        type: 'function',
        inputs: [{ name: 'tokenId', type: 'uint256', internalType: 'uint256' }],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view'
      },
      {
        name: 'transferFrom',
        type: 'function',
        inputs: [
          { name: 'from', type: 'address', internalType: 'address' },
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'transferOwnership',
        type: 'function',
        inputs: [
          { name: 'newOwner', type: 'address', internalType: 'address' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ],
    status: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    listenEvents: true,
    initialBlockNumber: 25757808,
    lastBlockNumber: 26186808,
    blockchain: { connect: { id: 1 } }
  },
  {
    id: 2,
    address: '0x4D0cb74Fac3F3BbA25386354920C1A5412aA8684',
    name: 'Token',
    abi: [
      {
        type: 'constructor',
        inputs: [
          { name: '__name', type: 'string', internalType: 'string' },
          { name: '__symbol', type: 'string', internalType: 'string' }
        ],
        stateMutability: 'nonpayable'
      },
      {
        name: 'Approval',
        type: 'event',
        inputs: [
          {
            name: 'owner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'spender',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'value',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'OwnershipTransferred',
        type: 'event',
        inputs: [
          {
            name: 'previousOwner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'newOwner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          }
        ],
        anonymous: false
      },
      {
        name: 'Transfer',
        type: 'event',
        inputs: [
          {
            name: 'from',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'to',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'value',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'allowance',
        type: 'function',
        inputs: [
          { name: 'owner', type: 'address', internalType: 'address' },
          { name: 'spender', type: 'address', internalType: 'address' }
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'approve',
        type: 'function',
        inputs: [
          { name: 'spender', type: 'address', internalType: 'address' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'decimals',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
        stateMutability: 'view'
      },
      {
        name: 'decreaseAllowance',
        type: 'function',
        inputs: [
          { name: 'spender', type: 'address', internalType: 'address' },
          { name: 'subtractedValue', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'faucetLimit',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'faucetToken',
        type: 'function',
        inputs: [{ name: '_amount', type: 'uint256', internalType: 'uint256' }],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'increaseAllowance',
        type: 'function',
        inputs: [
          { name: 'spender', type: 'address', internalType: 'address' },
          { name: 'addedValue', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'name',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view'
      },
      {
        name: 'owner',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view'
      },
      {
        name: 'renounceOwnership',
        type: 'function',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'symbol',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view'
      },
      {
        name: 'totalSupply',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'transferFrom',
        type: 'function',
        inputs: [
          { name: 'from', type: 'address', internalType: 'address' },
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' }
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable'
      },
      {
        name: 'transferOwnership',
        type: 'function',
        inputs: [
          { name: 'newOwner', type: 'address', internalType: 'address' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ],
    status: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    listenEvents: true,
    initialBlockNumber: 25757791,
    lastBlockNumber: 26186791,
    blockchain: { connect: { id: 1 } }
  },
  {
    id: 3,
    address: '0x74c77F20B2c8C5E4f0E8a7491b8d49c8aa43c644',
    name: 'Market',
    abi: [
      { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
      {
        name: 'AddQuoteToken',
        type: 'event',
        inputs: [
          {
            name: 'asset',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'user',
            type: 'address',
            indexed: false,
            internalType: 'address'
          }
        ],
        anonymous: false
      },
      {
        name: 'MetaTransactionExecuted',
        type: 'event',
        inputs: [
          {
            name: 'userAddress',
            type: 'address',
            indexed: false,
            internalType: 'address'
          },
          {
            name: 'relayerAddress',
            type: 'address',
            indexed: false,
            internalType: 'address payable'
          },
          {
            name: 'functionSignature',
            type: 'bytes',
            indexed: false,
            internalType: 'bytes'
          }
        ],
        anonymous: false
      },
      {
        name: 'OfferExecuted',
        type: 'event',
        inputs: [
          {
            name: 'offerId',
            type: 'uint256',
            indexed: true,
            internalType: 'uint256'
          },
          {
            name: 'seller',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'buyer',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'nftAddress',
            type: 'address',
            indexed: false,
            internalType: 'address'
          },
          {
            name: 'quoteToken',
            type: 'address',
            indexed: false,
            internalType: 'address'
          },
          {
            name: 'nftId',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          },
          {
            name: 'offerPrice',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          },
          {
            name: 'quantity',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'OwnershipTransferred',
        type: 'event',
        inputs: [
          {
            name: 'previousOwner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'newOwner',
            type: 'address',
            indexed: true,
            internalType: 'address'
          }
        ],
        anonymous: false
      },
      {
        name: 'RemoveQuoteToken',
        type: 'event',
        inputs: [
          {
            name: 'asset',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'user',
            type: 'address',
            indexed: false,
            internalType: 'address'
          }
        ],
        anonymous: false
      },
      {
        name: 'SellExecuted',
        type: 'event',
        inputs: [
          {
            name: 'saleId',
            type: 'uint256',
            indexed: true,
            internalType: 'uint256'
          },
          {
            name: 'seller',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'buyer',
            type: 'address',
            indexed: true,
            internalType: 'address'
          },
          {
            name: 'nftAddress',
            type: 'address',
            indexed: false,
            internalType: 'address'
          },
          {
            name: 'nftId',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          },
          {
            name: 'quantity',
            type: 'uint256',
            indexed: false,
            internalType: 'uint256'
          }
        ],
        anonymous: false
      },
      {
        name: 'ERC721InterfaceID',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
        stateMutability: 'view'
      },
      {
        name: 'addQuoteToken',
        type: 'function',
        inputs: [{ name: '_asset', type: 'address', internalType: 'address' }],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'allowedQuoteTokens',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'address[]', internalType: 'address[]' }],
        stateMutability: 'view'
      },
      {
        name: 'executeMetaTransaction',
        type: 'function',
        inputs: [
          { name: 'userAddress', type: 'address', internalType: 'address' },
          { name: 'functionSignature', type: 'bytes', internalType: 'bytes' },
          { name: 'sigR', type: 'bytes32', internalType: 'bytes32' },
          { name: 'sigS', type: 'bytes32', internalType: 'bytes32' },
          { name: 'sigV', type: 'uint8', internalType: 'uint8' }
        ],
        outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'payable'
      },
      {
        name: 'executeOffer',
        type: 'function',
        inputs: [
          { name: 'uints', type: 'uint256[5]', internalType: 'uint256[5]' },
          { name: 'addrs', type: 'address[]', internalType: 'address[]' },
          { name: 'sigs', type: 'bytes[2]', internalType: 'bytes[2]' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'executeSell',
        type: 'function',
        inputs: [
          { name: 'uints', type: 'uint256[4]', internalType: 'uint256[4]' },
          { name: 'addrs', type: 'address[3]', internalType: 'address[3]' },
          { name: 'sigs', type: 'bytes[2]', internalType: 'bytes[2]' }
        ],
        outputs: [],
        stateMutability: 'payable'
      },
      {
        name: 'getNonce',
        type: 'function',
        inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
        outputs: [{ name: 'nonce', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view'
      },
      {
        name: 'isAllowedQuoteToken',
        type: 'function',
        inputs: [{ name: '_token', type: 'address', internalType: 'address' }],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'view'
      },
      {
        name: 'owner',
        type: 'function',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view'
      },
      {
        name: 'removeQuoteToken',
        type: 'function',
        inputs: [{ name: '_asset', type: 'address', internalType: 'address' }],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'renounceOwnership',
        type: 'function',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable'
      },
      {
        name: 'transferOwnership',
        type: 'function',
        inputs: [
          { name: 'newOwner', type: 'address', internalType: 'address' }
        ],
        outputs: [],
        stateMutability: 'nonpayable'
      }
    ],
    status: 1,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    listenEvents: true,
    initialBlockNumber: 25758388,
    lastBlockNumber: 25758388,
    blockchain: { connect: { id: 1 } }
  }
];

async function main() {
  console.log(`Start seeding ...`);
  for (const block of blockchainData) {
    const blockchains = await prisma.blockchains.create({
      data: block
    });
    console.log(`Created blockchains with id: ${block.id}`);
  }

  for (const contract of contractsData) {
    const contracts = await prisma.contracts.create({
      data: contract
    });
    console.log(`Created contracts with id: ${contract.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch(e => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
