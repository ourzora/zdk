import {
  approveERC20,
  constructAsk,
  constructBid,
  constructBidShares,
  constructMediaData,
  isMediaDataVerified,
  isURIHashVerified,
  recoverSignatureFromMintWithSig,
  recoverSignatureFromPermit,
  sha256FromBuffer,
  sha256FromHexString,
  signMintWithSigMessage,
  signPermitMessage,
  stripHexPrefix,
  validateBidShares,
  validateBytes32,
  validateURI,
  wrapETH,
  unwrapWETH,
} from '../src/utils'
import { promises as fs } from 'fs'
import { Decimal, Zora } from '../src'
import { Blockchain, generatedWallets } from '@zoralabs/core/dist/utils'
import { JsonRpcProvider } from '@ethersproject/providers'
import { mintCurrency, setupZora, ZoraConfiguredAddresses } from './helpers'
import { BaseErc20Factory } from '@zoralabs/core/dist/typechain'
import { BigNumber } from '@ethersproject/bignumber'
import { MaxUint256 } from '@ethersproject/constants'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import wethContractDetails from './artifacts/weth/abi.json'
import { ethers } from 'ethers'

jest.setTimeout(1000000)

describe('Utils', () => {
  let hash: string
  let kanyeHash: string
  let defaultTokenURI: string
  let defaultMetadataURI: string

  let provider = new JsonRpcProvider()
  let blockchain = new Blockchain(provider)

  beforeAll(() => {
    hash = '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    kanyeHash = '0xe5dc4ed07fa1a3464d618a5d52a983880bb908b99ffff479eb7ebb7f7b11dabb'
    defaultTokenURI = 'https://example.com'
    defaultMetadataURI = 'https://metadata.com'
  })

  beforeEach(async () => {
    await blockchain.resetAsync()
  })

  describe('Hashing Utilities', () => {
    describe('#sha256FromBuffer', () => {
      it('it properly hashes from buffer', async () => {
        const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
        expect(sha256FromBuffer(kanyeBuf)).toBe(kanyeHash)
      })
    })

    describe('#sha256FromHexString', () => {
      it('it properly hashes from hex string', async () => {
        const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
        const hexString = '0x'.concat(kanyeBuf.toString('hex'))
        expect(sha256FromHexString(hexString)).toBe(kanyeHash)
      })

      it('raises if the hex string is invalid', async () => {
        const invalidHex = '0x23kbrkjfshldkjfh34zazanzanwbq'
        expect(() => {
          sha256FromHexString(invalidHex)
        }).toThrow(`${invalidHex} is not valid 0x prefixed hex`)
      })
    })
  })

  describe('Type Constructors', () => {
    let contentHash: string
    let metadataHash: string

    beforeAll(() => {
      contentHash = sha256FromBuffer(Buffer.from('some content'))
      metadataHash = sha256FromBuffer(Buffer.from('some metadata'))
    })
    describe('#constructMediaData', () => {
      it('creates MediaData', () => {
        const media = constructMediaData(
          defaultTokenURI,
          defaultMetadataURI,
          contentHash,
          metadataHash
        )
        expect(media.tokenURI).toBe(defaultTokenURI)
        expect(media.metadataURI).toBe(defaultMetadataURI)
        expect(media.contentHash).toBe(contentHash)
        expect(media.metadataHash).toBe(metadataHash)
      })

      it('raises if the content hash is hexstring greater than 32 bytes', () => {
        expect(() => {
          constructMediaData(
            defaultTokenURI,
            defaultMetadataURI,
            contentHash.concat('zmxnx'),
            metadataHash.concat('42n3jk')
          )
        }).toThrow(
          `Invariant failed: ${contentHash.concat(
            'zmxnx'
          )} is not a 0x prefixed 32 bytes hex string`
        )
      })

      it('raises if the content hash is hexstring less than 32 bytes', () => {
        expect(() => {
          constructMediaData(
            defaultTokenURI,
            defaultMetadataURI,
            contentHash.substr(0, 62),
            metadataHash
          )
        }).toThrow(
          `Invariant failed: ${contentHash.substr(
            0,
            62
          )} is not a 0x prefixed 32 bytes hex string`
        )
      })

      it('raises if the content hash is byte array less than 32 bytes', () => {
        const badContentHash = Uint8Array.from(Buffer.from(contentHash.substr(0, 62)))
        expect(() => {
          constructMediaData(
            defaultTokenURI,
            defaultMetadataURI,
            badContentHash,
            metadataHash
          )
        }).toThrow(`value is not a length 32 byte array`)
      })

      it('raises if the content hash is byte array greater than 32 bytes', () => {
        const badContentHash = Uint8Array.from(Buffer.from(contentHash.concat('87cz')))
        expect(() => {
          constructMediaData(
            defaultTokenURI,
            defaultMetadataURI,
            badContentHash,
            metadataHash
          )
        }).toThrow(`value is not a length 32 byte array`)
      })

      it('raises if metadataURI does not begin with `https://`', () => {
        expect(() => {
          constructMediaData(
            'https://example.com',
            'some metadata uri',
            contentHash,
            metadataHash
          )
        }).toThrow(`Invariant failed: some metadata uri must begin with \`https://\``)
      })

      it('raises if contentURI does not begin with `https://`', () => {
        expect(() => {
          constructMediaData(
            'some content uri',
            'https://metadata.com',
            contentHash,
            metadataHash
          )
        }).toThrow(`Invariant failed: some content uri must begin with \`https://\``)
      })
    })

    describe('#constructBidShares', () => {
      it('it raises if the BidShares do not exactly sum to 100 with 18 decimals', () => {
        expect(() => {
          constructBidShares(25, 24.44445, 50.55555)
        }).toThrow(
          `The BidShares sum to 99999900000000000000, but they must sum to 100000000000000000000`
        )
      })

      it('it fixes 4 decimal points of precision', () => {
        const bidShares = constructBidShares(25, 24.44455, 50.5555)
        expect(bidShares.owner.value.toString()).toBe(
          Decimal.new(24.4445).value.toString()
        )
      })

      it('it rounds up to the 4th decimal point of precision', () => {
        const bidShares = constructBidShares(25, 24.44449, 50.5555)
        expect(bidShares.owner.value.toString()).toBe(
          Decimal.new(24.4445).value.toString()
        )
      })
    })

    describe('#constructAsk', () => {
      const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      const decimal100 = Decimal.new(100)

      it('creates an ask', () => {
        const ask = constructAsk(dai, decimal100.value)
        expect(ask.currency.toLowerCase()).toBe(dai.toLowerCase())
        expect(ask.amount.toString()).toBe(decimal100.value.toString())
      })

      it('raises if an invalid currency address is specified', () => {
        expect(() => {
          constructAsk(dai.substr(0, 38), decimal100.value)
        }).toThrow(`${dai.substr(0, 38)} is not a valid address.`)
      })
    })

    describe('#constructBid', () => {
      const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
      const decimal100 = Decimal.new(100)
      const bidder = '0xf13090cC20613BF9b5F0b3E6E83CCAdB5Cd0FbD5'

      it('creates a Bid', () => {
        const bid = constructBid(dai, decimal100.value, bidder, bidder, 10)
        expect(bid.currency.toLowerCase()).toBe(dai.toLowerCase())
        expect(bid.amount.toString()).toBe(decimal100.value.toString())
        expect(bid.bidder.toLowerCase()).toBe(bidder.toLowerCase())
        expect(bid.recipient.toLowerCase()).toBe(bidder.toLowerCase())
        expect(bid.sellOnShare.value.toString()).toBe(Decimal.new(10).value.toString())
      })

      it('it fixes the sell on share precision to 4 decimal places', () => {
        const bid = constructBid(dai, decimal100.value, bidder, bidder, 10.1111111111)
        expect(bid.sellOnShare.value.toString()).toBe(
          Decimal.new(10.1111).value.toString()
        )
      })

      it('rounds up to the 4th decimal place of the sell on share', () => {
        const bid = constructBid(dai, decimal100.value, bidder, bidder, 10.11119999)
        expect(bid.sellOnShare.value.toString()).toBe(
          Decimal.new(10.1112).value.toString()
        )
      })

      it('raises if an invalid currency address is specified', () => {
        expect(() => {
          constructBid(dai.substr(0, 38), decimal100.value, bidder, bidder, 10)
        }).toThrow(
          `Currency address is invalid: Invariant failed: ${dai.substr(
            0,
            38
          )} is not a valid address.`
        )
      })

      it('raises if an invalid bidder address is specified', () => {
        expect(() => {
          constructBid(dai, decimal100.value, bidder.substr(0, 10), bidder, 10)
        }).toThrow(
          `Bidder address is invalid: Invariant failed: ${bidder.substr(
            0,
            10
          )} is not a valid address.`
        )
      })

      it('raises if an invalid recipient address is specified', () => {
        expect(() => {
          constructBid(dai, decimal100.value, bidder, bidder.substr(0, 10), 10)
        }).toThrow(
          `Recipient address is invalid: Invariant failed: ${bidder.substr(
            0,
            10
          )} is not a valid address.`
        )
      })
    })
  })

  describe('#validateBytes32', () => {
    it('returns when exactly 32 bytes are passed', async () => {
      const sha256 = await sha256FromHexString('0x7a6f7261')
      expect(() => {
        validateBytes32(Buffer.from(stripHexPrefix(sha256), 'hex'))
      }).not.toThrow()
    })

    it('raises when more than 32 bytes are passed', () => {
      const buf = Buffer.from(
        stripHexPrefix(
          'b3c06ba3db658c3fe9e4530d033c102c556ff25166a0fc442cf6a1ced025022fab434b'
        ),
        'hex'
      )
      expect(() => {
        validateBytes32(buf)
      }).toThrow('value is not a length 32 byte array')
    })

    it('raises when less than 32 bytes are passed', () => {
      const buf = Buffer.from(
        stripHexPrefix('b3c06ba3db658c3fe9e4530d033c102c556ff25166a0fc442cf'),
        'hex'
      )
      expect(() => {
        validateBytes32(buf)
      }).toThrow('value is not a length 32 byte array')
    })

    it('returns when a valid hex string of length 32 bytes is passed', () => {
      const validHex =
        '0xb3c06ba3db658c3fe9e4530d033c102c556ff25166a0fc442cf6a1ced025022f'
      expect(() => {
        validateBytes32(validHex)
      }).not.toThrow(
        `Invariant failed: ${validHex} is not a 0x prefixed 32 bytes hex string`
      )
    })

    it('raises when a hex string without a 0x prefix is passed', () => {
      const nonPrefixedHex =
        'b3c06ba3db658c3fe9e4530d033c102c556ff25166a0fc442cf6a1ced025022f'
      expect(() => {
        validateBytes32(nonPrefixedHex)
      }).toThrow(
        `Invariant failed: ${nonPrefixedHex} is not a 0x prefixed 32 bytes hex string`
      )
    })

    it('raises when a hex string greater than 32 bytes characters is passed', () => {
      const tooLargeHex =
        '0xb3c06ba3db658c3fe9e4530d033c102c556ff25166a0fc442cf6a1ced025022fab434b'
      expect(() => {
        validateBytes32(tooLargeHex)
      }).toThrow(
        `Invariant failed: ${tooLargeHex} is not a 0x prefixed 32 bytes hex string`
      )
    })

    it('raises when a hex string less than 32 bytes is passed', () => {
      const tooSmallHex = 'b3c06ba3db658c3fe9e4530d033c102c556ff25166a0fc442cf6a1ced02502'
      expect(() => {
        validateBytes32(tooSmallHex)
      }).toThrow(
        `Invariant failed: ${tooSmallHex} is not a 0x prefixed 32 bytes hex string`
      )
    })
  })

  describe('#validateURI', () => {
    it('raises if a uri is passed without an `https://` prefix', () => {
      const invalidURI = 'http://example.com'
      expect(() => {
        validateURI(invalidURI)
      }).toThrow('Invariant failed: http://example.com must begin with `https://`')
    })

    it('does not raise if a uri is passed with an `https://` prefix', () => {
      const invalidURI = 'https://example.com'
      expect(() => {
        validateURI(invalidURI)
      }).not.toThrow()
    })
  })

  describe('#validateBidShares', () => {
    it('raises if the bid shares do no sum to `Decimal.new(100).value`', () => {
      const invalidBidShares = {
        prevOwner: Decimal.new(10),
        owner: Decimal.new(70),
        creator: Decimal.new(10),
      }
      expect(() => {
        validateBidShares(
          invalidBidShares.creator,
          invalidBidShares.owner,
          invalidBidShares.prevOwner
        )
      }).toThrow(
        'Invariant failed: The BidShares sum to 90000000000000000000, but they must sum to 100000000000000000000'
      )
    })

    it('does not raise if the bid shares sum to `Decimal.new(100).value', () => {
      const invalidBidShares = {
        prevOwner: Decimal.new(10),
        owner: Decimal.new(80),
        creator: Decimal.new(10),
      }
      expect(() => {
        validateBidShares(
          invalidBidShares.creator,
          invalidBidShares.owner,
          invalidBidShares.prevOwner
        )
      }).not.toThrow()
    })
  })

  describe('#stripHexPrefix', () => {
    let prefixed: string
    let nonPrefixed: string
    beforeAll(() => {
      prefixed = '0x18916e1a2933Cb349145A280473A5DE8EB6630cb'
      nonPrefixed = '18916e1a2933Cb349145A280473A5DE8EB6630cb'
    })
    it('returns the string without a 0x prefix', () => {
      const result = stripHexPrefix(prefixed)
      expect(result).toEqual(nonPrefixed)
    })

    it('returns the string if no 0x prefix exists', () => {
      const result = stripHexPrefix(nonPrefixed)
      expect(result).toEqual(nonPrefixed)
    })
  })

  describe('EIP-712 Utilities', () => {
    describe('#signPermitMessage', () => {
      let zoraConfig: ZoraConfiguredAddresses

      beforeAll(() => {
        zoraConfig = {
          market: '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          media: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
          currency: '',
        }
      })

      it('signs the message correctly', async () => {
        const provider = new JsonRpcProvider()
        const [mainWallet, otherWallet] = generatedWallets(provider)
        const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
        const domain = zora.eip712Domain()
        const eipSig = await signPermitMessage(
          mainWallet,
          otherWallet.address,
          1,
          1,
          deadline,
          domain
        )

        const recovered = await recoverSignatureFromPermit(
          otherWallet.address,
          1,
          1,
          deadline,
          domain,
          eipSig
        )

        expect(recovered.toLowerCase()).toBe(mainWallet.address.toLowerCase())
      })

      it('signs a permit message that is able to be processed on chain', async () => {
        const provider = new JsonRpcProvider()
        const [mainWallet, otherWallet] = generatedWallets(provider)
        const onChainConfig = await setupZora(mainWallet, [otherWallet])
        const mainZora = new Zora(
          mainWallet,
          50,
          onChainConfig.media,
          onChainConfig.market
        )
        const contentHash = sha256FromBuffer(Buffer.from('some content'))
        const metadataHash = sha256FromBuffer(Buffer.from('some metadata'))

        const mediaData = constructMediaData(
          'https://token.com',
          'https://metadata.com',
          contentHash,
          metadataHash
        )
        const bidShares = constructBidShares(10, 90, 0)
        await mainZora.mint(mediaData, bidShares)

        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
        const domain = mainZora.eip712Domain()
        const eipSig = await signPermitMessage(
          mainWallet,
          otherWallet.address,
          0,
          0,
          deadline,
          domain
        )

        const otherZora = new Zora(
          mainWallet,
          50,
          onChainConfig.media,
          onChainConfig.market
        )
        await otherZora.permit(otherWallet.address, 0, eipSig)
        const approved = await otherZora.fetchApproved(0)
        expect(approved.toLowerCase()).toBe(otherWallet.address.toLowerCase())
      })
    })

    describe('#recoverSignatureFromPermit', () => {
      let zoraConfig: ZoraConfiguredAddresses

      beforeAll(() => {
        zoraConfig = {
          market: '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          media: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
          currency: '',
        }
      })

      it('returns a different recovered address if the message is different', async () => {
        const provider = new JsonRpcProvider()
        const [mainWallet, otherWallet] = generatedWallets(provider)
        const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
        const domain = zora.eip712Domain()
        const eipSig = await signPermitMessage(
          mainWallet,
          otherWallet.address,
          1,
          1,
          deadline,
          domain
        )

        const recovered = await recoverSignatureFromPermit(
          otherWallet.address,
          1,
          0,
          deadline,
          domain,
          eipSig
        )

        expect(recovered.toLowerCase()).not.toBe(mainWallet.address.toLowerCase())
      })
    })

    describe('#signMintWithSig', () => {
      let zoraConfig: ZoraConfiguredAddresses

      beforeAll(() => {
        zoraConfig = {
          market: '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          media: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
          currency: '',
        }
      })

      it('signs the message correctly', async () => {
        const provider = new JsonRpcProvider()
        const [mainWallet] = generatedWallets(provider)
        const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
        const domain = zora.eip712Domain()
        const contentHash = sha256FromBuffer(Buffer.from('some content'))
        const metadataHash = sha256FromBuffer(Buffer.from('some metadata'))

        const eipSig = await signMintWithSigMessage(
          mainWallet,
          contentHash,
          metadataHash,
          Decimal.new(10).value,
          1,
          deadline,
          domain
        )

        const recovered = await recoverSignatureFromMintWithSig(
          contentHash,
          metadataHash,
          Decimal.new(10).value,
          1,
          deadline,
          domain,
          eipSig
        )

        expect(recovered.toLowerCase()).toBe(mainWallet.address.toLowerCase())
      })

      it('signs a mintWithSig message that is able to be processed on chain', async () => {
        const [mainWallet, otherWallet] = generatedWallets(provider)
        const onChainConfig = await setupZora(mainWallet, [otherWallet])
        const otherZora = new Zora(
          otherWallet,
          50,
          onChainConfig.media,
          onChainConfig.market
        )
        const contentHash = sha256FromBuffer(Buffer.from('some content'))
        const metadataHash = sha256FromBuffer(Buffer.from('some metadata'))
        const contentURI = 'https://token.com'
        const metadataURI = 'https://metadata.com'

        const mediaData = constructMediaData(
          contentURI,
          metadataURI,
          contentHash,
          metadataHash
        )
        const bidShares = constructBidShares(10, 90, 0)
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
        const domain = otherZora.eip712Domain()
        const nonce = await otherZora.fetchMintWithSigNonce(mainWallet.address)
        const eipSig = await signMintWithSigMessage(
          mainWallet,
          contentHash,
          metadataHash,
          Decimal.new(10).value,
          nonce.toNumber(),
          deadline,
          domain
        )

        await otherZora.mintWithSig(mainWallet.address, mediaData, bidShares, eipSig)
        const owner = await otherZora.fetchOwnerOf(0)
        const creator = await otherZora.fetchCreator(0)
        const onChainContentHash = await otherZora.fetchContentHash(0)
        const onChainMetadataHash = await otherZora.fetchMetadataHash(0)

        const onChainBidShares = await otherZora.fetchCurrentBidShares(0)
        const onChainContentURI = await otherZora.fetchContentURI(0)
        const onChainMetadataURI = await otherZora.fetchMetadataURI(0)

        expect(owner.toLowerCase()).toBe(mainWallet.address.toLowerCase())
        expect(creator.toLowerCase()).toBe(mainWallet.address.toLowerCase())
        expect(onChainContentHash).toBe(contentHash)
        expect(onChainContentURI).toBe(contentURI)
        expect(onChainMetadataURI).toBe(metadataURI)
        expect(onChainMetadataHash).toBe(metadataHash)
        expect(onChainBidShares.creator.value).toEqual(bidShares.creator.value)
        expect(onChainBidShares.owner.value).toEqual(bidShares.owner.value)
        expect(onChainBidShares.prevOwner.value).toEqual(bidShares.prevOwner.value)
      })
    })

    describe('#recoverSignatureFromMintWithSig', () => {
      let zoraConfig: ZoraConfiguredAddresses

      beforeAll(() => {
        zoraConfig = {
          market: '0x1D7022f5B17d2F8B695918FB48fa1089C9f85401',
          media: '0x1dC4c1cEFEF38a777b15aA20260a54E584b16C48',
          currency: '',
        }
      })

      it('returns a different recovered address if the message is different', async () => {
        const provider = new JsonRpcProvider()
        const [mainWallet] = generatedWallets(provider)
        const zora = new Zora(provider, 50, zoraConfig.media, zoraConfig.market)
        const deadline = Math.floor(new Date().getTime() / 1000) + 60 * 60 * 24 // 24 hours
        const domain = zora.eip712Domain()

        const contentHash = sha256FromBuffer(Buffer.from('some content'))
        const metadataHash = sha256FromBuffer(Buffer.from('some metadata'))

        const eipSig = await signMintWithSigMessage(
          mainWallet,
          contentHash,
          metadataHash,
          Decimal.new(10).value,
          1,
          deadline,
          domain
        )

        const recovered = await recoverSignatureFromMintWithSig(
          contentHash,
          metadataHash,
          Decimal.new(10).value,
          2,
          deadline,
          domain,
          eipSig
        )

        expect(recovered.toLowerCase()).not.toBe(mainWallet.address.toLowerCase())
      })
    })
  })

  describe('Miscellaneous', () => {
    describe('approveERC20', () => {
      it('approves an erc20', async () => {
        const [wallet, otherWallet, approvedWallet] = generatedWallets(provider)
        const currency = await (
          await new BaseErc20Factory(wallet).deploy('TEST', 'TEST', BigNumber.from(18))
        ).deployed()
        const currencyAddress = currency.address

        await mintCurrency(
          wallet,
          currencyAddress,
          otherWallet.address,
          BigNumber.from('10000000000000000000000')
        )

        await approveERC20(
          otherWallet,
          currencyAddress,
          approvedWallet.address,
          MaxUint256
        )

        const allowance = await BaseErc20Factory.connect(
          currencyAddress,
          wallet
        ).allowance(otherWallet.address, approvedWallet.address)
        expect(allowance).toEqual(MaxUint256)
      })
    })

    describe('#isURIHashVerified', () => {
      it('returns true if the uriHash does match the expectedHash string', async () => {
        const mock = new MockAdapter(axios)
        const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
        const kanyeURI =
          'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

        mock.onGet(kanyeURI).reply(200, kanyeBuf)
        const verified = await isURIHashVerified(kanyeURI, kanyeHash)
        expect(verified).toEqual(true)
      })

      it('returns true if the uriHash does match the expectedHash byte array', async () => {
        const mock = new MockAdapter(axios)
        const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
        const kanyeURI =
          'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

        mock.onGet(kanyeURI).reply(200, kanyeBuf)
        const verified = await isURIHashVerified(
          kanyeURI,
          Buffer.from(stripHexPrefix(kanyeHash), 'hex')
        )
        expect(verified).toEqual(true)
      })

      it('returns false if the uriHash does not match the expectedHash string', async () => {
        const mock = new MockAdapter(axios)
        const notKanyeBuf = await fs.readFile('./fixtures/HelloWorld.txt')
        const kanyeURI =
          'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

        mock.onGet(kanyeURI).reply(200, notKanyeBuf)
        const verified = await isURIHashVerified(kanyeURI, kanyeHash)
        expect(verified).toEqual(false)
      })

      it('returns false if the uriHash does not match the expectedHash byte array', async () => {
        const mock = new MockAdapter(axios)
        const notKanyeBuf = await fs.readFile('./fixtures/HelloWorld.txt')
        const kanyeURI =
          'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

        mock.onGet(kanyeURI).reply(200, notKanyeBuf)
        const verified = await isURIHashVerified(
          kanyeURI,
          Buffer.from(stripHexPrefix(kanyeHash), 'hex')
        )
        expect(verified).toEqual(false)
      })

      it('rejects the promise if the http request times out', async () => {
        const mock = new MockAdapter(axios)
        const kanyeURI =
          'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

        mock.onGet(kanyeURI).timeout()
        await expect(isURIHashVerified(kanyeURI, kanyeHash)).rejects.toBe(
          'timeout of 10ms exceeded'
        )
      })
    })

    describe('isMediaDataVerified', () => {
      it('returns true if the mediaDatas uri match their hashes', async () => {
        const mock = new MockAdapter(axios)

        const helloWorldBuf = await fs.readFile('./fixtures/HelloWorld.txt')
        const helloWorldURI =
          'https://ipfs/io/ipfs/Qmf1rtki74jvYmGeqaaV51hzeiaa6DyWc98fzDiuPatzyy'

        const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
        const kanyeURI =
          'https://ipfs.io/ipfs/QmRhK7o7gpjkkpubu9EvqDGJEgY1nQxSkP7XsMcaX7pZwV'

        mock.onGet(kanyeURI).reply(200, kanyeBuf)
        mock.onGet(helloWorldURI).reply(200, helloWorldBuf)

        const mediaData = constructMediaData(kanyeURI, helloWorldURI, kanyeHash, hash)
        const verified = await isMediaDataVerified(mediaData)
        expect(verified).toEqual(true)
      })
    })

    describe('wrapETH', () => {
      it('wraps the specified eth to weth', async () => {
        const [mainWallet] = generatedWallets(provider)
        const wethFactory = new ethers.ContractFactory(
          wethContractDetails.abi,
          wethContractDetails.bytecode,
          mainWallet
        )

        const weth = await wethFactory.deploy()
        await weth.deployed()
        const connectedWeth = weth.connect(mainWallet)
        await wrapETH(mainWallet, weth.address, BigNumber.from('1000000000000000000'))
        const balanceOf = await connectedWeth.balanceOf(mainWallet.address)
        expect(balanceOf.toString()).toEqual('1000000000000000000')
      })

      it('rejects if the address does not have enough eth to wrap', async () => {
        const [mainWallet] = generatedWallets(provider)
        const wethFactory = new ethers.ContractFactory(
          wethContractDetails.abi,
          wethContractDetails.bytecode,
          mainWallet
        )

        const weth = await wethFactory.deploy()
        await weth.deployed()
        await wrapETH(
          mainWallet,
          weth.address,
          BigNumber.from('100000000000000000000')
        ).catch((e) => {
          expect(e.message).toContain(
            "Error: sender doesn't have enough funds to send tx"
          )
        })
      })
    })

    describe('unwrapWETH', () => {
      it('unwraps the specified weth to eth', async () => {
        const [mainWallet] = generatedWallets(provider)
        const wethFactory = new ethers.ContractFactory(
          wethContractDetails.abi,
          wethContractDetails.bytecode,
          mainWallet
        )

        const weth = await wethFactory.deploy()
        await weth.deployed()
        const connectedWeth = weth.connect(mainWallet)
        const ethBalance = await mainWallet.getBalance()

        const wrapTx = await wrapETH(
          mainWallet,
          weth.address,
          BigNumber.from('1000000000000000000')
        )
        const wrapReceipt = await provider.getTransactionReceipt(wrapTx.hash)
        const wrapGas = wrapReceipt.gasUsed.mul(wrapTx.gasPrice.toString())
        const balanceOf = await connectedWeth.balanceOf(mainWallet.address)
        expect(balanceOf.toString()).toEqual('1000000000000000000')

        const unwrapTx = await unwrapWETH(
          mainWallet,
          weth.address,
          BigNumber.from('1000000000000000000')
        )
        const unwrapReceipt = await provider.getTransactionReceipt(unwrapTx.hash)
        const unwrapGas = unwrapReceipt.gasUsed.mul(unwrapTx.gasPrice.toString())
        const newBalance = await connectedWeth.balanceOf(mainWallet.address)
        expect(newBalance.toString()).toEqual('0')

        const newEthBalance = await mainWallet.getBalance()
        expect(
          BigNumber.from(ethBalance.toString()).sub(wrapGas).sub(unwrapGas).toString()
        ).toEqual(BigNumber.from(newEthBalance.toString()).toString())
      })

      it('rejects if the address does not have enough weth to unwrap', async () => {
        const [mainWallet] = generatedWallets(provider)
        const wethFactory = new ethers.ContractFactory(
          wethContractDetails.abi,
          wethContractDetails.bytecode,
          mainWallet
        )

        const weth = await wethFactory.deploy()
        await weth.deployed()
        await wrapETH(mainWallet, weth.address, BigNumber.from('1000000000000000000'))
        await unwrapWETH(
          mainWallet,
          weth.address,
          BigNumber.from('100000000000000000000')
        ).catch((e) => {
          expect(e.message).toContain('revert')
        })
      })
    })
  })
})
