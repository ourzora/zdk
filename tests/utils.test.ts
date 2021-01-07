import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
import spies from 'chai-spies'
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
import { Decimal } from '../src'
import { ethers } from 'ethers'

chai.use(asPromised)
chai.use(spies)

describe('Utils', async () => {
  let hash: string
  let kanyeHash: string

  before(() => {
    hash = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    kanyeHash = 'e5dc4ed07fa1a3464d618a5d52a983880bb908b99ffff479eb7ebb7f7b11dabb'
  })

  describe('#sha256FromFile', async () => {
    it('it properly hashes a file smaller than the chunk size', async () => {
      expect(sha256FromFile('../fixtures/HelloWorld.txt', 16 * 1024)).eventually.eq(hash)
    })

    it('it properly hashes a file larger than the chunk size', async () => {
      expect(sha256FromFile('../fixtures/kanye.jpg', 16 * 1024)).eventually.eq(kanyeHash)
    })
  })

  describe('#sha256FromBuffer', async () => {
    it('it properly hashes from buffer', async () => {
      const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
      expect(sha256FromBuffer(kanyeBuf)).eq(kanyeHash)
    })
  })

  describe('#sha256FromHexString', async () => {
    it('it properly hashes from hex string', async () => {
      const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
      const hexString = kanyeBuf.toString('hex')
      expect(sha256FromHexString(hexString)).eq(kanyeHash)
    })

    it('throws an error if the hex string is invalid', async () => {
      const invalidHex = '0x23kbrkjfshldkjfh34zazanzanwbq'
      expect(() => {
        sha256FromHexString(invalidHex)
      }).to.throw(`${invalidHex} is not valid hex`)
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
      expect(media.tokenURI).eq('some content uri')
      expect(media.metadataURI).eq('some metadata uri')
      expect(media.contentHash).eq(contentHash)
      expect(media.metadataHash).eq(metadataHash)
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
      }).to.throw(
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
      }).to.throw(
        `Invariant failed: ${contentHash.substr(0, 62)} is not exactly 32 bytes`
      )
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
      }).to.throw(`Invariant failed: ${badContentHash} is not exactly 32 bytes`)
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
      }).to.throw(`Invariant failed: ${badContentHash} is not exactly 32 bytes`)
    })
  })

  describe('#constructBidShares', () => {
    it('it raises if the BidShares do not exactly sum to 100 with 18 decimals', () => {
      expect(() => {
        constructBidShares(25, 24.44445, 50.55555)
      }).to.throw(
        `The BidShares sum to 99999900000000000000, but they must sum to 100000000000000000000`
      )
    })

    it('it fixes 4 decimal points of precision', () => {
      const bidShares = constructBidShares(25, 24.44455, 50.5555)
      expect(bidShares.owner.value.toString()).to.eq(
        Decimal.new(24.4445).value.toString()
      )
    })

    it('it rounds up to the 4th decimal point of precision', () => {
      const bidShares = constructBidShares(25, 24.44449, 50.5555)
      expect(bidShares.owner.value.toString()).to.eq(
        Decimal.new(24.4445).value.toString()
      )
    })
  })

  describe('#constructAsk', () => {
    const dai = '0x6b175474e89094c44da98b954eedeac495271d0f'
    const decimal100 = Decimal.new(100)

    it('creates an ask', () => {
      const ask = constructAsk(dai, decimal100.value)
      expect(ask.currency.toLowerCase()).eq(dai.toLowerCase())
      expect(ask.amount.toString()).eq(decimal100.value.toString())
    })

    it('raises if an invalid currency address is specified', () => {
      expect(() => {
        constructAsk(dai.substr(0, 38), decimal100.value)
      }).to.throw(`${dai.substr(0, 38)} is not a valid address.`)
    })
  })

  describe('#constructBid', () => {
    const dai = '0x6b175474e89094c44da98b954eedeac495271d0f'
    const decimal100 = Decimal.new(100)
    const bidder = '0xf13090cC20613BF9b5F0b3E6E83CCAdB5Cd0FbD5'

    it('creates a Bid', () => {
      const bid = constructBid(dai, decimal100.value, bidder, bidder, 10)
      expect(bid.currency.toLowerCase()).eq(dai)
      expect(bid.amount.toString()).eq(decimal100.value.toString())
      expect(bid.bidder.toLowerCase()).eq(bidder.toLowerCase())
      expect(bid.recipient.toLowerCase()).eq(bidder.toLowerCase())
      expect(bid.sellOnShare.value.toString()).eq(Decimal.new(10).value.toString())
    })

    it('it fixes the sell on share precision to 4 decimal places', () => {
      const bid = constructBid(dai, decimal100.value, bidder, bidder, 10.1111111111)
      expect(bid.sellOnShare.value.toString()).eq(Decimal.new(10.1111).value.toString())
    })

    it('rounds up to the 4th decimal place of the sell on share', () => {
      const bid = constructBid(dai, decimal100.value, bidder, bidder, 10.11119999)
      expect(bid.sellOnShare.value.toString()).eq(Decimal.new(10.1112).value.toString())
    })

    it('raises if an invalid currency address is specified', () => {
      expect(() => {
        constructBid(dai.substr(0, 38), decimal100.value, bidder, bidder, 10)
      }).to.throw(
        `Currency address is invalid: Invariant failed: ${dai.substr(
          0,
          38
        )} is not a valid address.`
      )
    })

    it('raises if an invalid bidder address is specified', () => {
      expect(() => {
        constructBid(dai, decimal100.value, bidder.substr(0, 10), bidder, 10)
      }).to.throw(
        `Bidder address is invalid: Invariant failed: ${bidder.substr(
          0,
          10
        )} is not a valid address.`
      )
    })

    it('raises if an invalid recipient address is specified', () => {
      expect(() => {
        constructBid(dai, decimal100.value, bidder, bidder.substr(0, 10), 10)
      }).to.throw(
        `Recipient address is invalid: Invariant failed: ${bidder.substr(
          0,
          10
        )} is not a valid address.`
      )
    })
  })
})
