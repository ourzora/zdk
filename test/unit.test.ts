import { registry } from '../mocks/handlers';
import { ZDK } from '../src';
import './setup-mocks';

const ZORA_TESTING_PATH = 'http://example.com/graphql';

describe('unit zdk', () => {
  let zdk: ZDK;
  let querySpy: any;
  beforeEach(() => {
    querySpy = spyOn(registry, 'query');
    zdk = new ZDK(ZORA_TESTING_PATH);
  });

  xit('gets mints', async () => {
    await zdk.mints({
      where: {
        minterAddresses: ['jacob.eth'],
      },
    });
    expect(querySpy).toBeCalledWith('token', {
      networks: [
        {
          network: 'ETHEREUM',
          chain: 'MAINNET',
        },
      ],
    });
  });

  it('should fetch mock token', async () => {
    await zdk.token({
      token: {
        address: '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
        tokenId: '12',
      },
    });
    // expect(token).toMatchSnapshot();
    expect(querySpy).toBeCalledWith('token', {
      network: {
        network: 'ETHEREUM',
        chain: 'MAINNET',
      },
      includeFullDetails: false,
      token: { tokenId: '12', address: '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152' },
    });
  });

  it('should fetch mock tokens', async () => {
    const tokens = await zdk.tokens({
      where: { collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'] },
      pagination: { limit: 2 },
    });
    expect(tokens.tokens.nodes.length).toBe(2);
    expect(querySpy).toBeCalledWith('tokens', {
      pagination: { limit: 2, after: null },
      sort: { sortDirection: 'ASC', sortKey: 'TRANSFERRED' },
      networks: [
        {
          network: 'ETHEREUM',
          chain: 'MAINNET',
        },
      ],
      where: {
        collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
      },
      includeFullDetails: false,
      includeSalesHistory: false,
    });
  });
});
