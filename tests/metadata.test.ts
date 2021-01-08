import { generateMetadata, parseMetadata, validateMetadata } from '../src'
import { Zora20210101 } from '@zoralabs/media-metadata-schemas'

describe('Metadata', () => {
  function isZora20210101(json: Object): json is Zora20210101 {
    return (
      'name' in json && 'mimeType' in json && 'version' in json && 'description' in json
    )
  }

  describe('#generateMetadata', () => {
    it('generates metadata', () => {
      const expected = require('../fixtures/metadata/zora20210101-minified.json')
      const metadata = generateMetadata('zora-20210101', {
        name: 'zora whitepaper',
        description: 'internet renaissance',
        version: 'zora-20210101',
        mimeType: 'application/json',
      })

      expect(metadata).toBe(JSON.stringify(expected))
    })

    it('raises if specified version is unsupported', () => {
      expect(() => {
        generateMetadata('coinbase-20210101', {})
      }).toThrow('There are no versions with the coinbase project name')

      expect(() => {
        generateMetadata('zora-20210102', {})
      }).toThrow(
        'There are no versions in the zora namespace with the 20210102 calendar version'
      )
    })
  })

  describe('#parseMetadata', () => {
    it('it parses the metadata', () => {
      const json = {
        description: 'blah',
        mimeType: 'application/json',
        name: 'who cares',
        version: 'zora-01012021',
      }

      const result = parseMetadata('zora-20210101', JSON.stringify(json))
      expect(isZora20210101(result)).toBe(true)
      expect(result).toMatchObject(json)
    })

    it('raises if specified version is unsupported', () => {
      expect(() => {
        parseMetadata('coinbase-20210101', '{}')
      }).toThrow('There are no versions with the coinbase project name')

      expect(() => {
        parseMetadata('zora-20210102', '{}')
      }).toThrow(
        'There are no versions in the zora namespace with the 20210102 calendar version'
      )
    })
  })

  describe('#validateMetadata', () => {
    it('it returns true if the schema is correct', () => {
      const json = {
        description: 'blah',
        mimeType: 'application/json',
        name: 'who cares',
        version: 'zora-01012021',
      }

      const result = validateMetadata('zora-20210101', json)
      expect(result).toBe(true)
    })

    it('it returns false if the schema is incorrect', () => {
      const json = {
        description: 'blah',
        mimeType: 'application/json',
        name: 'who cares',
        version: 'zora-01012021',
        additionalProperty: 'idk',
      }

      const result = validateMetadata('zora-20210101', json)
      expect(result).toBe(false)
    })
    it('raises if specified version is unsupported', () => {
      expect(() => {
        validateMetadata('coinbase-20210101', {})
      }).toThrow('There are no versions with the coinbase project name')

      expect(() => {
        validateMetadata('zora-20210102', {})
      }).toThrow(
        'There are no versions in the zora namespace with the 20210102 calendar version'
      )
    })
  })
})
