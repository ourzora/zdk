## Utils

Many utility and convenience functions are defined in `utils.ts`

The utility functions can roughly be split into 3 categories:

- `Type Constructors`
- `Hash Utilities`
- `EIP-712 Utilities`

### Type Constructors

There are a number of [Types](../src/types.ts) that are necessary to interact with a Zora instance.
The type constructors accept input, perform basic validation on the input, and return the properly formatted Zora Type.

#### constructMediaData

- Accepts the arguments for constructing `MediaData` type.
- Validates that the URIs begins with `https://`.
- Validates that the hashes are exactly 32 bytes in length.

| **Name**     | **Type**  | **Description**                                    |
| ------------ | --------- | -------------------------------------------------- |
| tokenURI     | string    | The uri where the media's content can be accessed  |
| metadataURI  | string    | The uri where the media's metadata can be accessed |
| contentHash  | BytesLike | The sha256 hash of the media's content             |
| metadataHash | BytesLike | The sha256 hash of the media's metadata            |

```typescript
const contentHash = await sha256FromBuffer(Buffer.from('some content'))
const metadataHash = await sha256FromBuffer(Buffer.from('some metadata'))

const mediaData = constructMediaData(
  'https://token.com',
  'https://metadata.com',
  contentHash,
  metadataHash
)
```

#### constructAsk

- Parses and Validates the currency address to ensure its a valid Ethereum Address

| **Name** | **Type**     | **Description**                                      |
| -------- | ------------ | ---------------------------------------------------- |
| currency | string       | The currency address of the Ask                      |
| amount   | BigNumberish | The amount of the Ask in the currency's atomic units |

```typescript
const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const decimal100 = Decimal.new(100)
const ask = constructAsk(dai, decimal100.value)
```

#### constructBid

- Parses and Validates the bidder, recipient, and currency addresses.
- Rounds the SellOnShare to 4 decimals of precision

| **Name**    | **Type**     | **Description**                                      |
| ----------- | ------------ | ---------------------------------------------------- |
| currency    | string       | The currency address of the Bid                      |
| amount      | BigNumberish | The amount of the Bid in the currency's atomic units |
| bidder      | string       | The address of the Bid's bidder                      |
| recipient   | string       | The address of the Bid's recipient                   |
| sellOnShare | number       | The sellOnShare of the Bid                           |

```typescript
const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const decimal100 = Decimal.new(100)
const bidder = '0xf13090cC20613BF9b5F0b3E6E83CCAdB5Cd0FbD5'
const bid = constructBid(dai, decimal100.value, bidder, bidder, 33.3333)
```

#### constructBidShares

- Accepts `number` args, converts them to ethers `BigNumber` type with 18 decimals of precision.
- Performs validation that the `BigNumber` representations sum to `100` in `BigNumber` form.

| **Name**  | **Type** | **Description**                      |
| --------- | -------- | ------------------------------------ |
| creator   | number   | The creator bidshare for the media   |
| owner     | number   | The owner bidshare for the media     |
| prevOwner | number   | The prevOwner bidshare for the media |

```typescript
const bidShares = constructBidShares(10, 90, 0)
```

### Hashing Utilities

All pieces of media minted on the Zora Protocol must etch a `sha56` hash of both its content and metadata onto the blockchain.
As such it is important developers interacting with Zora have reliable ways to create and verify hashes of data of all types of sizes.

#### sha256FromBuffer

Create a sha256 from a `Buffer` object

| **Name** | **Type** | **Description**         |
| -------- | -------- | ----------------------- |
| buffer   | Buffer   | The Buffer to be hashed |

```typescript
const buf = await fs.readFile('path/to/file')
const hash = sha256FromBuffer(buf)

const otherBuffer = Buffer.from('someContent')
const otherHash = sha256FromBuffer(otherBuffer)
```

#### sha256FromHexString

Create a sha256 hash from a hex string.
Hex string must be prefixed with `0x`

| **Name** | **Type** | **Description**                   |
| -------- | -------- | --------------------------------- |
| data     | string   | The hex encoded data to be hashed |

```typescript
const buf = Buffer.from('someContent')
const hexString = '0x'.concat(buf.toString('hex'))
const hash = sha256FromHexString(hexString)
```

### EIP-712 Utilities

#### signPermitMessage

[Permit](https://eips.ethereum.org/EIPS/eip-2612) was specified as an extension of ERC-20 standard to allow for users to issue `approval` to accounts without needing `ETH`.

We have extended it further to be used for the Zora Protocol, so that users can delegate approvals to orther smart contracts to perform actions that `approved` users can do such as:

- `setAsk`
- `acceptBid`
- `updateContentURI`
- `updateMetadataURI`
- `transfer`

For now, the signer must be an `ethers` `Wallet` object. But soon we will support any `Signer`.

| **Name**  | **Type**     | **Description**                                      |
| --------- | ------------ | ---------------------------------------------------- |
| owner     | Wallet       | The owners's wallet                                  |
| toAddress | string       | The address being granted the permit                 |
| mediaId   | number       | The ID of the media                                  |
| nonce     | number       | The permitNonce of the owner address                 |
| deadline  | number       | The deadline of the signature to be included in a tx |
| domain    | EIP712Domain | The EIP712Domain for the permit sig                  |

```typescript
const provider = new JsonRpcProvider()
const [mainWallet, otherWallet] = generatedWallets(provider)
const rinkebyZora = new Zora(mainWallet, 4)
const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
const domain = rinkebyZora.eip712Domain()
const eipSig = await signPermitMessage(
  mainWallet,
  otherWallet.address,
  0, // mediaId
  0, // nonce
  deadline,
  domain
)
```

#### signMintWithSigMessage

We extended `EIP-712` to allow for creators to `mint` without needing `ETH`.
A user can sign a `mintWithSig` message and use a trusted relayer to relay the transaction and mint on their behalf.

| **Name**       | **Type**     | **Description**                                      |
| -------------- | ------------ | ---------------------------------------------------- |
| owner          | Wallet       | The owners's wallet                                  |
| contentHash    | BytesLike    | The sha256 hash of the media's content               |
| metadataHash   | BytesLike    | The sha256 hash of the media's metadata              |
| creatorShareBN | BigNumber    | The creator share of the media                       |
| nonce          | number       | The mintWithSigNonce of the owner address            |
| deadline       | number       | The deadline of the signature to be included in a tx |
| domain         | EIP712Domain | The EIP712Domain for the mintWithSig signature       |

```typescript
const provider = new JsonRpcProvider()
const [mainWallet, otherWallet] = generatedWallets(provider)
const rinkebyZora = new Zora(otherWallet, 4)

const contentHash = await sha256FromBuffer(Buffer.from('some content'))
const metadataHash = await sha256FromBuffer(Buffer.from('some metadata'))
const contentURI = 'https://token.com'
const metadataURI = 'https://metadata.com'

const mediaData = constructMediaData(contentURI, metadataURI, contentHash, metadataHash)
const bidShares = constructBidShares(10, 90, 0)
const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
const domain = rinkebyZora.eip712Domain()
const nonce = await rinkebyZora.fetchMintWithSigNonce(mainWallet.address)
const eipSig = await signMintWithSigMessage(
  mainWallet,
  contentHash,
  metadataHash,
  Decimal.new(10).value,
  nonce.toNumber(),
  deadline,
  domain
)
```

#### recoverSignatureFromPermit

Recover the address of the signing private key of a `Permit` message

| **Name**  | **Type**        | **Description**                                      |
| --------- | --------------- | ---------------------------------------------------- |
| owner     | Wallet          | The owners's wallet                                  |
| toAddress | string          | The address being granted the permit                 |
| mediaId   | number          | The ID of the media                                  |
| nonce     | number          | The permitNonce of the owner address                 |
| deadline  | number          | The deadline of the signature to be included in a tx |
| domain    | EIP712Domain    | The EIP712Domain for the permit sig                  |
| sig       | EIP712Signature | The EIP712Signature to have an address recovered     |

```typescript
const provider = new JsonRpcProvider()
const [mainWallet, otherWallet] = generatedWallets(provider)
const zora = new Zora(provider, 4)
const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
const domain = zora.eip712Domain()
const eipSig = await signPermitMessage(
  mainWallet,
  otherWallet.address,
  1,
  1,
  deadline,
  domain
)

const recovered = await recoverSignatureFromPermit(
  otherWallet.address,
  1,
  1,
  deadline,
  domain,
  eipSig
)

if (recovered.toLowerCase() != mainWallet.address.toLowerCase()) {
  console.log('Unable to Validate Signature')
} else {
  console.log('Signature Validated')
}
```

#### recoverSignatureFromMintWithSig

Recover the address of the signing private key of a `mintWithSig` message

| **Name**       | **Type**        | **Description**                                      |
| -------------- | --------------- | ---------------------------------------------------- |
| owner          | Wallet          | The owners's wallet                                  |
| contentHash    | BytesLike       | The sha256 hash of the media's content               |
| metadataHash   | BytesLike       | The sha256 hash of the media's metadata              |
| creatorShareBN | BigNumber       | The creator share of the media                       |
| nonce          | number          | The mintWithSigNonce of the owner address            |
| deadline       | number          | The deadline of the signature to be included in a tx |
| domain         | EIP712Domain    | The EIP712Domain for the mintWithSig signature       |
| sig            | EIP712Signature | The EIP712Signature to have an address recovered     |

```typescript
const provider = new JsonRpcProvider()
const [mainWallet] = generatedWallets(provider)
const rinkebyZora = new Zora(provider, 4)
const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
const domain = rinkebyZora.eip712Domain()

const contentHash = await sha256FromBuffer(Buffer.from('some content'))
const metadataHash = await sha256FromBuffer(Buffer.from('some metadata'))

const eipSig = await signMintWithSigMessage(
  mainWallet,
  contentHash,
  metadataHash,
  Decimal.new(10).value,
  1,
  deadline,
  domain
)

const recovered = await recoverSignatureFromMintWithSig(
  contentHash,
  metadataHash,
  Decimal.new(10).value,
  2,
  deadline,
  domain,
  eipSig
)

if (recovered.toLowerCase() != mainWallet.address.toLowerCase()) {
  console.log('Unable to Validate Signature')
} else {
  console.log('Signature Validated')
}
```
