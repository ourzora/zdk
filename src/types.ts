import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { BytesLike } from '@ethersproject/bytes'
import Decimal from '@zoralabs/core/dist/utils/Decimal'
export { Decimal }

/**
 * Internal type to represent a Decimal Value
 */
export type DecimalValue = { value: BigNumber }

/**
 * Zora Media Protocol BidShares
 */
export type BidShares = {
  owner: DecimalValue
  prevOwner: DecimalValue
  creator: DecimalValue
}

/**
 * Zora Media Protocol Ask
 */
export type Ask = {
  currency: string
  amount: BigNumberish
}

/**
 * Zora Media Protocol Bid
 */
export type Bid = {
  currency: string
  amount: BigNumberish
  bidder: string
  recipient: string
  sellOnShare: DecimalValue
}

/**
 * Zora Media Protocol MediaData
 */
export type MediaData = {
  tokenURI: string
  metadataURI: string
  contentHash: BytesLike
  metadataHash: BytesLike
}

/**
 * EIP712 Signature
 */
export type EIP712Signature = {
  deadline: BigNumberish
  v: BigNumberish
  r: BytesLike
  s: BytesLike
}
