import { makeExecutableSchema } from '@graphql-tools/schema';
import { mockServer } from '@graphql-tools/mock'

// @ts-ignore
import schema from '../graph-schemas/indexer-graph.graphql';

export function makeServer(
  mockOverrides: any,
  resolverOverrides: any,
) {
  let currentID = 0;
  const mocks = {
    Date: () => 1644379949,
    JSONScalar: () => ({
      name: 'test',
      description: 'test',
      image: 'https://example.com/image.jpg'
    }),
    Int: () => currentID++,
    ...mockOverrides,
  };

  const schemaExec = makeExecutableSchema({
    typeDefs: schema,
    resolvers: {...resolverOverrides, 
      TokenContentMedia: {
        mediaType: () => 'IMAGE',
        url: () => 'https://example.com/image.jpg',
        mimeType: () => 'image/png',
        size: () => '2003',
        // mediaEncoding: MediaEncoding
      },
      Token: {
        tokenAddress: () => '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
        tokenId: () => '23',
        name: () => "Token name",
        description: () => "Token description",
      },
    },
  });
  return mockServer(schemaExec, mocks, true);
}