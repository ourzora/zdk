import { Chain, Network } from '../src/queries/queries-sdk';
import { ZDK } from '../src/zdk';

describe('zdk', () => {
  let zdk: ZDK;
  beforeEach(() => {
    zdk = new ZDK(process.env.ZDK_ENDPOINT!, Network.Ethereum, Chain.Mainnet);
  });
  it('should fetch localhost collections empty object', async () => {
    expect(
      await zdk.tokens(['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'], {
        pagination: { limit: 2 },
      })
    ).toMatchSnapshot();
  });
  it('should fetch localhost tokens empty object', async () => {
    expect(
      await zdk.token('0xCa21d4228cDCc68D4e23807E5e370C07577Dd152', '12')
    ).toMatchSnapshot();
  });
  it('should fetch localhost token contract empty object', async () => {
    expect(
      await zdk.tokensSummary(['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'], {pagination: {limit: 4}})
    ).toMatchSnapshot();
  });
});
