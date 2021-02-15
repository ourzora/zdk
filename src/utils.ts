import { getAddress } from '@ethersproject/address'
import warning from 'tiny-warning'
import invariant from 'tiny-invariant'
import sjcl from 'sjcl'
import {
  Ask,
  Bid,
  BidShares,
  DecimalValue,
  EIP712Domain,
  EIP712Signature,
  MediaData,
} from './types'
import { Decimal } from './Decimal'
import {
  BigNumber,
  BigNumberish,
  BytesLike,
  ContractTransaction,
  ethers,
  Wallet,
} from 'ethers'
import { arrayify, hexDataLength, hexlify, isHexString } from '@ethersproject/bytes'
import { recoverTypedSignature, signTypedData_v4 } from 'eth-sig-util'
import { fromRpcSig, toRpcSig } from 'ethereumjs-util'
import { BaseErc20Factory } from '@zoralabs/core/dist/typechain'
import axios from 'axios'

// // https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
export const WETH_MAINNET = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
// // https://rinkeby.etherscan.io/address/0xc778417e063141139fce010982780140aa0cd5ab
export const WETH_RINKEBY = '0xc778417E063141139Fce010982780140Aa0cD5Ab'

/********************
 * Type Constructors
 ********************
 */

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
  validateURI(tokenURI)
  validateURI(metadataURI)

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

  validateBidShares(decimalCreator, decimalOwner, decimalPrevOwner)

  return {
    creator: decimalCreator,
    owner: decimalOwner,
    prevOwner: decimalPrevOwner,
  }
}

/**
 * Validates that BidShares sum to 100
 *
 * @param creator
 * @param owner
 * @param prevOwner
 */
export function validateBidShares(
  creator: DecimalValue,
  owner: DecimalValue,
  prevOwner: DecimalValue
): void {
  const decimal100 = Decimal.new(100)

  const sum = creator.value.add(owner.value).add(prevOwner.value)

  if (sum.toString() != decimal100.value.toString()) {
    invariant(
      false,
      `The BidShares sum to ${sum.toString()}, but they must sum to ${decimal100.value.toString()}`
    )
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
 * Validates if the input is exactly 32 bytes
 * Expects a hex string with a 0x prefix or a Bytes type
 *
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
 * Validates the URI is prefixed with `https://`
 *
 * @param uri
 */
export function validateURI(uri: string) {
  if (!uri.match(/^https:\/\/(.*)/)) {
    invariant(false, `${uri} must begin with \`https://\``)
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

/********************
 * Hashing Utilities
 ********************
 */

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
 * Removes the hex prefix of the passed string if it exists
 *
 * @param hex
 */
export function stripHexPrefix(hex: string) {
  return hex.slice(0, 2) == '0x' ? hex.slice(2) : hex
}

/*********************
 * EIP-712 Utilities
 *********************
 */

/**
 * Signs a Zora Permit Message as specified by EIP-712
 *
 * @param owner
 * @param toAddress
 * @param mediaId
 * @param nonce
 * @param deadline
 * @param domain
 */
export async function signPermitMessage(
  owner: Wallet,
  toAddress: string,
  mediaId: number,
  nonce: number,
  deadline: number,
  domain: EIP712Domain
): Promise<EIP712Signature> {
  const tokenId = mediaId

  return new Promise<EIP712Signature>(async (res, reject) => {
    try {
      const sig = signTypedData_v4(Buffer.from(owner.privateKey.slice(2), 'hex'), {
        data: {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            Permit: [
              { name: 'spender', type: 'address' },
              { name: 'tokenId', type: 'uint256' },
              { name: 'nonce', type: 'uint256' },
              { name: 'deadline', type: 'uint256' },
            ],
          },
          primaryType: 'Permit',
          domain: domain,
          message: {
            spender: toAddress,
            tokenId,
            nonce,
            deadline,
          },
        },
      })

      const response = fromRpcSig(sig)

      res({
        r: response.r,
        s: response.s,
        v: response.v,
        deadline: deadline.toString(),
      })
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

/**
 * Recovers the address of the private key that signed the Zora Permit Message
 *
 * @param toAddress
 * @param mediaId
 * @param nonce
 * @param deadline
 * @param domain
 * @param eipSig
 */
export async function recoverSignatureFromPermit(
  toAddress: string,
  mediaId: number,
  nonce: number,
  deadline: number,
  domain: EIP712Domain,
  eipSig: EIP712Signature
) {
  const r = arrayify(eipSig.r)
  const s = arrayify(eipSig.s)

  const tokenId = mediaId

  const recovered = recoverTypedSignature({
    data: {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Permit: [
          { name: 'spender', type: 'address' },
          { name: 'tokenId', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      },
      primaryType: 'Permit',
      domain: domain,
      message: {
        spender: toAddress,
        tokenId,
        nonce,
        deadline,
      },
    },
    sig: toRpcSig(eipSig.v, Buffer.from(r), Buffer.from(s)),
  })
  return recovered
}

/**
 * Recovers the address of the private key that signed a Zora MintWithSig Message
 *
 * @param contentHash
 * @param metadataHash
 * @param creatorShareBN
 * @param nonce
 * @param deadline
 * @param domain
 * @param eipSig
 */
export async function recoverSignatureFromMintWithSig(
  contentHash: BytesLike,
  metadataHash: BytesLike,
  creatorShareBN: BigNumber,
  nonce: number,
  deadline: number,
  domain: EIP712Domain,
  eipSig: EIP712Signature
) {
  const r = arrayify(eipSig.r)
  const s = arrayify(eipSig.s)
  const creatorShare = creatorShareBN.toString()

  const recovered = recoverTypedSignature({
    data: {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        MintWithSig: [
          { name: 'contentHash', type: 'bytes32' },
          { name: 'metadataHash', type: 'bytes32' },
          { name: 'creatorShare', type: 'uint256' },
          { name: 'nonce', type: 'uint256' },
          { name: 'deadline', type: 'uint256' },
        ],
      },
      primaryType: 'MintWithSig',
      domain: domain,
      message: {
        contentHash,
        metadataHash,
        creatorShare,
        nonce,
        deadline,
      },
    },
    sig: toRpcSig(eipSig.v, Buffer.from(r), Buffer.from(s)),
  })
  return recovered
}

/**
 * Signs a Zora MintWithSig Message as specified by EIP-712
 *
 * @param owner
 * @param contentHash
 * @param metadataHash
 * @param creatorShareBN
 * @param nonce
 * @param deadline
 * @param domain
 */
export async function signMintWithSigMessage(
  owner: Wallet,
  contentHash: BytesLike,
  metadataHash: BytesLike,
  creatorShareBN: BigNumber,
  nonce: number,
  deadline: number,
  domain: EIP712Domain
): Promise<EIP712Signature> {
  try {
    validateBytes32(contentHash)
    validateBytes32(metadataHash)
  } catch (err) {
    return Promise.reject(err.message)
  }

  const creatorShare = creatorShareBN.toString()

  return new Promise<EIP712Signature>(async (res, reject) => {
    try {
      const sig = signTypedData_v4(Buffer.from(owner.privateKey.slice(2), 'hex'), {
        data: {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'version', type: 'string' },
              { name: 'chainId', type: 'uint256' },
              { name: 'verifyingContract', type: 'address' },
            ],
            MintWithSig: [
              { name: 'contentHash', type: 'bytes32' },
              { name: 'metadataHash', type: 'bytes32' },
              { name: 'creatorShare', type: 'uint256' },
              { name: 'nonce', type: 'uint256' },
              { name: 'deadline', type: 'uint256' },
            ],
          },
          primaryType: 'MintWithSig',
          domain: domain,
          message: {
            contentHash,
            metadataHash,
            creatorShare,
            nonce,
            deadline,
          },
        },
      })
      const response = fromRpcSig(sig)
      res({
        r: response.r,
        s: response.s,
        v: response.v,
        deadline: deadline.toString(),
      })
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })
}

/**
 * Approve a spender address to spend a specified amount of a specified ERC20 from wallet
 *
 * @param wallet
 * @param erc20Address
 * @param spender
 * @param amount
 */
export async function approveERC20(
  wallet: Wallet,
  erc20Address: string,
  spender: string,
  amount: BigNumberish
): Promise<ContractTransaction> {
  const erc20 = BaseErc20Factory.connect(erc20Address, wallet)
  return erc20.approve(spender, amount)
}

/**
 * Returns the `verified` status of a uri.
 * A uri is only considered `verified` if its content hashes to its expected hash
 *
 * @param uri
 * @param expectedHash
 * @param timeout
 */
export async function isURIHashVerified(
  uri: string,
  expectedHash: BytesLike,
  timeout: number = 10
): Promise<boolean> {
  try {
    validateURI(uri)

    const resp = await axios.get(uri, {
      timeout: timeout,
      responseType: 'arraybuffer',
    })
    const uriHash = sha256FromBuffer(resp.data)
    const normalizedExpectedHash = hexlify(expectedHash)

    return uriHash == normalizedExpectedHash
  } catch (err) {
    return Promise.reject(err.message)
  }
}

/**
 * Returns the `verified` status of some MediaData.
 * MediaData is only considered `verified` if the content of its URIs hash to their respective hash
 *
 * @param mediaData
 * @param timeout
 */
export async function isMediaDataVerified(
  mediaData: MediaData,
  timeout: number = 10
): Promise<boolean> {
  const isTokenURIVerified = await isURIHashVerified(
    mediaData.tokenURI,
    mediaData.contentHash,
    timeout
  )

  const isMetadataURIVerified = await isURIHashVerified(
    mediaData.metadataURI,
    mediaData.metadataHash,
    timeout
  )

  return isTokenURIVerified && isMetadataURIVerified
}

/**
 * Deposits `amount` of ETH into WETH contract and receives `amount` in WETH
 * an ERC-20 representation of ETH
 * @param wallet
 * @param wethAddress
 * @param amount
 */
export async function wrapETH(
  wallet: Wallet,
  wethAddress: string,
  amount: BigNumber
): Promise<ContractTransaction> {
  const abi = ['function deposit() public payable']
  const weth = new ethers.Contract(wethAddress, abi, wallet)
  return weth.deposit({ value: amount })
}

/**
 * Withdraws `amount` of ETH from WETH contract for the specified wallet
 * @param wallet
 * @param wethAddress
 * @param amount
 */
export async function unwrapWETH(
  wallet: Wallet,
  wethAddress: string,
  amount: BigNumber
): Promise<ContractTransaction> {
  const abi = ['function withdraw(uint256) public']
  const weth = new ethers.Contract(wethAddress, abi, wallet)
  return weth.withdraw(amount)
}
