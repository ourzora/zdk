import { BigNumber, BigNumberish, ethers, Signer } from 'ethers'
import { Provider, TransactionReceipt } from '@ethersproject/providers'
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
  public readonly readOnly: boolean
  public readonly signerOrProvider: Signer | Provider
  public readonly auctionHouse: AuctionHouseContract
  public readonly zoraAddress: string

  constructor(signerOrProvider: Signer | Provider, chainId: number) {
    this.chainId = chainId
    this.readOnly = !Signer.isSigner(signerOrProvider)
    this.signerOrProvider = signerOrProvider
    const address =
      chainId === 1
        ? // @ts-ignore
          mainnetAddresses.auctionHouse
        : rinkebyAddresses.auctionHouse
    this.auctionHouse = AuctionHouse__factory.connect(address, signerOrProvider)
    const network = chainIdToNetworkName(chainId)
    this.zoraAddress = addresses[network].media
  }

  public async fetchAuction(auctionId: BigNumberish): Promise<Auction> {
    return this.auctionHouse.auctions(auctionId)
  }

  public async fetchAuctionFromTransactionReceipt(
    receipt: TransactionReceipt
  ): Promise<Auction | null> {
    for (const log of receipt.logs) {
      const description = this.auctionHouse.interface.parseLog(log)

      if (description.args.auctionId && log.address === this.auctionHouse.address) {
        return this.fetchAuction(description.args.auctionId)
      }
    }

    return null
  }

  public async createAuction(
    tokenId: BigNumberish,
    duration: BigNumberish,
    reservePrice: BigNumberish,
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
      curator,
      curatorFeePercentages,
      auctionCurrency
    )
  }

  public async setAuctionApproval(auctionId: BigNumberish, approved: boolean) {
    return this.auctionHouse.setAuctionApproval(auctionId, approved)
  }

  public async createBid(auctionId: BigNumberish, amount: BigNumberish) {
    const { auctionCurrency } = await this.auctionHouse.auctions(auctionId)
    // If ETH auction, include the ETH in this transaction
    if (auctionCurrency === ethers.constants.AddressZero) {
      return this.auctionHouse.createBid(auctionId, amount, { value: amount })
    } else {
      return this.auctionHouse.createBid(auctionId, amount)
    }
  }

  public async endAuction(auctionId: BigNumberish) {
    return this.auctionHouse.endAuction(auctionId)
  }

  public async cancelAuction(auctionId: BigNumberish) {
    return this.auctionHouse.cancelAuction(auctionId)
  }
}
