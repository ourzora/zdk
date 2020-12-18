import { getAddress } from '@ethersproject/address'
import warning from 'tiny-warning'
import invariant from 'tiny-invariant'
import fs from 'fs'
import sjcl from 'sjcl'

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

/**
 * Generates the sha256 hash from a buffer and returns the hash hex-encoded
 * @param buffer
 */
export function sha256FromBuffer(buffer: Buffer): string {
  const bitArray = sjcl.codec.hex.toBits(buffer.toString('hex'))
  const hashArray = sjcl.hash.sha256.hash(bitArray)
  return sjcl.codec.hex.fromBits(hashArray)
}

/**
 * Generates a sha256 hash from a hex string and returns the hash hex-encoded.
 * Throws an error if `data` is not a hex string
 * @param data
 */
export function sha256FromHexString(data: string): string {
  const hexRegex = new RegExp(/^(0x)?[0-9a-f]+$/i)
  const validHex = hexRegex.test(data)

  if (!validHex) {
    throw new Error(`${data} is not valid hex`)
  }

  const bitArray = sjcl.codec.hex.toBits(data)
  const hashArray = sjcl.hash.sha256.hash(bitArray)
  return sjcl.codec.hex.fromBits(hashArray)
}

/**
 * Generates a sha256 hash from a file and returns the hash hex-encoded
 *
 * This method is preferred for generating the hash for large files
 * because it leverages a read stream and only stores the specified chunk
 * size in memory.
 *
 * @param pathToFile
 * @param chunkSize (Bytes)
 */
export function sha256FromFile(pathToFile: string, chunkSize: number): Promise<string> {
  const hash = new sjcl.hash.sha256()

  const readStream = fs.createReadStream(pathToFile, { highWaterMark: chunkSize })

  return new Promise<string>((resolve, reject) => {
    readStream.on('data', (chunk) => {
      hash.update(sjcl.codec.hex.toBits(chunk.toString('hex')))
    })

    readStream.on('end', () => {
      resolve(sjcl.codec.hex.fromBits(hash.finalize()))
    })

    readStream.on('error', (err) => {
      reject(err)
    })
  })
}
