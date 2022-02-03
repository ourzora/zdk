import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { Chain, getSdk, Network, SortDirection } from '../queries/queries-sdk';

type OverrideNetworkOptions = {
  network?: Network;
  chain?: Chain;
};

type OverridePaginationOptions = {
  limit: number;
  offset: number;
  sortKey: string;
  sortDirection: SortDirection;
};

export class ZDK {
  endpoint: string;
  defaultNetwork: Network;
  defaultChain: Chain;
  defaultMaxPageSize: number = 200;

  sdk: ReturnType<typeof getSdk>;

  constructor(endpoint: string, network: Network, chain: Chain) {
    this.endpoint = endpoint;
    this.defaultNetwork = network;
    this.defaultChain = chain;
    this.sdk = getSdk(new GraphQLClient(this.endpoint, { fetch: axios }));
  }

  getNetworkOptions = ({ network, chain }: OverrideNetworkOptions = {}) => {
    return {
      network: {
        network: network ?? this.defaultNetwork,
        chain: chain ?? this.defaultChain,
      },
    };
  };

  getPaginationOptions = (
    { limit, offset, sortKey, sortDirection }: OverridePaginationOptions = {limit: this.defaultMaxPageSize, offset: 0, sortKey: '', sortDirection: SortDirection.Desc}, defaultSortKey: string
  ) => {
    return {
      pagination: {
        limit,
        offset,
        sortKey: sortKey || defaultSortKey,
        sortDirection: sortDirection || SortDirection.Desc,
      }
    };
  };

  token = async (
    contract: string,
    tokenId: string,
    networkOptions?: OverrideNetworkOptions
  ) =>
    this.sdk.token({
      token: { tokenId, address: contract },
      ...this.getNetworkOptions(networkOptions),
    });

  tokenSummary = async (
    contract: string,
    tokenId: string,
    networkOptions?: OverrideNetworkOptions
  ) =>
    this.sdk.tokenSummary({
      token: { tokenId, address: contract },
      ...this.getNetworkOptions(networkOptions),
    });

  tokens = async (
    addresses: string[],
    paginationOptions?: OverridePaginationOptions,
    networkOptions?: OverrideNetworkOptions
  ) =>
    this.sdk.tokens({
      addresses,
      ...this.getPaginationOptions(paginationOptions, 'tokenId'),
      ...this.getNetworkOptions(networkOptions),
    });

  tokensSummary = async (
    addresses: string[],
    paginationOptions?: OverridePaginationOptions,
    networkOptions?: OverrideNetworkOptions
  ) =>
    this.sdk.tokensSummary({
      addresses,
      ...this.getPaginationOptions(paginationOptions, 'tokenId'),
      ...this.getNetworkOptions(networkOptions),
    });
}
