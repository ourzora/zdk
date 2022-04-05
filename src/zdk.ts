import { GraphQLClient } from 'graphql-request';
import {
  getSdk,
  Chain,
  Network,
  NetworkInput,
  SortDirection,
  TokenInput,
  TokensQueryInput,
  TokensQueryFilter,
  CollectionsQueryInput,
  CollectionSortKeySortInput,
  TokenSortInput,
  CollectionSortKey,
  TokenSortKey,
  AggregateAttributesQueryVariables,
  OwnersByCountQueryVariables,
  SalesVolumeQueryVariables,
} from './queries/queries-sdk';

// Export chain and network for API users
export { Chain as ZDKChain, Network as ZDKNetwork };

export type OverrideNetworksOption = NetworkInput[];

export type OverridePaginationOptions = {
  limit?: number;
  offset?: number;
};

type Query<ArgsInput, SortInput> = ArgsInput & SortInput;

type TokensQueryArgs = {
  where: TokensQueryInput;
  filter?: TokensQueryFilter;
  includeSalesHistory?: boolean;
};

type CollectionsQueryArgs = {
  where: CollectionsQueryInput;
};

export interface ListOptions<SortInput> {
  networks?: OverrideNetworksOption;
  pagination?: OverridePaginationOptions;
  sort?: SortInput;
  includeFullDetails?: boolean;
}

export interface AggregateOptions {
  networks?: OverrideNetworksOption;
}

export type TokenQueryList = TokenInput;

const DEFAULT_PROD_ENDPOINT = 'https://api.zora.co/graphql';

export class ZDK {
  endpoint: string;
  defaultNetworks: OverrideNetworksOption;
  defaultMaxPageSize: number = 200;

  public sdk: ReturnType<typeof getSdk>;

  constructor(
    endpoint: string = DEFAULT_PROD_ENDPOINT,
    networks: OverrideNetworksOption = [
      { network: Network.Ethereum, chain: Chain.Mainnet },
    ]
  ) {
    this.endpoint = endpoint;
    this.defaultNetworks = networks;
    this.sdk = getSdk(new GraphQLClient(this.endpoint));
  }

  // private fetch(url: string, options: any) {
  //   return axios({url, ...options});
  // }

  private getNetworksOption = (networks?: OverrideNetworksOption) => {
    return {
      networks: networks ?? this.defaultNetworks,
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

  public tokens = async ({
    where,
    filter,
    pagination,
    networks,
    sort,
    includeFullDetails = false,
    includeSalesHistory = false,
  }: Query<TokensQueryArgs, ListOptions<TokenSortInput>>) =>
    this.sdk.tokens({
      where,
      filter,
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Asc,
        sortKey: sort?.sortKey || TokenSortKey.Transferred,
        sortAxis: sort?.sortAxis,
      },
      includeFullDetails,
      includeSalesHistory,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
    });

  public token = async ({
    address,
    tokenId,
    networks,
  }: {
    address: string;
    tokenId: string;
    networks: OverrideNetworksOption;
  }) => {
    const tokens = await this.tokens({
      where: {
        tokens: [
          {
            address,
            tokenId,
          },
        ],
      },
      pagination: { limit: 1, offset: 0 },
      networks,
    });
    if (!tokens?.tokens.nodes[0]) {
      throw new Error('Could not find token');
    }
    return tokens.tokens.nodes[0];
  };

  public collections = async ({
    where,
    pagination,
    networks,
    sort,
    includeFullDetails = false,
  }: Query<CollectionsQueryArgs, ListOptions<CollectionSortKeySortInput>>) =>
    this.sdk.collections({
      where,
      includeFullDetails,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || CollectionSortKey.Created,
      },
    });

  public ownersByCount = async ({
    where,
    networks,
    pagination,
  }: OwnersByCountQueryVariables) =>
    this.sdk.ownersByCount({
      where,
      networks,
      pagination,
    });

  public salesVolume = async ({
    where,
    networks,
    timeFilter,
  }: SalesVolumeQueryVariables) =>
    this.sdk.salesVolume({
      where,
      networks,
      timeFilter,
    });

  public aggregateAttributes = async ({
    where,
    networks,
  }: AggregateAttributesQueryVariables) =>
    this.sdk.aggregateAttributes({ where, networks });
}
