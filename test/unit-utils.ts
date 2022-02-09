import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { graphql } from 'graphql';

// @ts-ignore
import schema from '../graph-schemas/indexer-graph.graphql';


async function makeQuery(
  mockOverrides: any,
  requestBody: string,
  resolverOverrides: any,
) {
  let currentID = 0;
  const mocks = {
    BigInt: () => '12974',
    BigDecimal: () => '13874.2323',
    Bytes: () => 'ByTeSStrInG',
    // Randomly chosen by mock
    //  breaks consistent testing
    Boolean: () => true,
    Int: () => currentID++,
    ReserveAuctionBidType: () => 'Final',
    ReserveAuctionStatus: () => 'Active',
    ID: () => (currentID++).toString(),
    User: () => ({ id: '10' }),
    Currency: () => ({
      name: 'Wrapped Ether',
      symbol: 'WETH',
      decimals: 18,
      id: '0xFACE',
    }),
    ...mockOverrides,
  };

  const schemaExec = makeExecutableSchema({
    typeDefs: Schemas[schema],
    resolvers: resolverOverrides,
  });
  const schemaWithMocks = addMocksToSchema({
    schema: schemaExec,
    mocks,
    resolvers: resolverOverrides,
  });
  return await graphql(schemaWithMocks, JSON.parse(requestBody).query);
}