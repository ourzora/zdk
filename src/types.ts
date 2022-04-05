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

/// imports for local use
import { CollectionsQuery, TokensQuery } from './queries/queries-sdk';

// convenience types for collection responses
export type CollectionResponseList = CollectionsQuery['collections']['nodes'];
export type CollectionResponseItem = CollectionResponseList[0];

// convenience types for token responses
export type TokenResponseList = TokensQuery['tokens']['nodes'];
export type TokenResponseItem = TokenResponseList[0];
