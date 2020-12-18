## ZDK: The Zora Developer Kit

### Installation

```bash
yarn add @zoralabs/zdk
```

### Usage

#### Mainnet 

```javascript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom();
const zora = new Zora(wallet, 1);
await zora.totalSupply();
```

#### Testnets

##### Rinkeby

```javascript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom();
const zora = new Zora(wallet, 50);
await zora.totalSupply();
```

#### Local Blockchain

When using a local blockchain you must specify overrides for both `mediaAddress` and `marketAddress`.
These should point to the addresses of deployed Zora Media and Market contracts on your local blockchain.

```javascript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom();
const zora = new Zora(wallet, 50, mediaAddress, marketAddress);
await zora.totalSupply();
```

### Development

`git clone ...`

In a different terminal start up a local blockchain from this sdk directory.

`yarn chain`

Run tests

`yarn test`
