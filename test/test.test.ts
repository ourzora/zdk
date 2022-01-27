import { ZDK } from "../src/zdk";

describe('zdk', () => {
  let zdk: ZDK;
  beforeEach(() => {
    zdk = new ZDK('http://localhost:8000/graphql'  );
  })
  it('should fetch localhost collections empty object', async () => {
    expect(await zdk.getCollection([])).toEqual([]);
  });
  it('should fetch localhost tokens empty object', async () => {
    expect(await zdk.getTokens([])).toEqual([]);
  });
  it('should fetch localhost token contract empty object', async () => {
    expect(await zdk.getTokenContract([])).toEqual([]);
  });
})

