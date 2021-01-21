## Bidding on Media on the Zora Protocol

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import { constructBid } from '@zoralabs/zdk'
import { Decimal } from '@zoralabs/zdk'

const dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const wallet = Wallet.createRandom()

const zora = new Zora(wallet, 4)
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
