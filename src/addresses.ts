import rinkebyAddresses from '@zoralabs/core/dist/addresses/4.json'
import polygonAddresses from '@zoralabs/core/dist/addresses/1337.json'
import mainnetAddresses from '@zoralabs/core/dist/addresses/1.json'

interface AddressBook {
  [key: string]: {
    [key: string]: string
  }
}

enum Networks {
  MAINNET = 1,
  RINKEBY = 4,
  POLYGON = 1337,
}

/**
 * Deprecated name-based address mapping. Use by chain id instead.
 * @deprecated
 */
export const addresses: AddressBook = {
  rinkeby: rinkebyAddresses,
  mainnet: mainnetAddresses,
  polygon: polygonAddresses,
}

type AddressByChainId = Record<
  number,
  {
    [key: string]: string
  }
>

/**
 * Mapping from Network to Officially Deployed Instances of the Zora Media Protocol
 *
 * Use this mapping to determine contract addresses for zora
 */
export const addressesByChainId: AddressByChainId = {
  [Networks.RINKEBY]: rinkebyAddresses,
  [Networks.MAINNET]: mainnetAddresses,
  [Networks.POLYGON]: polygonAddresses,
}

export const wethByChainId: Record<number, string> = {
  [Networks.RINKEBY]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [Networks.MAINNET]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [Networks.POLYGON]: '',
}
