## Zora

The Zora class gives a developer direct read / write access to a specified instance of the Zora Protocol.

## Constructor

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

The constructor will use the `signerOrProvider` to determine if the Zora Instance is `readOnly` or `readAndWrite` capable.
If a `signer` is passed in then the Zora instance will be able to invoke both read and write functions.
If only a `provider` is passed in then the Zora instance can only invoke readOnly methods.

The constructor will use the `chainID` to look up the officially supported Zora Protocol addresses and return a Zora instance connected the protocol

If the chainId does not exist in `chainIdToNetworkName` the constructor will raise.

The constructor can optionally accept two parameters to `override` the official supported Zora Protocol addresses. These overrides are particularly useful for development on a local blockchain. The overrides must adhere to a logical `XAND` to be valid. Either both overrides must be present or both must be null.

### Examples

#### Mainnet

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 1)
const totalSupply = await zora.fetchTotalMedia()
```

#### Rinkeby

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 4)
const totalSupply = await zora.fetchTotalMedia()
```

#### Local Blockchain

When using a local blockchain you must specify overrides for both `mediaAddress` and `marketAddress`. These should point to the addresses of deployed Zora Media and Market contracts on your local blockchain.

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50, mediaAddress, marketAddress)
const totalSupply = await zora.fetchTotalMedia()
```

## Read Functions

### fetchContentHash

Fetch the `contentHash` of a piece of media.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose content hash is being fetched |

### fetchMetadataHash

Fetch the `metadataHash` of a piece of media.

| **Name** | **Type**     | **Description**                                           |
| -------- | ------------ | --------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose metadata hash is being fetched |

### fetchContentURI

Fetch the `contentURI` of a piece of media.

| **Name** | **Type**     | **Description**                                         |
| -------- | ------------ | ------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose content uri is being fetched |

### fetchMetadataURI

Fetch the `metadataURI` of a piece of media.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose metadata uri is being fetched |

### fetchCreator

Fetch the `creator` of a piece of media.

| **Name** | **Type**     | **Description**                                     |
| -------- | ------------ | --------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose creator is being fetched |

### fetchCurrentBidShares

Fetch the current `bidShares` of a piece of media.

| **Name** | **Type**     | **Description**                                                 |
| -------- | ------------ | --------------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose current bid shares are being fetched |

### fetchCurrentAsk

Fetch the current `Ask` of a piece of media.

| **Name** | **Type**     | **Description**                                         |
| -------- | ------------ | ------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose current ask is being fetched |

### fetchCurrentBidForBidder

Fetch the current `Bid` for a bidder on a piece of media.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose metadata uri is being fetched |
| bidder   | string       | The address of the bidder                                |

### fetchPermitNonce

Fetch the next permit nonce for an address

| **Name** | **Type** | **Description**                                                |
| -------- | -------- | -------------------------------------------------------------- |
| address  | string   | The address of the account whose permit nonce is being fetched |

### fetchMintWithSigNonces

Fetch the next mintWithSig nonce for an address

| **Name** | **Type** | **Description**                                                     |
| -------- | -------- | ------------------------------------------------------------------- |
| address  | string   | The address of the account whose mintWithSig nonce is being fetched |

### fetchBalanceOf

Fetch the balance of an address on an instance of the Zora Media Contract

| **Name** | **Type** | **Description**                                           |
| -------- | -------- | --------------------------------------------------------- |
| address  | string   | The address of the account whose balance is being fetched |

### fetchOwnerOf

Fetch the owner of a piece of media on an instance of the Zora Media Contract

| **Name** | **Type**     | **Description**                                   |
| -------- | ------------ | ------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose owner is being fetched |

### fetchMediaOfOwnerByIndex

Fetch the mediaId of the specified owner by index on an instance of the Zora Media Contract

| **Name** | **Type**     | **Description**                       |
| -------- | ------------ | ------------------------------------- |
| owner    | string       | The owner address of the media        |
| index    | BigNumberish | The ERC-721 enumerbale index of owner |

### fetchTotalMedia

Fetch the total amount of non-burned media that has been minted

| **Name** | **Type** | **Description** |
| -------- | -------- | --------------- |
|          |          |                 |

### fetchMediaByIndex

Fetch the mediaId by index

| **Name** | **Type**     | **Description**                                  |
| -------- | ------------ | ------------------------------------------------ |
| index    | BigNumberish | The ERC-721 enumerbale index of a piece of media |

### fetchApproved

Fetch the approved account for the specified media

| **Name** | **Type**     | **Description**                                              |
| -------- | ------------ | ------------------------------------------------------------ |
| mediaId  | BigNumberish | The ID for the media whose approved address is being fetched |

### fetchIsApprovedForAll

Fetch if the specified operator is approved for all media owned by the specified owner

| **Name** | **Type** | **Description**                 |
| -------- | -------- | ------------------------------- |
| owner    | string   | An address on the Zora Protocol |
| operator | string   | An address on the Zora Protocol |

## Write Functions

### mint

Mint a new piece of cryptomedia.

| **Name**  | **Type**  | **Description**                                                                         |
| --------- | --------- | --------------------------------------------------------------------------------------- |
| mediaData | MediaData | The data represented by this media, including SHA256 hashes for future integrity checks |
| bidShares | BidShares | The percentage of bid fees that should be perpetually rewarded to the creator.          |

### mintWithSig

Mint a new piece of media on behalf of signed message from a creator.

| **Name**  | **Type**        | **Description**                                                                         |
| --------- | --------------- | --------------------------------------------------------------------------------------- |
| creator   | BigNumberish    | The creator address of the piece of media                                               |
| mediaData | MediaData       | The data represented by this media, including SHA256 hashes for future integrity checks |
| bidShares | BidShares       | The percentage of bid fees that should be perpetually rewarded to the creator.          |
| sig       | EIP712Signature | The eip-712 compliant signature to be verified on chain                                 |

### updateContentURI

Update the `contentURI` of a piece of media.

| **Name** | **Type**     | **Description**                                         |
| -------- | ------------ | ------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose content uri is being updated |

### updateMetadataURI

Update the `metadataURI` of a piece of media.

| **Name** | **Type**     | **Description**                                          |
| -------- | ------------ | -------------------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose metadata uri is being updated |

### setAsk

Set an `Ask` on a piece of media.

| **Name** | **Type**     | **Description**                             |
| -------- | ------------ | ------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose ask is being set |
| ask      | Ask          | The ask to be set                           |

### removeAsk

Remove the `Ask` from a piece of media.

| **Name** | **Type**     | **Description**                                 |
| -------- | ------------ | ----------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose ask is being removed |

### setBid

Set a `Bid` on a piece of media.

| **Name** | **Type**     | **Description**                             |
| -------- | ------------ | ------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose bid is being set |
| bid      | Bid          | The bid to be set                           |

### removeBid

Remove the `Bid` from a piece of media.

| **Name** | **Type**     | **Description**                                 |
| -------- | ------------ | ----------------------------------------------- |
| mediaId  | BigNumberish | The ID for the media whose bid is being removed |

### acceptBid

Accept a `Bid` on a piece of media.

| **Name** | **Type**     | **Description**                                  |
| -------- | ------------ | ------------------------------------------------ |
| mediaId  | BigNumberish | The ID for the media whose bid is being accepted |
| bid      | Bid          | The bid to be accepted                           |

### permit

Permit an address to act on behalf of the owner of the media

| **Name** | **Type**        | **Description**                                         |
| -------- | --------------- | ------------------------------------------------------- |
| spender  | string          | The address that is being permitted to spend the media  |
| media Id | BigNumberish    | The ID for the media                                    |
| sig      | EIP712Signature | The eip-712 compliant signature to be verified on chain |

### burn

Burn a piece of media

| **Name** | **Type**     | **Description**              |
| -------- | ------------ | ---------------------------- |
| mediaId  | BigNumberish | The ID for the media to burn |

### revokeApproval

As an approved address on a piece of media, revoke your approval.

| **Name** | **Type**     | **Description**              |
| -------- | ------------ | ---------------------------- |
| mediaId  | BigNumberish | The ID for the media to burn |

### approve

Grant approval to the specified address for the specified media on an instance of the Zora Media Contract

| **Name** | **Type**     | **Description**                                  |
| -------- | ------------ | ------------------------------------------------ |
| to       | string       | The address being granted approval for the media |
| mediaId  | BigNumberish | The ID for the media                             |

### setApprovalForAll

Grant approval for all media owner by msg.sender on an instance of the Zora Media Contract

| **Name** | **Type** | **Description**                                               |
| -------- | -------- | ------------------------------------------------------------- |
| operator | string   | The address of the account the approvalForAll is being set    |
| approved | boolean  | Whether or not the operator address is being granted approval |

### transferFrom

Transfers the specified media to the specified to address on an instance of the Zora Media Contract

| **Name** | **Type**     | **Description**                        |
| -------- | ------------ | -------------------------------------- |
| from     | string       | The from address of the media transfer |
| to       | string       | The to address of the media transfer   |
| mediaId  | BigNumberish | The ID for the media being transferred |

### safeTransferFrom

Transfers specified media to the specified address if and only if it adheres to the ERC721-Receiver Interface

| **Name** | **Type**     | **Description**                        |
| -------- | ------------ | -------------------------------------- |
| from     | string       | The from address of the media transfer |
| to       | string       | The to address of the media transfer   |
| mediaId  | BigNumberish | The ID for the media being transferred |
