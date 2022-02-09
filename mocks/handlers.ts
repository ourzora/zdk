import { graphql, ResponseResolver } from 'msw';
import { makeServer } from './response';

const handleGenericQuery: ResponseResolver<any> = async (req, res, ctx) => {
  const server = makeServer({}, {});
  const serverResp = await server.query(req.body?.query, req.body?.variables);
  return res((ctx as any).data(serverResp));
}

export const handlers = [
  // handle token query
  graphql.query('token', handleGenericQuery),
];
