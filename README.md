## ZDK: The Zora Development Kit

| Statements                                                                    | Branches                                                                    | Functions                                                               | Lines                                                                    |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/Coverage-94.97%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-94.87%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-89.33%25-yellow.svg) | ![Lines](https://img.shields.io/badge/Coverage-95.82%25-brightgreen.svg) |

### Overview

The Zora Development Kit (ZDK) is a tool for developers to simply and reliably interact with the Zora Protocol.
The ZDK is written in Typescript and can be used in any environment in which Javascript can be run.

The ZDK has 4 primary exports plus some types:

- [Zora](docs/zora.md)
- [Utils](docs/utils.md)
- [Addresses](docs/addresses.md)
- [Metadata](docs/metadata.md)

### Installation

```bash
yarn add @zoralabs/zdk
```

### Guides

- [minting](docs/minting.md)
- [bidding](docs/bidding.md)

## Development

`git clone ...`

Run tests

In a new terminal, start up a blockchain

`yarn chain`

In your current terminal, run tests

`yarn test`
