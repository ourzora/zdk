import { graphql, ResponseResolver } from 'msw';
import { getSdk } from '../src/queries/queries-sdk';
import { makeServer } from './response';

const server = makeServer({}, {});

export const registry = {
  query: (queryName: any, variables: any) => {
    console.log('registered query variables', { queryName, variables });
  },
};

const handleGenericQuery = (queryName: string) =>
  (async (req, res, ctx) => {
    const serverResp = await server.query(req.body?.query, req.body?.variables);
    registry.query(queryName, req.body?.variables);
    return res((ctx as any).data(serverResp.data));
  }) as ResponseResolver<any>;

// @ts-ignore
const queries = Object.keys(getSdk(null, null));

export const handlers = queries.map((queryName) =>
  graphql.query(queryName, handleGenericQuery(queryName))
);
