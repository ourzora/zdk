import { getAddress } from '@ethersproject/address'
import warning from 'tiny-warning'
import invariant from 'tiny-invariant'

/**
 * Validates and returns the checksummed address
 * @param address
 */
export function validateAndParseAddress(address: string): string {
  try {
    const checksummedAddress = getAddress(address)
    warning(address === checksummedAddress, `${address} is not checksummed.`)
    return checksummedAddress
  } catch (error) {
    invariant(false, `${address} is not a valid address.`)
  }
}

/**
 * Returns the proper network name for the specified chainId
 * @param chainId
 */
export function chainIdToNetworkName(chainId: number): string {
  switch (chainId) {
    case 4: {
      return 'rinkeby'
    }
  }

  invariant(false, `chainId ${chainId} not officially supported by the Zora Protocol`)
}
