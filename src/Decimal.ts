import { BigNumber } from 'ethers'
import { DecimalValue } from './types'
import invariant from 'tiny-invariant'

/**
 * Decimal is a class to make it easy to go from Javascript / Typescript `number` | `string`
 * to ethers `BigDecimal` with the ability to customize precision
 */
export class Decimal {
  /**
   * Returns a `DecimalValue` type from the specified value and precision
   * @param value
   * @param precision
   */
  static new(value: number | string, precision: number = 18): DecimalValue {
    invariant(
      precision % 1 == 0 && precision <= 18 && precision > -1,
      `${precision.toString()} must be a non-negative integer less than or equal to 18`
    )

    // if type of string, ensure it represents a floating point number or integer
    if (typeof value == 'string') {
      invariant(
        value.match(/^[-+]?[0-9]*\.?[0-9]+$/),
        'value must represent a floating point number or integer'
      )
    } else {
      value = value.toString()
    }

    const decimalPlaces = Decimal.countDecimals(value)

    // require that the specified precision is at least as large as the number of decimal places of value
    invariant(
      precision >= decimalPlaces,
      `Precision: ${precision} must be greater than or equal the number of decimal places: ${decimalPlaces} in value: ${value}`
    )

    const difference = precision - decimalPlaces
    const zeros = BigNumber.from(10).pow(difference)
    const abs = BigNumber.from(`${value.replace('.', '')}`)
    return { value: abs.mul(zeros) }
  }

  /**
   * Returns the raw `DecimalValue` with no precision
   * @param value
   */
  static raw(value: number): DecimalValue {
    return { value: BigNumber.from(value) }
  }

  /**
   * Returns the number of decimals for value
   * @param value
   */
  private static countDecimals(value: string) {
    if (value.includes('.')) return value.split('.')[1].length || 0
    return 0
  }
}
