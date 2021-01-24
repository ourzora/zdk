## ZDK: The Zora Developer Kit

| Statements                                                            | Branches                                                               | Functions                                                           | Lines                                                         |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-94.41%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-93.75%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-88.24%25-yellow.svg) | ![Lines](https://img.shields.io/badge/Coverage-95.35%25-brightgreen.svg) |

### Installation

```bash
yarn add @zoralabs/zdk
```

### Usage

#### Mainnet

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 1)
await zora.totalSupply()
```

#### Testnets

##### Rinkeby

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50)
await zora.totalSupply()
```

#### Local Blockchain

When using a local blockchain you must specify overrides for both `mediaAddress` and `marketAddress`.
These should point to the addresses of deployed Zora Media and Market contracts on your local blockchain.

```typescript
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'

const wallet = Wallet.createRandom()
const zora = new Zora(wallet, 50, mediaAddress, marketAddress)
await zora.totalSupply()
```

## Docs 

Docs currently exist in the `/docs` directory but will shortly be moved to zora.engineering

## Development

`git clone ...`

Run tests

In a new terminal, start up a blockchain

`yarn chain`

In your current terminal, run tests

`yarn test`
