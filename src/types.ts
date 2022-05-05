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
import { CollectionsQuery, TokenQuery, TokensQuery } from './queries/queries-sdk';

// convenience types for collection response
export type CollectionResponseList = CollectionsQuery['collections']['nodes'];
export type CollectionResponseItem = CollectionResponseList[0];

// convenience types for tokens response
export type TokensResponseList = TokensQuery['tokens']['nodes'];
export type TokensResponseItem = TokensResponseList[0];

// convenience types for token response
export type TokenResponseItem = NonNullable<TokenQuery['token']>;
