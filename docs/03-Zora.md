## Zora

The Zora class gives a developer direct read / write access to a specified instance of the Zora Protocol.

#### Constructor

```typescript
constructor(
    signerOrProvider: Signer | Provider,
    chainId: number,
    mediaAddress?: string,
    marketAddress?: string
  )
```

The constructor requires two arguments:

- signerOrProvider
- chainID

The constructor will use the `signerOrProvider` to determine if the Zora Instance is `readOnly` or `readAndWrite` capable. If a signer is passed in then the Zora instance will be able to invoke both read and write functions. If only a provider is passed in then the Zora instance can only invoke readOnly methods.

The constructor will use the `chainID` to look up the officially supported Zora Protocol addresses and return a Zora instance connected the protocol

If the chainId does not exist in `chainIdToNetworkName` the constructor will raise.

The constructor also will accept to option parameters to `override` the official supported Zora Protocol addresses.
These overrides are particularly useful for local development on a local blockchain.
The overrides must adhere to a logical `XAND` to be valid. Either both overrides must be present or both must be null.

##### Examples

###### Mainnet

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 1)
await zora.totalSupply()
```

###### Rinkeby

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50)
await zora.totalSupply()
```

###### Local Blockchain

When using a local blockchain you must specify overrides for both `mediaAddress` and `marketAddress`.
These should point to the addresses of deployed Zora Media and Market contracts on your local blockchain.

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50, mediaAddress, marketAddress)
await zora.totalSupply()
```

#### Read Functions

- `fetchContentHash`
- `fetchMetadataHash`
- `fetchContentURI`
- `fetchMetadataURI`

`...`

#### Write Functions

- `mint`
- `mintWithSig`
- `updateContentURI`
- `updateMetadataURI`
- `setAsk`
- `removeAsk`
- `setBid`
- `removeBid`
- `acceptBid`
- `permit`
- `burn`
- `revokeApproval`

`...`

#### ERC-721 Functions

- `transferFrom`
- `safeTransferFrom`

`...`
