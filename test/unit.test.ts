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

  // it('should fetch mock token', async () => {
  //   const token = await zdk.token('0xCa21d4228cDCc68D4e23807E5e370C07577Dd152', '12');
  //   expect(token).toMatchSnapshot();
  //   expect(querySpy).toBeCalledWith('token', {
  //     network: {
  //       network: 'ETHEREUM',
  //       chain: 'MAINNET',
  //     },
  //     token: { tokenId: '12', address: '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152' },
  //   });
  // });

  it('should fetch mock tokens', async () => {
    const tokens = await zdk.tokens({
      where: { collectionAddresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'] },
      pagination: { limit: 2 },
    });
    expect(tokens.tokens.nodes.length).toBe(2);
    expect(tokens.tokens.hasNextPage).toBe(false);
    expect(querySpy).toBeCalledWith('tokens', {
      pagination: { limit: 2, offset: 0 },
      sort: { sortDirection: 'DESC', sortKey: 'TOKEN_ID' },
      network: {
        network: 'ETHEREUM',
        chain: 'MAINNET',
      },
      addresses: ['0xCa21d4228cDCc68D4e23807E5e370C07577Dd152'],
    });
  });
});
