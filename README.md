# ZDK 2.0

If you're looking for 1.0 branch use [v1-archive](https://github.com/ourzora/zdk/tree/v1-archive)

### Getting started

```ts
// assuming you set API_ENDPOINT to https://api.zora.co/graphql

const { API_ENDPOINT } = process.env.API_ENDPOINT;

const zdk = new ZDK(API_ENDPOINT, [
  {
    chain: Chain.Mainnet,
    network: Network.Ethereum,
  },
]);
```
