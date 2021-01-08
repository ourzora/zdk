import {
  constructAsk,
  constructBid,
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  sha256FromFile,
  sha256FromHexString,
} from '../src/utils'
import { promises as fs } from 'fs'
import { ethers } from 'ethers'
import { Decimal } from '../src'

describe('Utils', () => {
  let hash: string
  let kanyeHash: string

  beforeAll(() => {
    hash = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    kanyeHash = 'e5dc4ed07fa1a3464d618a5d52a983880bb908b99ffff479eb7ebb7f7b11dabb'
  })

  describe('#sha256FromFile', () => {
    it('it properly hashes a file smaller than the chunk size', async () => {
      const resultHash = await sha256FromFile('./fixtures/HelloWorld.txt', 16 * 1024)
      expect(resultHash).toBe(hash)
    })

    it('it properly hashes a file larger than the chunk size', async () => {
      const resultHash = await sha256FromFile('./fixtures/kanye.jpg', 16 * 1024)
      expect(resultHash).toBe(kanyeHash)
    })
  })

  describe('#sha256FromBuffer', () => {
    it('it properly hashes from buffer', async () => {
      const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
      expect(sha256FromBuffer(kanyeBuf)).toBe(kanyeHash)
    })
  })

  describe('#sha256FromHexString', () => {
    it('it properly hashes from hex string', async () => {
      const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
      const hexString = kanyeBuf.toString('hex')
      expect(sha256FromHexString(hexString)).toBe(kanyeHash)
    })

    it('throws an error if the hex string is invalid', async () => {
      const invalidHex = '0x23kbrkjfshldkjfh34zazanzanwbq'
      expect(() => {
        sha256FromHexString(invalidHex)
      }).toThrow(`${invalidHex} is not valid hex`)
    })
  })

  describe('#constructMediaData', () => {
    it('creates MediaData', () => {
      const metadataHex = ethers.utils.formatBytes32String('some metadata')
      const contentHex = ethers.utils.formatBytes32String('some content')
      const contentHash = sha256FromHexString(contentHex)
      const metadataHash = sha256FromHexString(metadataHex)
      const media = constructMediaData(
        'some content uri',
        'some metadata uri',
        contentHash,
        metadataHash
      )
      expect(media.tokenURI).toBe('some content uri')
      expect(media.metadataURI).toBe('some metadata uri')
      expect(media.contentHash).toBe(contentHash)
      expect(media.metadataHash).toBe(metadataHash)
    })

    it('throws an error if the content hash is hexstring greater than 32 bytes', () => {
      const metadataHex = ethers.utils.formatBytes32String('some metadata')
      const contentHex = ethers.utils.formatBytes32String('some content')
      const contentHash = sha256FromHexString(contentHex)
      const metadataHash = sha256FromHexString(metadataHex)
      expect(() => {
        constructMediaData(
          'some content uri',
          'some metadata uri',
          contentHash.concat('zmxnx'),
          metadataHash.concat('42n3jk')
        )
      }).toThrow(
        `Invariant failed: ${contentHash.concat('zmxnx')} is not exactly 32 bytes`
      )
    })

    it('throws an error if the content hash is hexstring less than 32 bytes', () => {
      const metadataHex = ethers.utils.formatBytes32String('some metadata')
      const contentHex = ethers.utils.formatBytes32String('some content')
      const contentHash = sha256FromHexString(contentHex)
      const metadataHash = sha256FromHexString(metadataHex)
      expect(() => {
        constructMediaData(
          'some content uri',
          'some metadata uri',
          contentHash.substr(0, 62),
          metadataHash
        )
      }).toThrow(`Invariant failed: ${contentHash.substr(0, 62)} is not exactly 32 bytes`)
    })

    it('throws an error if the content hash is byte array less than 32 bytes', () => {
      const contentHex = ethers.utils.formatBytes32String('some content')
      const contentHash = sha256FromHexString(contentHex)
      const badContentHash = Uint8Array.from(Buffer.from(contentHash.substr(0, 62)))
      const metadataHex = ethers.utils.formatBytes32String('some metadata')
      const metadataHash = sha256FromHexString(metadataHex)
      expect(() => {
        constructMediaData(
          'some content uri',
          'some metadata uri',
          badContentHash,
          metadataHash
        )
      }).toThrow(`Invariant failed: ${badContentHash} is not exactly 32 bytes`)
    })

    it('throws an error if the content hash is byte array greater than 32 bytes', () => {
      const metadataHex = ethers.utils.formatBytes32String('some metadata')
      const contentHex = ethers.utils.formatBytes32String('some content')
      const contentHash = sha256FromHexString(contentHex)
      const badContentHash = Uint8Array.from(Buffer.from(contentHash.concat('87cz')))
      const metadataHash = sha256FromHexString(metadataHex)
      expect(() => {
        constructMediaData(
          'some content uri',
          'some metadata uri',
          badContentHash,
          metadataHash
        )
      }).toThrow(`Invariant failed: ${badContentHash} is not exactly 32 bytes`)
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
      expect(bidShares.owner.value.toString()).toBe(Decimal.new(24.4445).value.toString())
    })

    it('it rounds up to the 4th decimal point of precision', () => {
      const bidShares = constructBidShares(25, 24.44449, 50.5555)
      expect(bidShares.owner.value.toString()).toBe(Decimal.new(24.4445).value.toString())
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
      expect(bid.sellOnShare.value.toString()).toBe(Decimal.new(10.1111).value.toString())
    })

    it('rounds up to the 4th decimal place of the sell on share', () => {
      const bid = constructBid(dai, decimal100.value, bidder, bidder, 10.11119999)
      expect(bid.sellOnShare.value.toString()).toBe(Decimal.new(10.1112).value.toString())
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
