import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
import { Ask, Bid, BidShares, EIP721Signature, MediaData, Zora } from '../src/index'
import { ethers, Wallet, Bytes } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import { addresses as ZoraAddresses } from '../src/addresses'
import { ZoraConfiguredAddresses } from './helpers'
import { generatedWallets } from '@zoralabs/core/dist/utils'
import spies from 'chai-spies'
import { MarketFactory, MediaFactory } from '@zoralabs/core/dist/typechain'
import Decimal from '@zoralabs/core/dist/utils/Decimal'
import { sha256 } from 'ethers/lib/utils'

chai.use(asPromised)
chai.use(spies)

describe('Zora', async () => {
  describe('#constructor', async () => {
    it('throws an error if a mediaAddress is specified but not a marketAddress', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zora(wallet, 4, '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401')
      }).to.throw(
        'Zora Constructor: mediaAddress and marketAddress must both be non-null or both be null'
      )
    })

    it('throws an error if the marketAddress is specified but not a mediaAddress', () => {
      const wallet = Wallet.createRandom()
      expect(function () {
        new Zora(wallet, 4, '', '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401')
      }).to.throw(
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
      }).to.throw('Invariant failed: not a valid ethereum address is not a valid address')

      expect(function () {
        new Zora(
          wallet,
          4,
          '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          'not a valid ethereum address'
        )
      }).to.throw('Invariant failed: not a valid ethereum address is not a valid address')
    })

    it('throws an error if the chainId does not map to a network with deployed instance of the Zora Protocol', () => {
      const wallet = Wallet.createRandom()

      expect(function () {
        new Zora(wallet, 50)
      }).to.throw(
        'Invariant failed: chainId 50 not officially supported by the Zora Protocol'
      )
    })

    it('does not throw an error if an unsupported chainId is specified, but mediaAddress and marketAddress are both specified', () => {
      it('throws an error if the chainId does not map to a network with deployed instance of the Zora Protocol', () => {
        const wallet = Wallet.createRandom()

        expect(function () {
          new Zora(
            wallet,
            50,
            '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
            '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
          )
        }).to.not.throw(
          'Invariant failed: chainId 50 not officially supported by the Zora Protocol'
        )
      })
    })

    it('sets the Zora instance to readOnly = false if a signer is specified', () => {
      const wallet = Wallet.createRandom()

      const zora = new Zora(
        wallet,
        50,
        '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
      )
      expect(zora.readOnly).eq(false)
    })

    it('sets the Zora instance to readOnly = true if a signer is specified', () => {
      const provider = new JsonRpcProvider()

      const zora = new Zora(
        provider,
        50,
        '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'
      )
      expect(zora.readOnly).eq(true)
    })

    it('initializes a Zora instance with the checksummed media and market address for the specified chainId', () => {
      const wallet = Wallet.createRandom()
      const rinkebyMediaAddress = ZoraAddresses['rinkeby'].media
      const rinkebyMarketAddress = ZoraAddresses['rinkeby'].market
      const zora = new Zora(wallet, 4)
      expect(zora.marketAddress).eq(rinkebyMarketAddress)
      expect(zora.mediaAddress).eq(rinkebyMediaAddress)
    })

    it('initializes a Zora instance with the specified media and market address if they are passed in', () => {
      const wallet = Wallet.createRandom()
      const mediaAddress = '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401'
      const marketAddress = '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48'

      const zora = new Zora(wallet, 50, mediaAddress, marketAddress)
      expect(zora.readOnly).eq(false)
      expect(zora.marketAddress).eq(marketAddress)
      expect(zora.mediaAddress).eq(mediaAddress)

      const zora1 = new Zora(
        wallet,
        50,
        mediaAddress.toLowerCase(),
        marketAddress.toLowerCase()
      )
      expect(zora1.readOnly).eq(false)
      expect(zora1.marketAddress).eq(marketAddress)
      expect(zora1.mediaAddress).eq(mediaAddress)
    })
  })

  describe('contract functions', async () => {
    let zoraConfig: ZoraConfiguredAddresses
    let provider = new JsonRpcProvider()
    //let blockchain = new Blockchain(provider)
    let [masterWallet, otherWallet] = generatedWallets(provider)

    before(async () => {
      chai.spy.on(MediaFactory, 'connect', async () => {})
      chai.spy.on(MarketFactory, 'connect', async () => {})
      zoraConfig = {
        market: '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
        media: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
        currency: '',
      }
    })

    /*****************
     * View Functions
     ****************
     */

    describe('View Functions', async () => {
      describe('#fetchContentHash', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenContentHashes'], async () => {})

          await zora.fetchContentHash(0)
          expect(zora.media.tokenContentHashes).to.have.been.called.with(0)
        })
      })

      describe('#fetchMetadataHash', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenMetadataHashes'], async () => {})

          await zora.fetchMetadataHash(0)
          expect(zora.media.tokenMetadataHashes).to.have.been.called.with(0)
        })
      })

      describe('#fetchContentURI', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenURI'], async () => {})

          await zora.fetchContentURI(0)
          expect(zora.media.tokenURI).to.have.been.called.with(0)
        })
      })

      describe('#fetchMetadataURI', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenMetadataURI'], async () => {})

          await zora.fetchMetadataURI(0)
          expect(zora.media.tokenMetadataURI).to.have.been.called.with(0)
        })
      })

      describe('#fetchCreator', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenCreators'], async () => {})

          await zora.fetchCreator(0)
          expect(zora.media.tokenCreators).to.have.been.called.with(0)
        })
      })

      describe('#fetchCurrentBidShares', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.market, ['bidSharesForToken'], async () => {})

          await zora.fetchCurrentBidShares(0)
          expect(zora.market.bidSharesForToken).to.have.been.called.with(0)
        })
      })

      describe('#fetchCurrentAsk', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.market, ['currentAskForToken'], async () => {})

          await zora.fetchCurrentAsk(0)
          expect(zora.market.currentAskForToken).to.have.been.called.with(0)
        })
      })

      describe('#fetchCurrentBidForBidder', async () => {
        it('calls the typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.market, ['bidForTokenBidder'], async () => {})

          await zora.fetchCurrentBidForBidder(0, masterWallet.address)
          expect(zora.market.bidForTokenBidder).to.have.been.called.with(
            0,
            masterWallet.address
          )
        })
      })
    })

    /******************
     * Write Functions
     ******************
     */

    describe('Write Functions', async () => {
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
      let eipSig: EIP721Signature

      before(async () => {
        metadataHex = ethers.utils.formatBytes32String('{}')
        metadataHash = await sha256(metadataHex)
        metadataHashBytes = ethers.utils.arrayify(metadataHash)

        contentHex = ethers.utils.formatBytes32String('invert')
        contentHash = await sha256(contentHex)
        contentHashBytes = ethers.utils.arrayify(contentHash)

        defaultMediaData = {
          tokenURI: 'example.com',
          metadataURI: 'metadata.com',
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
          v: '0x00',
          r: '0x00',
          s: '0x00',
        }
      })

      describe('#updateContentURI', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.updateContentURI(0, 'new uri')).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['updateTokenURI'], async () => {})

          await zora.updateContentURI(0, 'blah blah')
          expect(zora.media.updateTokenURI).to.have.been.called.with(0, 'blah blah')
        })
      })

      describe('#updateMetadataURI', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.updateMetadataURI(0, 'new uri')).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['updateTokenMetadataURI'], async () => {})

          await zora.updateMetadataURI(0, 'blah blah')
          expect(zora.media.updateTokenMetadataURI).to.have.been.called.with(
            0,
            'blah blah'
          )
        })
      })

      describe('#mint', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.mint(defaultMediaData, defaultBidShares)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['mint'], async () => {})

          await zora.mint(defaultMediaData, defaultBidShares)
          expect(zora.media.mint).to.have.been.called.with(
            defaultMediaData,
            defaultBidShares
          )
        })
      })

      describe('#mintWithSig', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(
            zora.mintWithSig(
              otherWallet.address,
              defaultMediaData,
              defaultBidShares,
              eipSig
            )
          ).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['mintWithSig'], async () => {})

          await zora.mintWithSig(
            otherWallet.address,
            defaultMediaData,
            defaultBidShares,
            eipSig
          )
          expect(zora.media.mintWithSig).to.have.been.called.with(
            otherWallet.address,
            defaultMediaData,
            defaultBidShares,
            eipSig
          )
        })
      })

      describe('#setAsk', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.setAsk(0, defaultAsk)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['setAsk'], async () => {})

          await zora.setAsk(0, defaultAsk)
          expect(zora.media.setAsk).to.have.been.called.with(0, defaultAsk)
        })
      })

      describe('#setBid', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.setBid(0, defaultBid)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['setBid'], async () => {})

          await zora.setBid(0, defaultBid)
          expect(zora.media.setBid).to.have.been.called.with(0, defaultBid)
        })
      })

      describe('#removeAsk', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.removeAsk(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['removeAsk'], async () => {})

          await zora.removeAsk(0)
          expect(zora.media.removeAsk).to.have.been.called.with(0)
        })
      })

      describe('#removeBid', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.removeBid(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['removeBid'], async () => {})

          await zora.removeBid(0)
          expect(zora.media.removeBid).to.have.been.called.with(0)
        })
      })

      describe('#acceptBid', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.acceptBid(0, defaultBid)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['acceptBid'], async () => {})

          await zora.acceptBid(0, defaultBid)
          expect(zora.media.acceptBid).to.have.been.called.with(0, defaultBid)
        })
      })

      describe('#permit', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.permit(otherWallet.address, 0, eipSig)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['permit'], async () => {})

          await zora.permit(otherWallet.address, 0, eipSig)
          expect(zora.media.permit).to.have.been.called.with(
            otherWallet.address,
            0,
            eipSig
          )
        })
      })

      describe('#revokeApproval', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.revokeApproval(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['revokeApproval'], async () => {})

          await zora.revokeApproval(0)
          expect(zora.media.revokeApproval).to.have.been.called.with(0)
        })
      })

      describe('#burn', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.burn(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['burn'], async () => {})

          await zora.burn(0)
          expect(zora.media.burn).to.have.been.called.with(0)
        })
      })

      describe('#fetchBalanceOf', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.fetchBalanceOf(masterWallet.address)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['balanceOf'], async () => {})

          await zora.fetchBalanceOf(masterWallet.address)
          expect(zora.media.balanceOf).to.have.been.called.with(masterWallet.address)
        })
      })

      describe('#fetchOwnerOf', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.fetchOwnerOf(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['ownerOf'], async () => {})

          await zora.fetchOwnerOf(0)
          expect(zora.media.ownerOf).to.have.been.called.with(0)
        })
      })

      describe('#fetchMediaOfOwnerByIndex', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(
            zora.fetchMediaOfOwnerByIndex(masterWallet.address, 0)
          ).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenOfOwnerByIndex'], async () => {})

          await zora.fetchMediaOfOwnerByIndex(masterWallet.address, 0)
          expect(zora.media.tokenOfOwnerByIndex).to.have.been.called.with(
            masterWallet.address,
            0
          )
        })
      })

      describe('#fetchTotalMedia', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.fetchTotalMedia()).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['totalSupply'], async () => {})

          await zora.fetchTotalMedia()
          expect(zora.media.totalSupply).to.have.been.called
        })
      })

      describe('#fetchMediaByIndex', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.fetchMediaByIndex(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['tokenByIndex'], async () => {})

          await zora.fetchMediaByIndex(0)
          expect(zora.media.tokenByIndex).to.have.been.called.with(0)
        })
      })

      describe('#fetchApproved', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.fetchApproved(0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['getApproved'], async () => {})

          await zora.fetchApproved(0)
          expect(zora.media.getApproved).to.have.been.called.with(0)
        })
      })

      describe('#fetchIsApprovedForAll', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(
            zora.fetchIsApprovedForAll(masterWallet.address, otherWallet.address)
          ).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['isApprovedForAll'], async () => {})

          await zora.fetchIsApprovedForAll(masterWallet.address, otherWallet.address)
          expect(zora.media.isApprovedForAll).to.have.been.called.with(
            masterWallet.address,
            otherWallet.address
          )
        })
      })

      describe('#approve', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(zora.approve(otherWallet.address, 0)).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['approve'], async () => {})

          await zora.approve(otherWallet.address, 0)
          expect(zora.media.approve).to.have.been.called.with(otherWallet.address, 0)
        })
      })

      describe('#setApprovalForAll', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(
            zora.setApprovalForAll(otherWallet.address, true)
          ).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['setApprovalForAll'], async () => {})

          await zora.setApprovalForAll(otherWallet.address, true)
          expect(zora.media.setApprovalForAll).to.have.been.called.with(
            otherWallet.address,
            true
          )
        })
      })

      describe('#transferFrom', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(
            zora.transferFrom(masterWallet.address, otherWallet.address, 0)
          ).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['transferFrom'], async () => {})

          await zora.transferFrom(masterWallet.address, otherWallet.address, 0)
          expect(zora.media.transferFrom).to.have.been.called.with(
            masterWallet.address,
            otherWallet.address,
            0
          )
        })
      })

      describe('#safeTransferFrom', async () => {
        it('throws an error if called on a readOnly Zora instance', async () => {
          const provider = new JsonRpcProvider()

          const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
          expect(zora.readOnly).eq(true)

          expect(
            zora.safeTransferFrom(masterWallet.address, otherWallet.address, 0)
          ).eventually.rejectedWith(
            'ensureNotReadOnly: readOnly Zora instance cannot call contract methods that require a signer.'
          )
        })

        it('calls the correct typechain function', async () => {
          const zora = new Zora(masterWallet, 50, zoraConfig.media, zoraConfig.market)
          chai.spy.on(zora.media, ['safeTransferFrom'], async () => {})

          await zora.safeTransferFrom(masterWallet.address, otherWallet.address, 0)
          expect(zora.media.safeTransferFrom).to.have.been.called.with(
            masterWallet.address,
            otherWallet.address,
            0
          )
        })
      })
    })
  })
})
