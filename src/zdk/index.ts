import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from '../queries/queries-sdk';

export class ZDK {
  endpoint: string;
  sdk: ReturnType<typeof getSdk>;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.sdk = getSdk(new GraphQLClient(this.endpoint, { fetch: axios }));
  }

  getTokens = async (addresses: string[]) => this.sdk.getToken({ addresses });

  getCollection = async (addresses: string[]) => this.sdk.getCollections({ addresses });

  getTokenContract = async (addresses: string[]) =>
    this.sdk.getTokenContract({ addresses });
}
