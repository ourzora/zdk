import { Chain, Network } from '../src/queries/queries-sdk';
import { ZDK } from '../src/zdk';

describe('zdk', () => {
  let zdk: ZDK;
  beforeEach(() => {
    zdk = new ZDK(process.env.ZDK_ENDPOINT!, Network.Ethereum, Chain.Mainnet);
  });
  it('should fetch localhost collections empty object', async () => {
    expect(await zdk.tokens([''])).toEqual([]);
  });
  it('should fetch localhost tokens empty object', async () => {
    expect(await zdk.token('', '')).toEqual({});
  });
  it('should fetch localhost token contract empty object', async () => {
    expect(await zdk.tokensSummary([''])).toEqual([]);
  });
});
