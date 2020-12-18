import chai, { expect } from 'chai'
import asPromised from 'chai-as-promised'
import spies from 'chai-spies'
import { sha256FromBuffer, sha256FromFile, sha256FromHexString } from '../src/utils'
import { promises as fs } from 'fs'

chai.use(asPromised)
chai.use(spies)

describe('Utils', async () => {
  let hash: string
  let kanyeHash: string

  before(() => {
    hash = '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069'
    kanyeHash = 'e5dc4ed07fa1a3464d618a5d52a983880bb908b99ffff479eb7ebb7f7b11dabb'
  })

  describe('sha256FromFile', async () => {
    it('it properly hashes a file smaller than the chunk size', async () => {
      expect(sha256FromFile('../fixtures/HelloWorld.txt', 16 * 1024)).eventually.eq(hash)
    })

    it('it properly hashes a file larger than the chunk size', async () => {
      expect(sha256FromFile('../fixtures/kanye.jpg', 16 * 1024)).eventually.eq(kanyeHash)
    })
  })

  describe('sha256FromBuffer', async () => {
    it('it properly hashes from buffer', async () => {
      const kanyeBuf = await fs.readFile('./fixtures/kanye.jpg')
      expect(sha256FromBuffer(kanyeBuf)).eq(kanyeHash)
    })
  })

  describe('sha256FromHexString', async () => {
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
})
