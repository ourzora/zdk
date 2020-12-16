import { BigNumber, BigNumberish } from 'ethers'

export type DecimalValue = { value: BigNumber }

export type BidShares = {
  owner: DecimalValue
  prevOwner: DecimalValue
  creator: DecimalValue
}

export type Ask = {
  currency: string
  amount: BigNumberish
}

export type Bid = {
  currency: string
  amount: BigNumberish
  bidder: string
}
