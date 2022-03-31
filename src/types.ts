export type {
  AggregateAttributesQueryVariables,
  CollectionSortKey,
  CollectionSortKeySortInput,
  CollectionsQuery,
  CollectionsQueryInput,
  SortDirection,
  TokenInput,
  TokenMarketsFilterInput,
  TokenMarketSortKey,
  TokenMarketSortKeySortInput,
  TokenMarketsQuery,
  TokenMarketsQueryInput,
  TokenSortKey,
  TokenSortKeySortInput,
  TokensQuery,
  SalesVolumeQueryVariables,
  OwnersByCountQueryVariables,
  TokensQueryFilter,
  TokensQueryInput,
} from './queries/queries-sdk';

/// imports for local use
import { TokenMarketsQuery, CollectionsQuery, TokensQuery } from './queries/queries-sdk';

// convenience types for token market responses
export type TokenMarketResponseList = TokenMarketsQuery['tokenMarkets']['nodes'];
export type TokenMarketResponseItem = TokenMarketResponseList[0];

// convenience types for collection responses
export type CollectionResponseList = CollectionsQuery['collections']['nodes'];
export type CollectionResponseItem = CollectionResponseList[0];

// convenience types for token responses
export type TokenResponseList = TokensQuery['tokens']['nodes'];
export type TokenResponseItem = TokenResponseList[0];
