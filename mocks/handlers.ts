import { graphql, ResponseResolver } from 'msw';
import { getSdk } from '../src/queries/queries-sdk';
import { makeServer } from './response';

const handleGenericQuery: ResponseResolver<any> = async (req, res, ctx) => {
  const server = makeServer({}, {});
  const serverResp = await server.query(req.body?.query, req.body?.variables);
  return res((ctx as any).data(serverResp));
};

// @ts-ignore
const queries = Object.keys(getSdk(null, null));

export const handlers = queries.map((queryName) =>
  graphql.query(queryName, handleGenericQuery)
);
