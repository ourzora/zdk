import { Decimal } from '../src'

describe('Decimal', () => {
  describe('new', () => {
    it('throws an error if a non integer / float string is passed as value', () => {
      expect(() => {
        Decimal.new('idk')
      }).toThrow('value must represent a floating point number or integer')
    })

    it('throws an error if a non integer is passed as precision', () => {
      expect(() => {
        Decimal.new(100, 1.35)
      }).toThrow(
        'Invariant failed: 1.35 must be a non-negative integer less than or equal to 18'
      )
    })

    it('throws an error if a negative number is passed as precision', () => {
      expect(() => {
        Decimal.new(100, -10)
      }).toThrow(
        'Invariant failed: -10 must be a non-negative integer less than or equal to 18'
      )
    })

    it('throws an error if an integer larger than 18 is passed as precision', () => {
      expect(() => {
        Decimal.new(100, 19)
      }).toThrow(
        'Invariant failed: 19 must be a non-negative integer less than or equal to 18'
      )
    })

    it('throw an error if the number of decimal places in value is greater than the specified precision', () => {
      expect(() => {
        Decimal.new(100.1234567, 6)
      }).toThrow(
        'Precision: 6 must be greater than or equal the number of decimal places: 7 in value: 100.1234567'
      )

      expect(() => {
        Decimal.new('100.1234567', 6)
      }).toThrow(
        'Precision: 6 must be greater than or equal the number of decimal places: 7 in value: 100.1234567'
      )
    })

    it('does not throw an error if precision is exactly the same as decimals', () => {
      expect(() => {
        Decimal.new(100.1234567, 7)
      }).not.toThrow()

      expect(() => {
        Decimal.new('100.1234567', 7)
      }).not.toThrow()
    })

    it('defaults to 18 decimals of precision', () => {
      const wad = Decimal.new(1)
      expect(wad.value.toString()).toEqual('1000000000000000000')
    })

    it('correctly creates a big number representation with the specified precision', () => {
      const wad = Decimal.new(100)
      expect(wad.value.toString()).toEqual('100000000000000000000') // 100 with 18 decimals of precision

      const oneThird = Decimal.new(0.333333)
      expect(oneThird.value.toString()).toEqual('333333000000000000') // .333333 with 18 decimals of precision

      const oneHundred = Decimal.new(100, 0)
      expect(oneHundred.value.toString()).toEqual('100')

      const oneHundredUSDC = Decimal.new(100, 6)
      expect(oneHundredUSDC.value.toString()).toEqual('100000000') // 100 with 6 decimals of precision

      const oneHundredWBTC = Decimal.new(100, 8)
      expect(oneHundredWBTC.value.toString()).toEqual('10000000000') // 100 with 8 decimals of precision
    })

    it('can accept string integer values', () => {
      const wad = Decimal.new('100')
      expect(wad.value.toString()).toEqual('100000000000000000000') // 100 with 18 decimals of precision
    })

    it('can accept string floats as values', () => {
      const wad = Decimal.new('1.56')
      expect(wad.value.toString()).toEqual('1560000000000000000')
    })
  })

  describe('raw', () => {
    it('returns the DecimalValue with no precision', () => {
      const one = Decimal.raw(1)
      expect(one.value.toString()).toEqual('1')
    })
  })
})
