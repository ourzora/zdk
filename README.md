## ZDK: The Zora Developer Kit

| Statements                                                            | Branches                                                               | Functions                                                           | Lines                                                         |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-75.23%25-red.svg) | ![Branches](https://img.shields.io/badge/Coverage-84.62%25-yellow.svg) | ![Functions](https://img.shields.io/badge/Coverage-61.4%25-red.svg) | ![Lines](https://img.shields.io/badge/Coverage-75%25-red.svg) |

### Installation

```bash
yarn add @zoralabs/zdk
```

### Usage

#### Mainnet

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 1)
await zora.totalSupply()
```

#### Testnets

##### Rinkeby

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50)
await zora.totalSupply()
```

#### Local Blockchain

When using a local blockchain you must specify overrides for both `mediaAddress` and `marketAddress`.
These should point to the addresses of deployed Zora Media and Market contracts on your local blockchain.

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50, mediaAddress, marketAddress)
await zora.totalSupply()
```

### Minting

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import {
  constructBidShares,
  constructMediaData,
  sha256FromHexString,
} from '@zoralabs/zdk/utils'
import { generateMetadata } from '@zoralabs/zdk/metadata'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 4)

const metadataJSON = generateMetadata('zora-20210101', {
  description: '',
  mimeType: 'text/plain',
  name: '',
  version: 'zora-20210101',
})

const contentHex = ethers.utils.formatBytes32String('Ours Truly')
const metadataHex = ethers.utils.formatBytes32String(metadataJSON)
const contentHash = sha256FromHexString(contentHex)
const metadataHash = sha256FromHexString(metadataHex)
const mediaData = constructMediaData(
  'https://ipfs.io/ipfs/bafybeifyqibqlheu7ij7fwdex4y2pw2wo7eaw2z6lec5zhbxu3cvxul6h4',
  'https://ipfs.io/ipfs/bafybeifpxcq2hhbzuy2ich3duh7cjk4zk4czjl6ufbpmxep247ugwzsny4',
  contentHash,
  metadataHash
)

const bidShares = constructBidShares(
  10, // creator share
  90, // owner share
  0 // prevOwner share
)
const tx = await zora.mint(mediaData, bidShares)
await tx.wait(8) // 8 confirmations to finalize
```

### Bidding

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { constructBid } from '@zoralabs/zdk'
import { Decimal } from '@zoralabs/zdk'

const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const wallet = Wallet.createRandom()

const zora = new Zora(wallet, 4)
const bid = constructBid(
  dai, // currency
  Decimal.new(10).value, // amount 10*10^18
  wallet.address, // bidder address
  wallet.address, // recipient address (address to receive Media if bid is accepted)
  10 // sellOnShare
)

const tx = await zora.setBid(1, bid)
await tx.wait(8) // 8 confirmations to finalize
```

## Development

`git clone ...`

Run tests

`yarn test`
