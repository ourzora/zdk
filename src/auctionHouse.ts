import { BigNumber, BigNumberish, ethers, Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import {
  AuctionHouse as AuctionHouseContract,
  AuctionHouse__factory,
} from '@zoralabs/auction-house/dist/typechain'
import rinkebyAddresses from '@zoralabs/auction-house/dist/addresses/4.json'
import mainnetAddresses from '@zoralabs/auction-house/dist/addresses/1.json'
import { addresses } from './addresses'
import { chainIdToNetworkName } from './utils'

export interface Auction {
  approved: boolean
  amount: BigNumber
  duration: BigNumber
  firstBidTime: BigNumber
  reservePrice: BigNumber
  curatorFeePercentage: number
  tokenOwner: string
  bidder: string
  curator: string
  auctionCurrency: string
}

export class AuctionHouse {
  public readonly chainId: number
  public readonly isViewOnly: boolean
  public readonly signerOrProvider: Signer | Provider
  public readonly auctionHouse: AuctionHouseContract
  public readonly zoraAddress: string

  constructor(signerOrProvider: Signer | Provider, chainId: number) {
    this.chainId = chainId
    this.isViewOnly = Signer.isSigner(signerOrProvider)
    this.signerOrProvider = signerOrProvider
    const address =
      chainId === 1
        ? // @ts-ignore
          mainnetAddresses.reserveAuctionProxy
        : rinkebyAddresses.reserveAuctionProxy
    this.auctionHouse = AuctionHouse__factory.connect(address, signerOrProvider)
    const network = chainIdToNetworkName(chainId)
    this.zoraAddress = addresses[network].media
  }

  public async fetchAuction(mediaId: BigNumberish): Promise<Auction> {
    return this.auctionHouse.auctions(this.zoraAddress, mediaId)
  }

  public async createAuction(
    tokenId: BigNumberish,
    duration: BigNumberish,
    reservePrice: BigNumberish,
    creator: string,
    curator: string,
    curatorFeePercentages: number,
    auctionCurrency: string,
    tokenAddress: string = this.zoraAddress
  ) {
    return this.auctionHouse.createAuction(
      tokenId,
      tokenAddress,
      duration,
      reservePrice,
      creator,
      curator,
      curatorFeePercentages,
      auctionCurrency
    )
  }

  public async setAuctionApproval(
    tokenId: BigNumberish,
    approved: boolean,
    tokenAddress: string = this.zoraAddress
  ) {
    return this.auctionHouse.setAuctionApproval(tokenAddress, tokenId, approved)
  }

  public async createBid(
    tokenId: BigNumberish,
    amount: BigNumberish,
    tokenAddress: string = this.zoraAddress
  ) {
    const { auctionCurrency } = await this.auctionHouse.auctions(tokenAddress, tokenId)
    // If ETH auction, include the ETH in this transaction
    if (auctionCurrency === ethers.constants.AddressZero) {
      return this.auctionHouse.createBid(tokenAddress, tokenId, amount, { value: amount })
    } else {
      return this.auctionHouse.createBid(tokenAddress, tokenId, amount)
    }
  }

  public async endAuction(
    tokenId: BigNumberish,
    tokenAddress: string = this.zoraAddress
  ) {
    return this.auctionHouse.endAuction(tokenAddress, tokenId)
  }

  public async cancelAuction(
    tokenId: BigNumberish,
    tokenAddress: string = this.zoraAddress
  ) {
    return this.auctionHouse.cancelAuction(tokenAddress, tokenId)
  }
}
