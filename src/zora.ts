import { Ask, Bid, BidShares, EIP712Signature, MediaData } from './types'
import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Market, MarketFactory, Media, MediaFactory } from '@zoralabs/core/dist/typechain'
import { addresses } from './addresses'
import {
  chainIdToNetworkName,
  validateAndParseAddress,
  validateBidShares,
  validateURI,
} from './utils'
import invariant from 'tiny-invariant'

export class Zora {
  public chainId: number
  public mediaAddress: string
  public marketAddress: string
  public signerOrProvider: Signer | Provider
  public media: Media
  public market: Market
  public readOnly: boolean

  constructor(
    signerOrProvider: Signer | Provider,
    chainId: number,
    mediaAddress?: string,
    marketAddress?: string
  ) {
    if (!mediaAddress != !marketAddress) {
      invariant(
        false,
        'Zora Constructor: mediaAddress and marketAddress must both be non-null or both be null'
      )
    }

    if (Signer.isSigner(signerOrProvider)) {
      this.readOnly = false
    } else {
      this.readOnly = true
    }

    this.signerOrProvider = signerOrProvider
    this.chainId = chainId

    if (mediaAddress && marketAddress) {
      const parsedMediaAddress = validateAndParseAddress(mediaAddress)
      const parsedMarketAddress = validateAndParseAddress(marketAddress)
      this.mediaAddress = parsedMediaAddress
      this.marketAddress = parsedMarketAddress
    } else {
      const network = chainIdToNetworkName(chainId)
      this.mediaAddress = addresses[network].media
      this.marketAddress = addresses[network].market
    }

    this.media = MediaFactory.connect(this.mediaAddress, signerOrProvider)
    this.market = MarketFactory.connect(this.mediaAddress, signerOrProvider)
  }

  /*********************
   * Zora View Methods
   *********************
   */

  /**
   * Fetches the content hash for the specified media on the Zora Media Contract
   * @param mediaId
   */
  public async fetchContentHash(mediaId: BigNumberish): Promise<string> {
    return this.media.tokenContentHashes(mediaId)
  }

  /**
   * Fetches the metadata hash for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchMetadataHash(mediaId: BigNumberish): Promise<string> {
    return this.media.tokenMetadataHashes(mediaId)
  }

  /**
   * Fetches the content uri for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchContentURI(mediaId: BigNumberish): Promise<string> {
    return this.media.tokenURI(mediaId)
  }

  /**
   * Fetches the metadata uri for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchMetadataURI(mediaId: BigNumberish): Promise<string> {
    return this.media.tokenMetadataURI(mediaId)
  }

  /**
   * Fetches the creator for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchCreator(mediaId: BigNumberish): Promise<string> {
    return this.media.tokenCreators(mediaId)
  }

  /**
   * Fetches the current bid shares for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchCurrentBidShares(mediaId: BigNumberish): Promise<BidShares> {
    return this.market.bidSharesForToken(mediaId)
  }

  /**
   * Fetches the current ask for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchCurrentAsk(mediaId: BigNumberish): Promise<Ask> {
    return this.market.currentAskForToken(mediaId)
  }

  /**
   * Fetches the current bid for the specified bidder for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   * @param bidder
   */
  public async fetchCurrentBidForBidder(
    mediaId: BigNumberish,
    bidder: string
  ): Promise<Bid> {
    return this.market.bidForTokenBidder(mediaId, bidder)
  }

  /*********************
   * Zora Write Methods
   *********************
   */

  /**
   * Updates the content uri for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   * @param tokenURI
   */
  public async updateContentURI(
    mediaId: BigNumberish,
    tokenURI: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.updateTokenURI(mediaId, tokenURI)
  }

  /**
   * Updates the metadata uri for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   * @param metadataURI
   */
  public async updateMetadataURI(
    mediaId: BigNumberish,
    metadataURI: string
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.updateTokenMetadataURI(mediaId, metadataURI)
  }

  /**
   * Mints a new piece of media on an instance of the Zora Media Contract
   * @param mintData
   * @param bidShares
   */
  public async mint(
    mediaData: MediaData,
    bidShares: BidShares
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
      validateURI(mediaData.metadataURI)
      validateURI(mediaData.tokenURI)
      validateBidShares(bidShares.creator, bidShares.owner, bidShares.prevOwner)
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.mint(mediaData, bidShares)
  }

  /**
   * Mints a new piece of media on an instance of the Zora Media Contract
   * @param creator
   * @param mediaData
   * @param bidShares
   * @param sig
   */
  public async mintWithSig(
    creator: string,
    mediaData: MediaData,
    bidShares: BidShares,
    sig: EIP712Signature
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
      validateURI(mediaData.metadataURI)
      validateURI(mediaData.tokenURI)
      validateBidShares(bidShares.creator, bidShares.owner, bidShares.prevOwner)
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.mintWithSig(creator, mediaData, bidShares, sig)
  }

  /**
   * Sets an ask on the specified media on an instance of the Zora Media Contract
   * @param mediaId
   * @param ask
   */
  public async setAsk(mediaId: BigNumberish, ask: Ask): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.setAsk(mediaId, ask)
  }

  /**
   * Sets a bid on the specified media on an instance of the Zora Media Contract
   * @param mediaId
   * @param bid
   */
  public async setBid(mediaId: BigNumberish, bid: Bid): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.setBid(mediaId, bid)
  }

  /**
   * Removes the ask on the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async removeAsk(mediaId: BigNumberish): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.removeAsk(mediaId)
  }

  /**
   * Removes the bid for the msg.sender on the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async removeBid(mediaId: BigNumberish): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.removeBid(mediaId)
  }

  /**
   * Accepts the specified bid on the specified media on an instance of the Zora Media Contract
   * @param mediaId
   * @param bid
   */
  public async acceptBid(mediaId: BigNumberish, bid: Bid): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.acceptBid(mediaId, bid)
  }

  /**
   * Grants the spender approval for the specified media using meta transactions as outlined in EIP-712
   * @param sender
   * @param mediaId
   * @param sig
   */
  public async permit(
    spender: string,
    mediaId: BigNumberish,
    sig: EIP712Signature
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.permit(spender, mediaId, sig)
  }

  /**
   * Revokes the approval of an approved account for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async revokeApproval(mediaId: BigNumberish): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.revokeApproval(mediaId)
  }

  /**
   * Burns the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async burn(mediaId: BigNumberish): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.burn(mediaId)
  }

  /***********************
   * ERC-721 View Methods
   ***********************
   */

  /**
   * Fetches the total balance of media owned by the specified owner on an instance of the Zora Media Contract
   * @param owner
   */
  public async fetchBalanceOf(owner: string): Promise<BigNumber> {
    return this.media.balanceOf(owner)
  }

  /**
   * Fetches the owner of the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchOwnerOf(mediaId: BigNumberish): Promise<string> {
    return this.media.ownerOf(mediaId)
  }

  /**
   * Fetches the mediaId of the specified owner by index on an instance of the Zora Media Contract
   * @param owner
   * @param index
   */
  public async fetchMediaOfOwnerByIndex(
    owner: string,
    index: BigNumberish
  ): Promise<BigNumber> {
    return this.media.tokenOfOwnerByIndex(owner, index)
  }

  /**
   * Fetches the total amount of non-burned media that has been minted on an instance of the Zora Media Contract
   */
  public async fetchTotalMedia(): Promise<BigNumber> {
    return this.media.totalSupply()
  }

  /**
   * Fetches the mediaId by index on an instance of the Zora Media Contract
   * @param index
   */
  public async fetchMediaByIndex(index: BigNumberish): Promise<BigNumber> {
    return this.media.tokenByIndex(index)
  }

  /**
   * Fetches the approved account for the specified media on an instance of the Zora Media Contract
   * @param mediaId
   */
  public async fetchApproved(mediaId: BigNumberish): Promise<string> {
    return this.media.getApproved(mediaId)
  }

  /**
   * Fetches if the specified operator is approved for all media owned by the specified owner on an instance of the Zora Media Contract
   * @param owner
   * @param operator
   */
  public async fetchIsApprovedForAll(owner: string, operator: string): Promise<boolean> {
    return this.media.isApprovedForAll(owner, operator)
  }

  /***********************
   * ERC-721 Write Methods
   ***********************
   */

  /**
   * Grants approval to the specified address for the specified media on an instance of the Zora Media Contract
   * @param to
   * @param mediaId
   */
  public async approve(to: string, mediaId: BigNumberish): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.approve(to, mediaId)
  }

  /**
   * Grants approval for all media owner by msg.sender on an instance of the Zora Media Contract
   * @param operator
   * @param approved
   */
  public async setApprovalForAll(
    operator: string,
    approved: boolean
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.setApprovalForAll(operator, approved)
  }

  /**
   * Transfers the specified media to the specified to address on an instance of the Zora Media Contract
   * @param from
   * @param to
   * @param mediaId
   */
  public async transferFrom(
    from: string,
    to: string,
    mediaId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.transferFrom(from, to, mediaId)
  }

  /**
   * Executes a SafeTransfer of the specified media to the specified address if and only if it adheres to the ERC721-Receiver Interface
   * @param from
   * @param to
   * @param mediaId
   */
  public async safeTransferFrom(
    from: string,
    to: string,
    mediaId: BigNumberish
  ): Promise<ContractTransaction> {
    try {
      this.ensureNotReadOnly()
    } catch (err) {
      return Promise.reject(err.message)
    }

    return this.media.safeTransferFrom(from, to, mediaId)
  }

  /******************
   * Private Methods
   ******************
   */

  /**
   * Throws an error if called on a readOnly == true instance of Zora Sdk
   * @private
   */
  private ensureNotReadOnly() {
    if (this.readOnly) {
      throw new Error(
        'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
      )
    }
  }
}
