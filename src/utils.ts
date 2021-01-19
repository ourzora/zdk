import { getAddress } from '@ethersproject/address'
import warning from 'tiny-warning'
import invariant from 'tiny-invariant'
import sjcl from 'sjcl'
import { Ask, Bid, BidShares, Decimal, MediaData } from './types'
import { BigNumberish, BytesLike } from 'ethers'
import { hexlify, hexDataLength, isHexString } from '@ethersproject/bytes'

/**
 * Constructs a MediaData type.
 *
 * @param tokenURI
 * @param metadataURI
 * @param contentHash
 * @param metadataHash
 */
export function constructMediaData(
  tokenURI: string,
  metadataURI: string,
  contentHash: BytesLike,
  metadataHash: BytesLike
): MediaData {
  // validate the hash to ensure it fits in bytes32
  validateBytes32(contentHash)
  validateBytes32(metadataHash)

  return {
    tokenURI: tokenURI,
    metadataURI: metadataURI,
    contentHash: contentHash,
    metadataHash: metadataHash,
  }
}

/**
 * Constructs a BidShares type.
 * Throws an error if the BidShares do not sum to 100 with 18 trailing decimals.
 *
 * @param creator
 * @param owner
 * @param prevOwner
 */
export function constructBidShares(
  creator: number,
  owner: number,
  prevOwner: number
): BidShares {
  const decimalCreator = Decimal.new(parseFloat(creator.toFixed(4)))
  const decimalOwner = Decimal.new(parseFloat(owner.toFixed(4)))
  const decimalPrevOwner = Decimal.new(parseFloat(prevOwner.toFixed(4)))
  const decimal100 = Decimal.new(100)

  const sum = decimalCreator.value.add(decimalOwner.value).add(decimalPrevOwner.value)

  if (sum.toString() != decimal100.value.toString()) {
    throw new Error(
      `The BidShares sum to ${sum.toString()}, but they must sum to ${decimal100.value.toString()}`
    )
  }

  return {
    creator: decimalCreator,
    owner: decimalOwner,
    prevOwner: decimalPrevOwner,
  }
}

/**
 * Constructs an Ask.
 *
 * @param currency
 * @param amount
 */
export function constructAsk(currency: string, amount: BigNumberish): Ask {
  const parsedCurrency = validateAndParseAddress(currency)
  return {
    currency: parsedCurrency,
    amount: amount,
  }
}

/**
 * Constructs a Bid.
 *
 * @param currency
 * @param amount
 * @param bidder
 * @param recipient
 * @param sellOnShare
 */
export function constructBid(
  currency: string,
  amount: BigNumberish,
  bidder: string,
  recipient: string,
  sellOnShare: number
): Bid {
  let parsedCurrency: string
  let parsedBidder: string
  let parsedRecipient: string

  try {
    parsedCurrency = validateAndParseAddress(currency)
  } catch (err) {
    throw new Error(`Currency address is invalid: ${err.message}`)
  }

  try {
    parsedBidder = validateAndParseAddress(bidder)
  } catch (err) {
    throw new Error(`Bidder address is invalid: ${err.message}`)
  }

  try {
    parsedRecipient = validateAndParseAddress(recipient)
  } catch (err) {
    throw new Error(`Recipient address is invalid: ${err.message}`)
  }

  const decimalSellOnShare = Decimal.new(parseFloat(sellOnShare.toFixed(4)))

  return {
    currency: parsedCurrency,
    amount: amount,
    bidder: parsedBidder,
    recipient: parsedRecipient,
    sellOnShare: decimalSellOnShare,
  }
}

/**
 * Validates and returns the checksummed address
 *
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
 *
 * @param chainId
 */
export function chainIdToNetworkName(chainId: number): string {
  switch (chainId) {
    case 4: {
      return 'rinkeby'
    }
    case 1: {
      return 'mainnet'
    }
  }

  invariant(false, `chainId ${chainId} not officially supported by the Zora Protocol`)
}

/**
 * Generates the sha256 hash from a buffer and returns the hash hex-encoded
 *
 * @param buffer
 */
export function sha256FromBuffer(buffer: Buffer): string {
  const bitArray = sjcl.codec.hex.toBits(buffer.toString('hex'))
  const hashArray = sjcl.hash.sha256.hash(bitArray)
  return '0x'.concat(sjcl.codec.hex.fromBits(hashArray))
}

/**
 * Generates a sha256 hash from a 0x prefixed hex string and returns the hash hex-encoded.
 * Throws an error if `data` is not a hex string.
 *
 * @param data
 */
export function sha256FromHexString(data: string): string {
  if (!isHexString(data)) {
    throw new Error(`${data} is not valid 0x prefixed hex`)
  }

  const bitArray = sjcl.codec.hex.toBits(data)
  const hashArray = sjcl.hash.sha256.hash(bitArray)
  return '0x'.concat(sjcl.codec.hex.fromBits(hashArray))
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
  if (typeof window !== 'undefined') {
    throw new Error('This method is not available in a browser context')
  }

  const fs = require('fs')

  const hash = new sjcl.hash.sha256()
  const readStream = fs.createReadStream(pathToFile, { highWaterMark: chunkSize })

  return new Promise<string>((resolve, reject) => {
    readStream.on('data', (chunk: Buffer | string) => {
      hash.update(sjcl.codec.hex.toBits(chunk.toString('hex')))
    })

    readStream.on('end', () => {
      resolve('0x'.concat(sjcl.codec.hex.fromBits(hash.finalize())))
    })

    readStream.on('error', (err: Error) => {
      reject(err)
    })
  })
}

/**
 * Validates if the input is exactly 32 bytes
 * Expects a hex string with a 0x prefix or a Bytes type
 * @param value
 */
export function validateBytes32(value: BytesLike) {
  if (typeof value == 'string') {
    if (isHexString(value) && hexDataLength(value) == 32) {
      return
    }

    invariant(false, `${value} is not a 0x prefixed 32 bytes hex string`)
  } else {
    if (hexDataLength(hexlify(value)) == 32) {
      return
    }

    invariant(false, `value is not a length 32 byte array`)
  }
}

/**
 * Removes the hex prefix of the passed string if it exists
 * @param hex
 */
export function stripHexPrefix(hex: string) {
  return hex.slice(0, 2) == '0x' ? hex.slice(2) : hex
}
