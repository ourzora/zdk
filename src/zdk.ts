// import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import {
  Chain,
  getSdk,
  Network,
  SortDirection,
  TokenSortKey,
  TokenSortKeySortInput,
} from './queries/queries-sdk';

// Export chain and network for API users
export { Chain as ZDKChain, Network as ZDKNetwork };

type OverrideNetworkOptions = {
  network?: Network;
  chain?: Chain;
};

type OverridePaginationOptions = {
  limit?: number;
  offset?: number;
};

interface ListOptions<SortInput> {
  network?: OverrideNetworkOptions;
  pagination?: OverridePaginationOptions;
  sort?: SortInput;
}

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
    this.sdk = getSdk(new GraphQLClient(this.endpoint));
  }

  // private fetch(url: string, options: any) {
    // return axios({url, ...options});
  // }

  getNetworkOptions = ({ network, chain }: OverrideNetworkOptions = {}) => {
    return {
      network: {
        network: network ?? this.defaultNetwork,
        chain: chain ?? this.defaultChain,
      },
    };
  };

  getPaginationOptions = ({ limit, offset }: OverridePaginationOptions = {}) => {
    return {
      pagination: {
        limit: limit || this.defaultMaxPageSize,
        offset: offset || 0,
      },
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

  tokens = async (
    addresses: string[],
    { pagination, network, sort }: ListOptions<TokenSortKeySortInput> = {}
  ) =>
    this.sdk.tokens({
      addresses,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworkOptions(network),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || TokenSortKey.TokenId,
      },
    });

  tokensSummary = async (
    addresses: string[],
    { pagination, network, sort }: ListOptions<TokenSortKeySortInput> = {}
  ) =>
    this.sdk.tokensSummary({
      addresses,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworkOptions(network),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || TokenSortKey.TokenId,
      },
    });
}
