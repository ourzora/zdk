import { InvertToken } from '../typings/InvertToken'
import { Ask, Bid, BidShares } from './common'
import { InvertTokenFactory } from '../typings/InvertTokenFactory'
import { Wallet } from 'ethers'
import { validateAndParseAddress } from './helpers'

export class Invert {
  address: string
  signer: Wallet
  token: InvertToken

  constructor(address: string, signer: Wallet) {
    this.address = validateAndParseAddress(address)
    this.signer = signer
    this.token = InvertTokenFactory.connect(address, signer)
  }

  /**
   * Mint token with cool shit
   * @param tokenURI
   * @param shares
   */
  public async mint(tokenURI: string, shares: BidShares) {
    return this.token.mint(this.signer.address, tokenURI, shares)
  }

  public async setAsk(tokenId: number, ask: Ask) {
    return this.token.setAsk(tokenId, ask)
  }

  public async setBid(bid: Bid, tokenId: number) {
    return this.token.setBid(tokenId, bid)
  }

  public async removeBid(tokenId: number) {
    return this.token.removeBid(tokenId)
  }

  public async acceptBid(tokenId: number, bidder: string) {
    return this.token.acceptBid(tokenId, bidder)
  }
}
