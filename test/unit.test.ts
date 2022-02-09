import { Chain, Network } from '../src/queries/queries-sdk';
import { ZDK } from '../src/zdk';
import './setup-mocks';

const ZORA_TESTING_PATH = 'http://example.com/graphql';

describe('unit zdk', () => {
  let zdk: ZDK;
  beforeEach(() => {
    zdk = new ZDK(ZORA_TESTING_PATH, Network.Ethereum, Chain.Mainnet);
  });
  afterEach(() => {
  });
  it('should fetch mock', async () => {
    const token = await zdk.token('0x00', '12');
    expect(token).toMatchSnapshot();
  });
});
