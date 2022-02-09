import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
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
  name: Scalars['String'];
  address: Scalars['String'];
  description: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
  symbol: Scalars['String'];
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  nodes: Array<Collection>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum CollectionSortKey {
  Name = 'NAME',
  Created = 'CREATED'
}

export type CollectionSortKeySortInput = {
  sortKey: CollectionSortKey;
  sortDirection: SortDirection;
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
  sortKey: EventSortKey;
  sortDirection: SortDirection;
};


export type MediaEncoding = {
  __typename?: 'MediaEncoding';
  original: Scalars['String'];
  large: Scalars['String'];
  poster: Scalars['String'];
  preview: Scalars['String'];
  thumbnail: Scalars['String'];
};

export enum MediaType {
  Image = 'IMAGE',
  Animation = 'ANIMATION',
  Text = 'TEXT',
  Html = 'HTML',
  Video = 'VIDEO',
  Audio = 'AUDIO',
  Unknown = 'UNKNOWN'
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
  network: Network;
  chain: Chain;
};

export type NetworkInput = {
  network: Network;
  chain: Chain;
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
  /** Get tokens by addresses */
  tokens: TokenConnection;
  /** Get a single token by address and id */
  token?: Maybe<Token>;
};


export type RootQueryCollectionsArgs = {
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
  network: NetworkInput;
  addresses?: Maybe<Array<Scalars['String']>>;
};


export type RootQueryEventsArgs = {
  token: TokenInput;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: EventSortKeySortInput;
};


export type RootQueryTokensArgs = {
  network: NetworkInput;
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
  addresses?: Maybe<Array<Scalars['String']>>;
};


export type RootQueryTokenArgs = {
  token: TokenInput;
  network: NetworkInput;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Token = {
  __typename?: 'Token';
  tokenAddress: Scalars['String'];
  tokenId: Scalars['String'];
  mintInfo: MintContext;
  networkInfo: NetworkInfo;
  tokenUrl: Scalars['String'];
  tokenUrlMimeType?: Maybe<Scalars['String']>;
  content?: Maybe<TokenContentMedia>;
  image?: Maybe<TokenContentMedia>;
  owner: Scalars['String'];
  tokenContract: TokenContract;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSONScalar']>;
  attributes?: Maybe<Array<TokenAttribute>>;
  minter?: Maybe<Scalars['String']>;
  lastRefreshTime?: Maybe<Scalars['Int']>;
};

export type TokenAttribute = {
  __typename?: 'TokenAttribute';
  traitType: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  displayType?: Maybe<Scalars['String']>;
  maxValue?: Maybe<Scalars['String']>;
  traitCount?: Maybe<Scalars['Int']>;
  shares?: Maybe<Scalars['Int']>;
};

export type TokenConnection = {
  __typename?: 'TokenConnection';
  nodes: Array<Token>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TokenContentMedia = {
  __typename?: 'TokenContentMedia';
  mediaType?: Maybe<MediaType>;
  url?: Maybe<Scalars['String']>;
  mimeType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  mediaEncoding?: Maybe<MediaEncoding>;
};

export type TokenContract = {
  __typename?: 'TokenContract';
  tokenAddress: Scalars['String'];
  chain: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
  schema: Scalars['String'];
  description: Scalars['String'];
  creator: Scalars['String'];
  externalUrl: Scalars['String'];
  iconUrl: Scalars['String'];
  network: Scalars['String'];
};

export type TokenInput = {
  address: Scalars['String'];
  tokenId: Scalars['String'];
};

export enum TokenSortKey {
  TokenId = 'TOKEN_ID'
}

export type TokenSortKeySortInput = {
  sortKey: TokenSortKey;
  sortDirection: SortDirection;
};

export type Transfer = {
  __typename?: 'Transfer';
  fromAddress: Scalars['String'];
  toAddress: Scalars['String'];
  address: Scalars['String'];
  tokenId: Scalars['String'];
};

export type V2AuctionApprovalUpdatedEventProperties = {
  __typename?: 'V2AuctionApprovalUpdatedEventProperties';
  approved: Scalars['Boolean'];
};

export type V2AuctionBidEventProperties = {
  __typename?: 'V2AuctionBidEventProperties';
  sender: Scalars['String'];
  firstBid: Scalars['Boolean'];
  extended: Scalars['Boolean'];
  value: Scalars['Int'];
};

export type V2AuctionCanceledEventProperties = {
  __typename?: 'V2AuctionCanceledEventProperties';
  tokenOwner: Scalars['String'];
};

export type V2AuctionCreatedEventProperties = {
  __typename?: 'V2AuctionCreatedEventProperties';
  auctionCurrency: Scalars['String'];
  tokenOwner: Scalars['String'];
  curator: Scalars['String'];
  curatorFeePercentage: Scalars['Int'];
  duration: Scalars['Int'];
  reservePrice: Scalars['Int'];
};

export type V2AuctionDurationExtendedEventProperties = {
  __typename?: 'V2AuctionDurationExtendedEventProperties';
  duration: Scalars['Int'];
};

export type V2AuctionEndedEventProperties = {
  __typename?: 'V2AuctionEndedEventProperties';
  tokenOwner: Scalars['String'];
  curator: Scalars['String'];
  winner: Scalars['String'];
  auctionCurrency: Scalars['String'];
  amount: Scalars['Int'];
  curatorFee: Scalars['Int'];
};

export type V2AuctionEvent = {
  __typename?: 'V2AuctionEvent';
  eventType: V2AuctionEventType;
  address: Scalars['String'];
  auctionId: Scalars['Int'];
  collectionAddress: Scalars['String'];
  tokenId: Scalars['Int'];
  properties: V2AuctionEventProperties;
};

export type V2AuctionEventProperties = V2AuctionBidEventProperties | V2AuctionCreatedEventProperties | V2AuctionCanceledEventProperties | V2AuctionDurationExtendedEventProperties | V2AuctionEndedEventProperties | V2AuctionReservePriceUpdatedEventProperties | V2AuctionApprovalUpdatedEventProperties;

export enum V2AuctionEventType {
  V2AuctionCreated = 'V2_AUCTION_CREATED',
  V2AuctionCanceled = 'V2_AUCTION_CANCELED',
  V2AuctionReservePriceUpdated = 'V2_AUCTION_RESERVE_PRICE_UPDATED',
  V2AuctionBid = 'V2_AUCTION_BID',
  V2AucionDurationExtended = 'V2_AUCION_DURATION_EXTENDED',
  V2AuctionApprovalUpdated = 'V2_AUCTION_APPROVAL_UPDATED',
  V2AuctionEnded = 'V2_AUCTION_ENDED'
}

export type V2AuctionReservePriceUpdatedEventProperties = {
  __typename?: 'V2AuctionReservePriceUpdatedEventProperties';
  reservePrice: Scalars['Int'];
};

export type V3AskCanceledEventProperties = {
  __typename?: 'V3AskCanceledEventProperties';
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
};

export type V3AskCreatedEventProperties = {
  __typename?: 'V3AskCreatedEventProperties';
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
};

export type V3AskEvent = {
  __typename?: 'V3AskEvent';
  eventType: V3AskEventType;
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  tokenId: Scalars['Int'];
  properties: V3AskEventProperties;
};

export type V3AskEventProperties = V3AskCreatedEventProperties | V3AskCanceledEventProperties | V3AskPriceUpdatedEventProperties | V3AskFilledEventProperties;

export enum V3AskEventType {
  V3AskCreated = 'V3_ASK_CREATED',
  V3AskCanceled = 'V3_ASK_CANCELED',
  V3AskPriceUpdated = 'V3_ASK_PRICE_UPDATED',
  V3AskFilled = 'V3_ASK_FILLED'
}

export type V3AskFilledEventProperties = {
  __typename?: 'V3AskFilledEventProperties';
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
  buyer: Scalars['String'];
  finder: Scalars['String'];
};

export type V3AskPriceUpdatedEventProperties = {
  __typename?: 'V3AskPriceUpdatedEventProperties';
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  askCurrency: Scalars['String'];
  askPrice: Scalars['Int'];
  findersFeeBps: Scalars['Int'];
};

export const CollectionFragmentFragmentDoc = gql`
    fragment CollectionFragment on Collection {
  name
  symbol
  address
  totalSupply
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
  tokenUrl
  tokenAddress
  lastRefreshTime
  name
  description
  image {
    size
    mimeType
    mediaType
    mediaEncoding {
      preview
      original
    }
  }
  content {
    size
    mimeType
    mediaType
    mediaEncoding {
      preview
      original
    }
  }
}
    `;
export const TokenFullFragmentFragmentDoc = gql`
    fragment TokenFullFragment on Token {
  ...TokenSummaryFragment
  metadata
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
export type CollectionFragmentFragment = (
  { __typename?: 'Collection' }
  & Pick<Collection, 'name' | 'symbol' | 'address' | 'totalSupply'>
);

export type TokenSummaryFragmentFragment = (
  { __typename?: 'Token' }
  & Pick<Token, 'minter' | 'tokenId' | 'tokenUrl' | 'tokenAddress' | 'lastRefreshTime' | 'name' | 'description'>
  & { mintInfo: (
    { __typename?: 'MintContext' }
    & Pick<MintContext, 'blockTimestamp' | 'blockNumber' | 'transactionHash'>
  ), image?: Maybe<(
    { __typename?: 'TokenContentMedia' }
    & Pick<TokenContentMedia, 'size' | 'mimeType' | 'mediaType'>
    & { mediaEncoding?: Maybe<(
      { __typename?: 'MediaEncoding' }
      & Pick<MediaEncoding, 'preview' | 'original'>
    )> }
  )>, content?: Maybe<(
    { __typename?: 'TokenContentMedia' }
    & Pick<TokenContentMedia, 'size' | 'mimeType' | 'mediaType'>
    & { mediaEncoding?: Maybe<(
      { __typename?: 'MediaEncoding' }
      & Pick<MediaEncoding, 'preview' | 'original'>
    )> }
  )> }
);

export type TokenFullFragmentFragment = (
  { __typename?: 'Token' }
  & Pick<Token, 'metadata'>
  & TokenSummaryFragmentFragment
);

export type CollectionsQueryVariables = Exact<{
  network: NetworkInput;
  addresses: Array<Scalars['String']> | Scalars['String'];
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
}>;


export type CollectionsQuery = (
  { __typename?: 'RootQuery' }
  & { collections: (
    { __typename?: 'CollectionConnection' }
    & Pick<CollectionConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'limit' | 'offset'>
    ), nodes: Array<(
      { __typename?: 'Collection' }
      & CollectionFragmentFragment
    )> }
  ) }
);

export type TokensQueryVariables = Exact<{
  network: NetworkInput;
  addresses: Array<Scalars['String']> | Scalars['String'];
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
}>;


export type TokensQuery = (
  { __typename?: 'RootQuery' }
  & { tokens: (
    { __typename?: 'TokenConnection' }
    & Pick<TokenConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'limit' | 'offset'>
    ), nodes: Array<(
      { __typename?: 'Token' }
      & TokenFullFragmentFragment
    )> }
  ) }
);

export type TokenQueryVariables = Exact<{
  network: NetworkInput;
  token: TokenInput;
}>;


export type TokenQuery = (
  { __typename?: 'RootQuery' }
  & { token?: Maybe<(
    { __typename?: 'Token' }
    & TokenFullFragmentFragment
  )> }
);

export type TokensSummaryQueryVariables = Exact<{
  network: NetworkInput;
  addresses: Array<Scalars['String']> | Scalars['String'];
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
}>;


export type TokensSummaryQuery = (
  { __typename?: 'RootQuery' }
  & { tokens: (
    { __typename?: 'TokenConnection' }
    & Pick<TokenConnection, 'totalCount'>
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'limit' | 'offset'>
    ), nodes: Array<(
      { __typename?: 'Token' }
      & TokenSummaryFragmentFragment
    )> }
  ) }
);
