# Minting Cryptomedia on the Zora Protocol

Cryptomedia is the foundational primitive of the Zora Protocol.

Cryptomedia is a medium for anyone on the internet to create universally accessible and individually ownable hypermedia.

A single instance of cryptomedia is a token that has two inseparable components:

1. Media
2. Market

The `mint` function on a `Zora` instance expects two parameters: `MediaData` and `BidShares`

### MediaData

The `MediaData` type is composed of four fields:

```typescript
type MediaData = {
  tokenURI: string
  metadataURI: string
  contentHash: BytesLike
  metadataHash: BytesLike
}
```

#### tokenURI

The uri where the cryptomedia's content is hosted. This could link to any storag provider on the internet. Some examples of _decentralized_ storage providers are:

- ipfs
- areweave
- storj
- sia

The token uri must be prefixed with `https://` or at mint time the sdk will reject it.

#### metadataURI

The uri where the cryptomedia's metadata is hosted. This could link to any storage provider on the internet. Some examples of _decentralized_ storage providers are:

- ipfs
- areweave
- storj
- sia

The metadata uri must be prefixed with `https://` or at mint time the sdk will reject it.

To construct the metadata of a piece of cryptomedia, use the `generateMetadata` function defined in `metadata.ts`. For more info visit [Metadata](../reference/metadata)

#### contentHash

The sha256 hash of the content the cryptomedia represents. It is imperative that this hash is correct, because once it is written to the blockchain it **cannot** be changed.
To generate this hash use any of the sha256 utils defined in [utils](../reference/utils).

#### metadataHash

The sha256 hash of the metadata of the cryptomedia. It is imperative that this hash is correct, because once it is written to the blockchain it **cannot** be changed.
To generate this hash use any of the sha256 utils defined in [utils](../reference/utils).

#### Example

```typescript
import { constructMediaData, sha256FromBuffer, generateMetadata } from '@zoralabs/zdk'
import ethers from 'ethers'

const metadataJSON = generateMetadata('zora-20210101', {
  description: '',
  mimeType: 'text/plain',
  name: '',
  version: 'zora-20210101',
})

const contentHash = sha256FromBuffer(Buffer.from('Ours Truly,'))
const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON))
const mediaData = constructMediaData(
  'https://ipfs.io/ipfs/bafybeifyqibqlheu7ij7fwdex4y2pw2wo7eaw2z6lec5zhbxu3cvxul6h4',
  'https://ipfs.io/ipfs/bafybeifpxcq2hhbzuy2ich3duh7cjk4zk4czjl6ufbpmxep247ugwzsny4',
  contentHash,
  metadataHash
)
```

### BidShares

The `BidShares` type is composed of three fields:

```typescript
type DecimalValue = { value: BigNumber }

type BidShares = {
  owner: DecimalValue
  prevOwner: DecimalValue
  creator: DecimalValue
}
```

Each field represents the share that each stakeholder of a piece of cryptomedia has on the **next** accepted bid. At the time of mint, the indivduals bid shares (creator, owner, prevOwner) **must** sum to 100.

#### creator

The immutable, perpetual equity (%) the creator gets from each accepted bid of the piece of cryptomedia.

#### owner

The equity (%) the current owner gets from the next accepted bid of the piece of cryptomedia.

#### prevOwner

The equity (%) the previous owner gets from the next accepted bid of the piece of cryptomedia.

###### Example

The Zora Media Contract allows for 18 decimals of precision. To simplify precision, we created the `constructBidShares` method with accepts JS `numbers` and converts them to `ethers` `BigDecimal` types rounded to the **fourth** decimal.

```typescript
import { constructBidShares } from '@zoralabs/zdk'

const bidShares = constructBidShares(
  10, // creator share
  90, // owner share
  0 // prevOwner share
)
```

### All Together Now!

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import {
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
} from '@zoralabs/zdk'
import ethers from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 4)

const metadataJSON = generateMetadata('zora-20210101', {
  description: '',
  mimeType: 'text/plain',
  name: '',
  version: 'zora-20210101',
})

// for files that are > 32 Bytes: consider using a buffer or another utility to generate the hex string
const contentHash = sha256FromBuffer(Buffer.from('Ours Truly,'))
const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON))
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
