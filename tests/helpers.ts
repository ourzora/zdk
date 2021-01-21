import {
  BaseErc20Factory,
  MarketFactory,
  MediaFactory,
} from '@zoralabs/core/dist/typechain'
import { Wallet } from '@ethersproject/wallet'
import { BigNumber } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'
import { MaxUint256 } from '@ethersproject/constants'

export type ZoraConfiguredAddresses = {
  media: string
  market: string
  currency: string
}

export async function setupZora(
  wallet: Wallet,
  testWallets: Array<Wallet>
): Promise<ZoraConfiguredAddresses> {
  const market = await (await new MarketFactory(wallet).deploy()).deployed()
  const marketAddress = market.address

  const media = await (await new MediaFactory(wallet).deploy(market.address)).deployed()
  const mediaAddress = media.address

  await market.configure(mediaAddress)

  const currency = await (
    await new BaseErc20Factory(wallet).deploy('TEST', 'TEST', BigNumber.from(18))
  ).deployed()
  const currencyAddress = currency.address

  for (const toWallet of testWallets) {
    await mintCurrency(
      wallet,
      currencyAddress,
      toWallet.address,
      BigNumber.from('10000000000000000000000')
    )
    await approveCurrency(toWallet, currencyAddress, marketAddress)
  }

  return {
    media: mediaAddress,
    market: marketAddress,
    currency: currencyAddress,
  }
}

export async function mintCurrency(
  wallet: Wallet,
  tokenAdress: string,
  to: string,
  amount: BigNumber
): Promise<ContractTransaction> {
  return BaseErc20Factory.connect(tokenAdress, wallet).mint(to, amount)
}

export async function approveCurrency(
  wallet: Wallet,
  tokenAddress: string,
  to: string
): Promise<ContractTransaction> {
  return BaseErc20Factory.connect(tokenAddress, wallet).approve(to, MaxUint256)
}
