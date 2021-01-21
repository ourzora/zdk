import { Ask, Bid, BidShares, Decimal, EIP712Signature, MediaData, Zora } from '../src'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { addresses as ZoraAddresses } from '../src/addresses'
import { ZoraConfiguredAddresses } from './helpers'
import { generatedWallets } from '@zoralabs/core/dist/utils'
import { Bytes, utils } from 'ethers'

describe('Zora', () => {
  describe('#constructor', () => {
    it('throws an error if a mediaAddress is specified but not a marketAddress', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zora(wallet, 4, '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401')
      }).toThrow(
        'Zora Constructor: mediaAddress and marketAddress must both be non-null or both be null'
      )
    })

    it('throws an error if the marketAddress is specified but not a mediaAddress', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zora(wallet, 4, '', '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401')
      }).toThrow(
        'Zora Constructor: mediaAddress and marketAddress must both be non-null or both be null'
      )
    })

    it('throws an error if one of the market or media addresses in not a valid ethereum address', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zora(
          wallet,
          4,
          'not a valid ethereum address',
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401'
        )
      }).toThrow('Invariant failed: not a valid ethereum address is not a valid address')

      expect(function () {
        new Zora(
          wallet,
          4,
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          'not a valid ethereum address'
        )
      }).toThrow('Invariant failed: not a valid ethereum address is not a valid address')
    })

    it('throws an error if the chainId does not map to a network with deployed instance of the Zora Protocol', () => {
      const wallet = Wallet.createRandom()

      expect(function () {
        new Zora(wallet, 50)
      }).toThrow(
        'Invariant failed: chainId 50 not officially supported by the Zora Protocol'
      )
    })

    it('throws an error if the chainId does not map to a network with deployed instance of the Zora Protocol', () => {
      const wallet = Wallet.createRandom()

      expect(function () {
        new Zora(
          wallet,
          50,
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
        )
      }).not.toThrow(
        'Invariant failed: chainId 50 not officially supported by the Zora Protocol'
      )
    })

    it('sets the Zora instance to readOnly = false if a signer is specified', () => {
      const wallet = Wallet.createRandom()

      const zora = new Zora(
        wallet,
        50,
        '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
      )
      expect(zora.readOnly).toBe(false)
    })

    it('sets the Zora instance to readOnly = true if a signer is specified', () => {
      const provider = new JsonRpcProvider()

      const zora = new Zora(
        provider,
        50,
        '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
      )
      expect(zora.readOnly).toBe(true)
    })

    it('initializes a Zora instance with the checksummed media and market address for the specified chainId', () => {
      const wallet = Wallet.createRandom()
      const rinkebyMediaAddress = ZoraAddresses['rinkeby'].media
      const rinkebyMarketAddress = ZoraAddresses['rinkeby'].market
      const zora = new Zora(wallet, 4)
      expect(zora.marketAddress).toBe(rinkebyMarketAddress)
      expect(zora.mediaAddress).toBe(rinkebyMediaAddress)
    })

    it('initializes a Zora instance with the specified media and market address if they are passed in', () => {
      const wallet = Wallet.createRandom()
      const mediaAddress = '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401'
      const marketAddress = '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'

      const zora = new Zora(wallet, 50, mediaAddress, marketAddress)
      expect(zora.readOnly).toBe(false)
      expect(zora.marketAddress).toBe(marketAddress)
      expect(zora.mediaAddress).toBe(mediaAddress)

      const zora1 = new Zora(wallet, 50, mediaAddress, marketAddress)
      expect(zora1.readOnly).toBe(false)
      expect(zora1.marketAddress).toBe(marketAddress)
      expect(zora1.mediaAddress).toBe(mediaAddress)
    })
  })

  describe('contract functions', () => {
    let zoraConfig: ZoraConfiguredAddresses
    let provider = new JsonRpcProvider()
    let [masterWallet, otherWallet] = generatedWallets(provider)
    //let masterWallet = generatedWallets(provider)[0]

    beforeAll(() => {
      zoraConfig = {
        market: '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        media: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
        currency: '',
      }
    })

    /******************
     * Write Functions
     ******************
     */

    describe('Write Functions', () => {
      let contentHex: string
      let contentHash: string
      let contentHashBytes: Bytes
      let metadataHex: string
      let metadataHash: string
      let metadataHashBytes: Bytes

      let defaultMediaData: MediaData
      let defaultBidShares: BidShares
      let defaultAsk: Ask
      let defaultBid: Bid
      let eipSig: EIP712Signature

      beforeEach(async () => {
        metadataHex = utils.formatBytes32String('{}')
        metadataHash = await utils.sha256(metadataHex)
        metadataHashBytes = utils.arrayify(metadataHash)

        contentHex = utils.formatBytes32String('invert')
        contentHash = await utils.sha256(contentHex)
        contentHashBytes = utils.arrayify(contentHash)

        defaultMediaData = {
          tokenURI: 'https://example.com',
          metadataURI: 'https://metadata.com',
          contentHash: contentHashBytes,
          metadataHash: metadataHashBytes,
        }

        defaultBidShares = {
          prevOwner: Decimal.new(10),
          owner: Decimal.new(80),
          creator: Decimal.new(10),
        }

        defaultAsk = {
          amount: 100,
          currency: '0x41A322b28D0fF354040e2CbC676F0320d8c8850d',
        }

        defaultBid = {
          amount: 100,
          currency: '0x41A322b28D0fF354040e2CbC676F0320d8c8850d',
          bidder: otherWallet.address,
          recipient: otherWallet.address,
          sellOnShare: Decimal.new(10),
        }

        eipSig = {
          deadline: 1000,
          v: 0,
          r: '0x00',
          s: '0x00',
        }
      })

      describe('#updateContentURI', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.updateContentURI(0, 'new uri')).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#updateMetadataURI', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.updateMetadataURI(0, 'new uri')).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#mint', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.mint(defaultMediaData, defaultBidShares)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('throws an error if bid shares do not sum to 100', async () => {
          const zora = new Zora(otherWallet, 50, zoraConfig.media, zoraConfig.market)
          const invalidBidShares = {
            prevOwner: Decimal.new(10),
            owner: Decimal.new(70),
            creator: Decimal.new(10),
          }
          expect(zora.readOnly).toBe(false)

          await expect(zora.mint(defaultMediaData, invalidBidShares)).rejects.toBe(
            'Invariant failed: The BidShares sum to 90000000000000000000, but they must sum to 100000000000000000000'
          )
        })

        it('throws an error if the tokenURI does not begin with `https://`', async () => {
          const zora = new Zora(otherWallet, 50, zoraConfig.media, zoraConfig.market)
          const invalidMediaData = {
            tokenURI: 'http://example.com',
            metadataURI: 'https://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zora.readOnly).toBe(false)

          await expect(zora.mint(invalidMediaData, defaultBidShares)).rejects.toBe(
            'Invariant failed: http://example.com must begin with `https://`'
          )
        })

        it('throws an error if the metadataURI does not begin with `https://`', async () => {
          const zora = new Zora(otherWallet, 50, zoraConfig.media, zoraConfig.market)
          const invalidMediaData = {
            tokenURI: 'https://example.com',
            metadataURI: 'http://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zora.readOnly).toBe(false)

          await expect(zora.mint(invalidMediaData, defaultBidShares)).rejects.toBe(
            'Invariant failed: http://metadata.com must begin with `https://`'
          )
        })
      })

      describe('#mintWithSig', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(
            zora.mintWithSig(
              otherWallet.address,
              defaultMediaData,
              defaultBidShares,
              eipSig
            )
          ).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('throws an error if bid shares do not sum to 100', async () => {
          const zora = new Zora(otherWallet, 50, zoraConfig.media, zoraConfig.market)
          const invalidBidShares = {
            prevOwner: Decimal.new(10),
            owner: Decimal.new(70),
            creator: Decimal.new(10),
          }
          expect(zora.readOnly).toBe(false)

          await expect(
            zora.mintWithSig(
              otherWallet.address,
              defaultMediaData,
              invalidBidShares,
              eipSig
            )
          ).rejects.toBe(
            'Invariant failed: The BidShares sum to 90000000000000000000, but they must sum to 100000000000000000000'
          )
        })

        it('throws an error if the tokenURI does not begin with `https://`', async () => {
          const zora = new Zora(otherWallet, 50, zoraConfig.media, zoraConfig.market)
          const invalidMediaData = {
            tokenURI: 'http://example.com',
            metadataURI: 'https://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zora.readOnly).toBe(false)

          await expect(
            zora.mintWithSig(
              otherWallet.address,
              invalidMediaData,
              defaultBidShares,
              eipSig
            )
          ).rejects.toBe(
            'Invariant failed: http://example.com must begin with `https://`'
          )
        })

        it('throws an error if the metadataURI does not begin with `https://`', async () => {
          const zora = new Zora(otherWallet, 50, zoraConfig.media, zoraConfig.market)
          const invalidMediaData = {
            tokenURI: 'https://example.com',
            metadataURI: 'http://metadata.com',
            contentHash: contentHashBytes,
            metadataHash: metadataHashBytes,
          }
          expect(zora.readOnly).toBe(false)

          await expect(zora.mint(invalidMediaData, defaultBidShares)).rejects.toBe(
            'Invariant failed: http://metadata.com must begin with `https://`'
          )
        })
      })

      describe('#setAsk', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.setAsk(0, defaultAsk)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#setBid', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.setBid(0, defaultBid)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#removeAsk', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.removeAsk(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#removeBid', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.removeBid(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#acceptBid', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.acceptBid(0, defaultBid)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#permit', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.permit(otherWallet.address, 0, eipSig)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#revokeApproval', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.revokeApproval(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#burn', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.burn(0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#approve', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.approve(otherWallet.address, 0)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#setApprovalForAll', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(zora.setApprovalForAll(otherWallet.address, true)).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#transferFrom', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(
            zora.transferFrom(masterWallet.address, otherWallet.address, 0)
          ).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })

      describe('#safeTransferFrom', () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          //expect.assertions(2)
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).toBe(true)

          await expect(
            zora.safeTransferFrom(masterWallet.address, otherWallet.address, 0)
          ).rejects.toBe(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })
      })
    })
  })
})
