export type {
  AggregateAttributesQueryVariables,
  CollectionSortKey,
  CollectionSortKeySortInput,
  CollectionsQuery,
  CollectionsQueryInput,
  SortDirection,
  TokenInput,
  TokenSortKey,
  TokensQuery,
  SalesVolumeQueryVariables,
  OwnersByCountQueryVariables,
  TokensQueryFilter,
  TokensQueryInput,
} from './queries/queries-sdk';

import {
  Chain,
  Network,
  NetworkInput,
  TokenInput,
  TokensQueryInput,
  TokensQueryFilter,
  CollectionsQueryInput,
  CollectionSortKeySortInput,
  TokenSortInput,
  EventsQueryInput,
  EventsQueryFilter,
  EventSortKeySortInput,
  MarketSortKeySortInput,
  MarketsQueryFilter,
  MarketsQueryInput,
  MintsQueryFilter,
  MintsQueryInput,
  MintSortKeySortInput,
  ActiveMarketQueryInput,
  SearchQueryVariables,
  SalesQueryInput,
  SaleSortKeySortInput,
  SalesQueryFilter,
  PaginationInput,
  OffchainOrdersQueryInput,
  OffchainOrderSortKeySortInput,
  OffchainOrdersQueryFilter,
} from './queries/queries-sdk';

/// imports for local use
import { CollectionsQuery, TokenQuery, TokensQuery } from './queries/queries-sdk';

// convenience types for collection response
export type CollectionResponseList = CollectionsQuery['collections']['nodes'];
export type CollectionResponseItem = CollectionResponseList[0];

// convenience types for tokens response
export type TokensResponseList = TokensQuery['tokens']['nodes'];
export type TokensResponseItem = TokensResponseList[0];

// convenience types for token response
export type TokenResponseItem = NonNullable<TokenQuery['token']>;

// Export chain and network for API users
export { Chain as ZDKChain, Network as ZDKNetwork };

export type OverrideNetworksOption = NetworkInput[];

export type OverridePaginationOptions = PaginationInput;
type SharedQueryParams = {
  networks?: NetworkInput[];
  pagination?: OverridePaginationOptions;
};

export type CollectionsQueryArgs = {
  where: CollectionsQueryInput;
  includeFullDetails?: boolean;
  sort: CollectionSortKeySortInput;
} & SharedQueryParams;

export type TokensQueryArgs = {
  where: TokensQueryInput;
  filter?: TokensQueryFilter;
  sort?: TokenSortInput;
  includeFullDetails?: boolean;
  includeSalesHistory?: boolean;
} & SharedQueryParams;

export type EventsQueryArgs = {
  where: EventsQueryInput;
  sort?: EventSortKeySortInput;
  filter?: EventsQueryFilter;
} & SharedQueryParams;

export type MarketsQueryArgs = {
  where: MarketsQueryInput;
  sort: MarketSortKeySortInput;
  filter: MarketsQueryFilter;
  includeFullDetails: boolean;
} & SharedQueryParams;

export type ActiveMarketQueryArgs = {
  network?: NetworkInput;
  where: ActiveMarketQueryInput;
};

export type MintsQueryArgs = {
  where: MintsQueryInput;
  sort?: MintSortKeySortInput;
  filter?: MintsQueryFilter;
  includeFullDetails?: boolean;
  includeMarkets?: boolean;
} & SharedQueryParams;

export type SalesQueryArgs = {
  where: SalesQueryInput;
  sort: SaleSortKeySortInput;
  filter: SalesQueryFilter;
  includeFullDetails: boolean;
} & SharedQueryParams;

export type CollectionStatsAggregateQuery = {
  collectionAddress: string;
  network: NetworkInput;
};

export type OffchainOrderQueryArgs = {
  where?: OffchainOrdersQueryInput;
  networks?: NetworkInput[];
  pagination?: PaginationInput;
  sort?: OffchainOrderSortKeySortInput;
  filter?: OffchainOrdersQueryFilter;
};

export type TokenQueryArgs = {
  network?: NetworkInput;
  token: TokenInput;
  includeFullDetails?: boolean;
};

export type CollectionQueryArgs = {
  address: string;
  network?: NetworkInput;
  includeFullDetails?: boolean;
};

export interface ListOptions<SortInput> {
  networks?: OverrideNetworksOption;
  pagination?: OverridePaginationOptions;
  sort?: SortInput;
  includeFullDetails?: boolean;
}

export type SearchQueryArgs = {
  query: string;
  filter?: SearchQueryVariables['filter'];
  pagination?: SearchQueryVariables['pagination'];
};

export interface AggregateOptions {
  networks?: OverrideNetworksOption;
}

export type TokenQueryList = TokenInput;
