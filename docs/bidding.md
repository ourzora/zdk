## Bidding on Cryptomedia on the Zora Protocol

If a user of the Zora Protocol finds a piece of cryptomedia they would like to own, they can place a bid on it.
Bids are denominated in an ERC-20 of the bidder's choice. To construct a bid use the `constructBid` utility function and then call the `setBid` method on your Zora instance.

**Note**: Placing a bid on a piece of cryptomedia requires that you deposit funds into the Zora Market contract. In order to successfully place a bid you must `approve` the Zora Market Contract to transfer your funds. You can use the `approveERC20` method to do this.

```typescript
import { Zora, constructBid, Decimal, approveERC20 } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'

const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const wallet = Wallet.createRandom()

const zora = new Zora(wallet, 4)

// grant approval
await approveERC20(wallet, dai, zora.marketAddress, MaxUint256)

const bid = constructBid(
  dai, // currency
  Decimal.new(10).value, // amount 10*10^18
  wallet.address, // bidder address
  wallet.address, // recipient address (address to receive Media if bid is accepted)
  10 // sellOnShare
)

const tx = await zora.setBid(1, bid)
await tx.wait(8) // 8 confirmations to finalize
```
