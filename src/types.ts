import { BigNumber, BigNumberish, BytesLike } from 'ethers'

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
 * EIP721 Signature
 */
export type EIP721Signature = {
  deadline: BigNumberish
  v: BigNumberish
  r: BytesLike
  s: BytesLike
}
