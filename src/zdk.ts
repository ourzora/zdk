import { GraphQLClient } from 'graphql-request';
import {
  Chain,
  getSdk,
  Network,
  SortDirection,
  TokenInput,
  TokenMarketsQueryInput,
  TokenMarketsFilterInput,
  TokenMarketSortKeySortInput,
  TokenMarketSortKey,
  CollectionsQueryInput,
  CollectionSortKeySortInput,
  CollectionSortKey,
} from './queries/queries-sdk';

// Export chain and network for API users
export { Chain as ZDKChain, Network as ZDKNetwork };

export type OverrideNetworkOptions = {
  network?: Network;
  chain?: Chain;
};

export type OverridePaginationOptions = {
  limit?: number;
  offset?: number;
};

type Query<ArgsInput, SortInput> = ArgsInput & SortInput;

type TokenMarketsQueryArgs = {
  query: TokenMarketsQueryInput;
  filter?: TokenMarketsFilterInput;
};

type CollectionsQueryArgs = {
  query: CollectionsQueryInput;
};

export interface ListOptions<SortInput> {
  network?: OverrideNetworkOptions;
  pagination?: OverridePaginationOptions;
  sort?: SortInput;
  isFull?: boolean;
}

export type TokenQueryList = TokenInput;

export class ZDK {
  endpoint: string;
  defaultNetwork: Network;
  defaultChain: Chain;
  defaultMaxPageSize: number = 200;

  public sdk: ReturnType<typeof getSdk>;

  constructor(endpoint: string, network: Network, chain: Chain) {
    this.endpoint = endpoint;
    this.defaultNetwork = network;
    this.defaultChain = chain;
    this.sdk = getSdk(new GraphQLClient(this.endpoint));
  }

  // private fetch(url: string, options: any) {
  // return axios({url, ...options});
  // }

  private getNetworkOptions = ({ network, chain }: OverrideNetworkOptions = {}) => {
    return {
      network: {
        network: network ?? this.defaultNetwork,
        chain: chain ?? this.defaultChain,
      },
    };
  };

  private getPaginationOptions = ({ limit, offset }: OverridePaginationOptions = {}) => {
    return {
      pagination: {
        limit: limit || this.defaultMaxPageSize,
        offset: offset || 0,
      },
    };
  };

  public tokenMarkets = async ({
    query,
    filter,
    pagination,
    network,
    sort,
    isFull = false,
  }: Query<TokenMarketsQueryArgs, ListOptions<TokenMarketSortKeySortInput>>) =>
    this.sdk.tokenMarkets({
      query,
      filter,
      isFull,
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || TokenMarketSortKey.Minted,
      },
      ...this.getPaginationOptions(pagination),
      ...this.getNetworkOptions(network),
    });

  public collections = async ({
    query,
    pagination,
    network,
    sort,
    isFull = false,
  }: Query<CollectionsQueryArgs, ListOptions<CollectionSortKeySortInput>>) =>
    this.sdk.collections({
      query,
      isFull,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworkOptions(network),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || CollectionSortKey.Created,
      },
    });
}
