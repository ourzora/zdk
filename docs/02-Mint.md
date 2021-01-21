## Minting on the Zora Protocol

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import {
  constructBidShares,
  constructMediaData,
  sha256FromHexString,
} from '@zoralabs/zdk/utils'
import { generateMetadata } from '@zoralabs/zdk/metadata'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 4)

const metadataJSON = generateMetadata('zora-20210101', {
  description: '',
  mimeType: 'text/plain',
  name: '',
  version: 'zora-20210101',
})

const contentHex = ethers.utils.formatBytes32String('Ours Truly')
const metadataHex = ethers.utils.formatBytes32String(metadataJSON)
const contentHash = sha256FromHexString(contentHex)
const metadataHash = sha256FromHexString(metadataHex)
const mediaData = constructMediaData(
  'https://ipfs.io/ipfs/bafybeifyqibqlheu7ij7fwdex4y2pw2wo7eaw2z6lec5zhbxu3cvxul6h4',
  'https://ipfs.io/ipfs/bafybeifpxcq2hhbzuy2ich3duh7cjk4zk4czjl6ufbpmxep247ugwzsny4',
  contentHash,
  metadataHash
)

const bidShares = constructBidShares(
  10, // creator share
  90, // owner share
  0 // prevOwner share
)
const tx = await zora.mint(mediaData, bidShares)
await tx.wait(8) // 8 confirmations to finalize
```
