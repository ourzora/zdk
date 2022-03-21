import { Chain, Network } from '../src/queries/queries-sdk';
import { ZDK } from '../src/zdk';

describe('zdk', () => {
  let zdk: ZDK;
  beforeEach(() => {
    zdk = new ZDK(process.env.ZDK_ENDPOINT!, Network.Ethereum, Chain.Mainnet);
  });
  it('should fetch localhost collections empty object', async () => {
    const apiResult = await zdk.tokenMarkets({
      query: {
        collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
      },
      pagination: {
        limit: 2,
      },
    });
    expect(apiResult.tokenMarkets.nodes[0]).toMatchSnapshot();
    expect(apiResult.tokenMarkets.nodes[1]).toMatchSnapshot();
    expect(apiResult.tokenMarkets.nodes.length).toBe(2);
  });
  it('should fetch localhost token full object', async () => {
    expect(
      await zdk.tokenMarkets({
        query: {
          tokens: [
            {
              address: '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
              tokenId: '48057',
            },
          ],
        },
        includeFullDetails: true,
        includeSalesHistory: false,
      })
    ).toMatchSnapshot();
  });
  it('queries sort collection information', async () => {
    expect(
      await zdk.collections({
        query: {
          collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
        },
      })
    ).toMatchSnapshot();
  });
  it('queries long token information', async () => {
    expect(
      await zdk.collections({
        query: {
          collectionAddresses: ['0x5180db8f5c931aae63c74266b211f580155ecac8'],
        },
      })
    ).toMatchSnapshot();
  });
});
