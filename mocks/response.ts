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
    resolvers: resolverOverrides,
  });
  return mockServer(schemaExec, mocks, true);
}