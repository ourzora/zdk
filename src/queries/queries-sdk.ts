import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date (isoformat) */
  Date: any;
  /** The GenericScalar scalar type represents a generic GraphQL scalar value that could be: List or Object. */
  JSONScalar: any;
};

export enum Chain {
  Mainnet = 'MAINNET',
  Polygon = 'POLYGON',
  Rinkeby = 'RINKEBY',
  Ropsten = 'ROPSTEN'
}

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  nodes: Array<Collection>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum CollectionSortKey {
  Created = 'CREATED',
  Name = 'NAME'
}

export type CollectionSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: CollectionSortKey;
};

export type Event = Transfer | V2AuctionEvent | V3AskEvent;

export type EventConnection = {
  __typename?: 'EventConnection';
  nodes: Array<Event>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum EventSortKey {
  Created = 'CREATED'
}

export type EventSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: EventSortKey;
};

export type MediaEncoding = {
  __typename?: 'MediaEncoding';
  large: Scalars['String'];
  original: Scalars['String'];
  poster: Scalars['String'];
  preview: Scalars['String'];
  thumbnail: Scalars['String'];
};

export enum MediaType {
  Animation = 'ANIMATION',
  Audio = 'AUDIO',
  Html = 'HTML',
  Image = 'IMAGE',
  Text = 'TEXT',
  Unknown = 'UNKNOWN',
  Video = 'VIDEO'
}

export type MintContext = {
  __typename?: 'MintContext';
  blockNumber: Scalars['Int'];
  blockTimestamp: Scalars['Date'];
  transactionHash: Scalars['String'];
};

export enum Network {
  Ethereum = 'ETHEREUM',
  Flow = 'FLOW',
  Solana = 'SOLANA'
}

export type NetworkInfo = {
  __typename?: 'NetworkInfo';
  chain: Chain;
  network: Network;
};

export type NetworkInput = {
  chain: Chain;
  network: Network;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type PaginationInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  /** Get collections by addresses */
  collections: CollectionConnection;
  /** Get events by address and token id */
  events: EventConnection;
  /** Get a single token by address and id */
  token?: Maybe<Token>;
  /** Get tokens by addresses */
  tokens: TokenConnection;
};


export type RootQueryCollectionsArgs = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
};


export type RootQueryEventsArgs = {
  network: NetworkInput;
  pagination: PaginationInput;
  sort: EventSortKeySortInput;
  token: TokenInput;
};


export type RootQueryTokenArgs = {
  network: NetworkInput;
  token: TokenInput;
};


export type RootQueryTokensArgs = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Token = {
  __typename?: 'Token';
  attributes?: Maybe<Array<TokenAttribute>>;
  content?: Maybe<TokenContentMedia>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<TokenContentMedia>;
  lastRefreshTime?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSONScalar']>;
  mintInfo: MintContext;
  minter?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  networkInfo: NetworkInfo;
  owner: Scalars['String'];
  tokenAddress: Scalars['String'];
  tokenContract: TokenContract;
  tokenId: Scalars['String'];
  tokenUrl: Scalars['String'];
  tokenUrlMimeType?: Maybe<Scalars['String']>;
};

export type TokenAttribute = {
  __typename?: 'TokenAttribute';
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  shares?: Maybe<Scalars['Int']>;
  traitCount?: Maybe<Scalars['Int']>;
  traitType: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type TokenConnection = {
  __typename?: 'TokenConnection';
  nodes: Array<Token>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenContentMedia = {
  __typename?: 'TokenContentMedia';
  mediaEncoding?: Maybe<MediaEncoding>;
  mediaType?: Maybe<MediaType>;
  mimeType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type TokenContract = {
  __typename?: 'TokenContract';
  chain: Scalars['Int'];
  creator: Scalars['String'];
  description: Scalars['String'];
  externalUrl: Scalars['String'];
  iconUrl: Scalars['String'];
  name: Scalars['String'];
  network: Scalars['String'];
  schema: Scalars['String'];
  symbol: Scalars['String'];
  tokenAddress: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
};

export type TokenInput = {
  address: Scalars['String'];
  tokenId: Scalars['String'];
};

export enum TokenSortKey {
  TokenId = 'TOKEN_ID'
}

export type TokenSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: TokenSortKey;
};

export type Transfer = {
  __typename?: 'Transfer';
  address: Scalars['String'];
  fromAddress: Scalars['String'];
  toAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type V2AuctionApprovalUpdatedEventProperties = {
  __typename?: 'V2AuctionApprovalUpdatedEventProperties';
  approved: Scalars['Boolean'];
};

export type V2AuctionBidEventProperties = {
  __typename?: 'V2AuctionBidEventProperties';
  extended: Scalars['Boolean'];
  firstBid: Scalars['Boolean'];
  sender: Scalars['String'];
  value: Scalars['Int'];
};

export type V2AuctionCanceledEventProperties = {
  __typename?: 'V2AuctionCanceledEventProperties';
  tokenOwner: Scalars['String'];
};

export type V2AuctionCreatedEventProperties = {
  __typename?: 'V2AuctionCreatedEventProperties';
  auctionCurrency: Scalars['String'];
  curator: Scalars['String'];
  curatorFeePercentage: Scalars['Int'];
  duration: Scalars['Int'];
  reservePrice: Scalars['Int'];
  tokenOwner: Scalars['String'];
};

export type V2AuctionDurationExtendedEventProperties = {
  __typename?: 'V2AuctionDurationExtendedEventProperties';
  duration: Scalars['Int'];
};

export type V2AuctionEndedEventProperties = {
  __typename?: 'V2AuctionEndedEventProperties';
  amount: Scalars['Int'];
  auctionCurrency: Scalars['String'];
  curator: Scalars['String'];
  curatorFee: Scalars['Int'];
  tokenOwner: Scalars['String'];
  winner: Scalars['String'];
};

export type V2AuctionEvent = {
  __typename?: 'V2AuctionEvent';
  address: Scalars['String'];
  auctionId: Scalars['Int'];
  collectionAddress: Scalars['String'];
  eventType: V2AuctionEventType;
  properties: V2AuctionEventProperties;
  tokenId: Scalars['Int'];
};

export type V2AuctionEventProperties = V2AuctionApprovalUpdatedEventProperties | V2AuctionBidEventProperties | V2AuctionCanceledEventProperties | V2AuctionCreatedEventProperties | V2AuctionDurationExtendedEventProperties | V2AuctionEndedEventProperties | V2AuctionReservePriceUpdatedEventProperties;

export enum V2AuctionEventType {
  V2AucionDurationExtended = 'V2_AUCION_DURATION_EXTENDED',
  V2AuctionApprovalUpdated = 'V2_AUCTION_APPROVAL_UPDATED',
  V2AuctionBid = 'V2_AUCTION_BID',
  V2AuctionCanceled = 'V2_AUCTION_CANCELED',
  V2AuctionCreated = 'V2_AUCTION_CREATED',
  V2AuctionEnded = 'V2_AUCTION_ENDED',
  V2AuctionReservePriceUpdated = 'V2_AUCTION_RESERVE_PRICE_UPDATED'
}

export type V2AuctionReservePriceUpdatedEventProperties = {
  __typename?: 'V2AuctionReservePriceUpdatedEventProperties';
  reservePrice: Scalars['Int'];
};

export type V3AskCanceledEventProperties = {
  __typename?: 'V3AskCanceledEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export type V3AskCreatedEventProperties = {
  __typename?: 'V3AskCreatedEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export type V3AskEvent = {
  __typename?: 'V3AskEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  eventType: V3AskEventType;
  properties: V3AskEventProperties;
  tokenId: Scalars['Int'];
};

export type V3AskEventProperties = V3AskCanceledEventProperties | V3AskCreatedEventProperties | V3AskFilledEventProperties | V3AskPriceUpdatedEventProperties;

export enum V3AskEventType {
  V3AskCanceled = 'V3_ASK_CANCELED',
  V3AskCreated = 'V3_ASK_CREATED',
  V3AskFilled = 'V3_ASK_FILLED',
  V3AskPriceUpdated = 'V3_ASK_PRICE_UPDATED'
}

export type V3AskFilledEventProperties = {
  __typename?: 'V3AskFilledEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  buyer: Scalars['String'];
  finder: Scalars['String'];
  findersFeeBps: Scalars['Int'];
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export type V3AskPriceUpdatedEventProperties = {
  __typename?: 'V3AskPriceUpdatedEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export const CollectionFragmentFragmentDoc = gql`
    fragment CollectionFragment on Collection {
  name
  symbol
  address
  totalSupply
}
    `;
export const FullMediaFragmentDoc = gql`
    fragment FullMedia on TokenContentMedia {
  size
  url
  size
  mimeType
  mediaType
  mediaEncoding {
    preview
    original
  }
}
    `;
export const TokenSummaryFragmentFragmentDoc = gql`
    fragment TokenSummaryFragment on Token {
  minter
  tokenId
  mintInfo {
    blockTimestamp
    blockNumber
    transactionHash
  }
  tokenAddress
  lastRefreshTime
  owner
  name
  description
  image {
    ...FullMedia
  }
  content {
    ...FullMedia
  }
}
    ${FullMediaFragmentDoc}`;
export const TokenFullFragmentFragmentDoc = gql`
    fragment TokenFullFragment on Token {
  ...TokenSummaryFragment
  metadata
  tokenUrl
  tokenUrlMimeType
}
    ${TokenSummaryFragmentFragmentDoc}`;
export const CollectionsDocument = gql`
    query collections($network: NetworkInput!, $addresses: [String!]!, $pagination: PaginationInput!, $sort: CollectionSortKeySortInput!) {
  collections(
    addresses: $addresses
    network: $network
    pagination: $pagination
    sort: $sort
  ) {
    totalCount
    pageInfo {
      limit
      offset
    }
    nodes {
      ...CollectionFragment
    }
  }
}
    ${CollectionFragmentFragmentDoc}`;
export const TokensDocument = gql`
    query tokens($network: NetworkInput!, $addresses: [String!]!, $pagination: PaginationInput!, $sort: TokenSortKeySortInput!) {
  tokens(
    addresses: $addresses
    network: $network
    pagination: $pagination
    sort: $sort
  ) {
    totalCount
    pageInfo {
      limit
      offset
    }
    nodes {
      ...TokenFullFragment
    }
  }
}
    ${TokenFullFragmentFragmentDoc}`;
export const TokenDocument = gql`
    query token($network: NetworkInput!, $token: TokenInput!) {
  token(token: $token, network: $network) {
    ...TokenFullFragment
  }
}
    ${TokenFullFragmentFragmentDoc}`;
export const TokensSummaryDocument = gql`
    query tokensSummary($network: NetworkInput!, $addresses: [String!]!, $pagination: PaginationInput!, $sort: TokenSortKeySortInput!) {
  tokens(
    addresses: $addresses
    network: $network
    pagination: $pagination
    sort: $sort
  ) {
    totalCount
    pageInfo {
      limit
      offset
    }
    nodes {
      ...TokenSummaryFragment
    }
  }
}
    ${TokenSummaryFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    collections(variables: CollectionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CollectionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectionsQuery>(CollectionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'collections');
    },
    tokens(variables: TokensQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokensQuery>(TokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tokens');
    },
    token(variables: TokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenQuery>(TokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'token');
    },
    tokensSummary(variables: TokensSummaryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokensSummaryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokensSummaryQuery>(TokensSummaryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tokensSummary');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type CollectionFragmentFragment = { __typename?: 'Collection', name: string, symbol: string, address: string, totalSupply?: number | null };

export type FullMediaFragment = { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null };

export type TokenSummaryFragmentFragment = { __typename?: 'Token', minter?: string | null, tokenId: string, tokenAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, mintInfo: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string }, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null };

export type TokenFullFragmentFragment = { __typename?: 'Token', metadata?: any | null, tokenUrl: string, tokenUrlMimeType?: string | null, minter?: string | null, tokenId: string, tokenAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, mintInfo: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string }, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null };

export type CollectionsQueryVariables = Exact<{
  network: NetworkInput;
  addresses: Array<Scalars['String']> | Scalars['String'];
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
}>;


export type CollectionsQuery = { __typename?: 'RootQuery', collections: { __typename?: 'CollectionConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', limit: number, offset: number }, nodes: Array<{ __typename?: 'Collection', name: string, symbol: string, address: string, totalSupply?: number | null }> } };

export type TokensQueryVariables = Exact<{
  network: NetworkInput;
  addresses: Array<Scalars['String']> | Scalars['String'];
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
}>;


export type TokensQuery = { __typename?: 'RootQuery', tokens: { __typename?: 'TokenConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', limit: number, offset: number }, nodes: Array<{ __typename?: 'Token', metadata?: any | null, tokenUrl: string, tokenUrlMimeType?: string | null, minter?: string | null, tokenId: string, tokenAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, mintInfo: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string }, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null }> } };

export type TokenQueryVariables = Exact<{
  network: NetworkInput;
  token: TokenInput;
}>;


export type TokenQuery = { __typename?: 'RootQuery', token?: { __typename?: 'Token', metadata?: any | null, tokenUrl: string, tokenUrlMimeType?: string | null, minter?: string | null, tokenId: string, tokenAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, mintInfo: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string }, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null } | null };

export type TokensSummaryQueryVariables = Exact<{
  network: NetworkInput;
  addresses: Array<Scalars['String']> | Scalars['String'];
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
}>;


export type TokensSummaryQuery = { __typename?: 'RootQuery', tokens: { __typename?: 'TokenConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', limit: number, offset: number }, nodes: Array<{ __typename?: 'Token', minter?: string | null, tokenId: string, tokenAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, mintInfo: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string }, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null }> } };
