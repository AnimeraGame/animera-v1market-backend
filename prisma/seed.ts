import { PrismaClient, Prisma } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

const blockchainData: Prisma.blockchainsCreateInput[] = [
  {
    name: 'MumbaiTestnet',
    status: 1,
    rpcProvider:
      'https://speedy-nodes-nyc.moralis.io/919ddf95d5bfe65d8882e20c/polygon/mumbai',
    wsProvider:
      'wss://speedy-nodes-nyc.moralis.io/919ddf95d5bfe65d8882e20c/polygon/mumbai/ws',
    currency: 'MATIC',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    id: 1
  },
  {
    name: 'Polygon',
    status: 1,
    rpcProvider:
      'https://polygon-mainnet.g.alchemy.com/v2/zqczgKZ-O5tlyY6DVFAb2EwuxrVSFPWk',
    wsProvider:
      'wss://polygon-mainnet.g.alchemy.com/v2/zqczgKZ-O5tlyY6DVFAb2EwuxrVSFPWk',
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
    lastBlockNumber: 25756808,
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
    lastBlockNumber: 25756791,
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
    lastBlockNumber: 25820825,
    blockchain: { connect: { id: 1 } }
  }
];

const metaDatas: Prisma.nft_metadataCreateInput[] = [
  {
    id: 1,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 1,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 2,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 2,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 3,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 3,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 4,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 4,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 5,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 5,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 6,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 6,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 7,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 7,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 8,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 8,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 9,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 9,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 10,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 10,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 11,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 11,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 12,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 12,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 13,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 13,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 14,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 14,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 15,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 15,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 16,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 16,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 17,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 17,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 18,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 18,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 19,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 19,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 20,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 20,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 21,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 21,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 22,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 22,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 23,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 23,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 24,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 24,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 25,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 25,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 26,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 26,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 27,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 27,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 28,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 28,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 29,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 29,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 30,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 30,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 41,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 41,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 42,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 42,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 43,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 43,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 44,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 44,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 45,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 45,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 46,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 46,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 47,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 47,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 48,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 48,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 49,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 49,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 50,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 50,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 51,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 51,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 52,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 52,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 53,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 53,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 54,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 54,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 55,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 55,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 56,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 56,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 57,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 57,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 58,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 58,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 59,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 59,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 60,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 60,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 61,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 61,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 62,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 62,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 63,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 63,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 64,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 64,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 65,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 65,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 66,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 66,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 67,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 67,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 68,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 68,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 69,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 69,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 70,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 70,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 71,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 71,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 72,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 72,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 73,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 73,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 74,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 74,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 75,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 75,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 76,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 76,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 77,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 77,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 78,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 78,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 79,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 79,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 80,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 80,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 81,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 81,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 82,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 82,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 83,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 83,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 84,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 84,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 85,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 85,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 86,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 86,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 87,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 87,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 88,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 88,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 89,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 89,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 90,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 10,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 91,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 91,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 92,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 92,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 93,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 93,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 94,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 94,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 95,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 95,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 96,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 96,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 97,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 97,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 98,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 98,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 99,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 99,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
  },
  {
    id: 100,
    metadata: [
      {
        id: '115792089237316195423570985008687907818901465606625779229656748657304540282786',
        name: 'Parcel -102,-94',
        image:
          'https://api.decentraland.org/v2/parcels/-102/-94/map.png?size=24&width=1024&height=1024',
        attributes: [
          { value: -102, trait_type: 'X', display_type: 'number' },
          { value: -94, trait_type: 'Y', display_type: 'number' }
        ],
        description: '',
        external_url:
          'https://market.decentraland.org/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907818901465606625779229656748657304540282786',
        background_color: '000000'
      }
    ],
    token_id: 100,
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now())
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

  for (const metaData of metaDatas) {
    const nft_metaData = await prisma.nft_metadata.create({
      data: metaData
    });
    console.log(`Created nft_metaData with id: ${metaData.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch(e => console.error(e))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
