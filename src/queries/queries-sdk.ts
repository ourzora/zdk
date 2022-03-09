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
  /** Date with time (isoformat) */
  DateTime: any;
  /** The GenericScalar scalar type represents a generic GraphQL scalar value that could be: List or Object. */
  JSONScalar: any;
};

export type AddressesInput = {
  addresses: Array<Scalars['String']>;
};

export type AggregateAttribute = {
  __typename?: 'AggregateAttribute';
  traitType: Scalars['String'];
  valueMetrics: Array<AggregateAttributeValue>;
};

export type AggregateAttributeValue = {
  __typename?: 'AggregateAttributeValue';
  count: Scalars['Int'];
  percent: Scalars['Float'];
  value: Scalars['String'];
};

export type AggregateAttributesQueryInput = {
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  ownerAddressesInput?: InputMaybe<AddressesInput>;
  tokenInputs?: InputMaybe<Array<TokenInput>>;
};

export type AggregateStat = {
  __typename?: 'AggregateStat';
  stat: IntValueFloatValue;
};

export type AggregateStatQueryInput = {
  attributeInputs?: InputMaybe<Array<AttributeFilter>>;
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  ownerAddressesInput?: InputMaybe<AddressesInput>;
};

export type AttributeFilter = {
  traitType: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
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
  attributes?: Maybe<Array<CollectionAttribute>>;
  description: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
};

export type CollectionAttribute = {
  __typename?: 'CollectionAttribute';
  traitType: Scalars['String'];
  valueMetrics: Array<CollectionAttributeValue>;
};

export type CollectionAttributeValue = {
  __typename?: 'CollectionAttributeValue';
  count: Scalars['Int'];
  percent: Scalars['Float'];
  value: Scalars['String'];
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

export type CollectionsQueryInput = {
  collectionAddressesInput: AddressesInput;
};

export type Currency = {
  __typename?: 'Currency';
  address: Scalars['String'];
  decimals: Scalars['Int'];
  name: Scalars['String'];
};

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount';
  currency: Currency;
  decimal: Scalars['Float'];
  raw: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  collectionAddress: Scalars['String'];
  eventType: EventType;
  properties: EventProperties;
  tokenId: Scalars['String'];
};

export type EventConnection = {
  __typename?: 'EventConnection';
  nodes: Array<Event>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type EventProperties = MintEvent | TransferEvent | V1MarketEvent | V2AuctionEvent | V3AskEvent;

export enum EventSortKey {
  Created = 'CREATED'
}

export type EventSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: EventSortKey;
};

export enum EventType {
  MintEvent = 'MINT_EVENT',
  SaleEvent = 'SALE_EVENT',
  TransferEvent = 'TRANSFER_EVENT',
  V1MarketEvent = 'V1_MARKET_EVENT',
  V2AuctionEvent = 'V2_AUCTION_EVENT',
  V3AskEvent = 'V3_ASK_EVENT'
}

export type EventsQueryFilter = {
  eventTypes?: InputMaybe<Array<EventType>>;
  recipientAddresses?: InputMaybe<Array<Scalars['String']>>;
  senderAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type EventsQueryInput = {
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  tokenInputs?: InputMaybe<Array<TokenInput>>;
};

export type FloatValue = {
  __typename?: 'FloatValue';
  unit: Scalars['String'];
  value?: Maybe<Scalars['Float']>;
};

export type IntValue = {
  __typename?: 'IntValue';
  unit: Scalars['String'];
  value: Scalars['Int'];
};

export type IntValueFloatValue = FloatValue | IntValue;

export type Market = {
  __typename?: 'Market';
  collectionAddress: Scalars['String'];
  marketAddress: Scalars['String'];
  marketType: MarketType;
  networkInfo: NetworkInfo;
  price?: Maybe<PriceAtTime>;
  properties: MarketProperties;
  status: Scalars['String'];
  tokenId: Scalars['String'];
};

export type MarketFilter = {
  marketType: MarketType;
  statuses: Array<MarketStatus>;
};

export type MarketProperties = V1Ask | V1BidShare | V1Offer | V2Auction | V3Ask;

export enum MarketSortKey {
  EthPrice = 'ETH_PRICE',
  NativePrice = 'NATIVE_PRICE',
  TimedSaleEnding = 'TIMED_SALE_ENDING'
}

export type MarketSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: MarketSortKey;
};

export enum MarketStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED'
}

export enum MarketType {
  V1Ask = 'V1_ASK',
  V1BidShare = 'V1_BID_SHARE',
  V1Offer = 'V1_OFFER',
  V2Auction = 'V2_AUCTION',
  V3Ask = 'V3_ASK'
}

export type MarketWithTokenInfo = {
  __typename?: 'MarketWithTokenInfo';
  collectionAddress: Scalars['String'];
  marketAddress: Scalars['String'];
  marketType: MarketType;
  networkInfo: NetworkInfo;
  price?: Maybe<PriceAtTime>;
  properties: MarketProperties;
  status: Scalars['String'];
  token?: Maybe<Token>;
  tokenId: Scalars['String'];
};

export type MarketWithTokenInfoConnection = {
  __typename?: 'MarketWithTokenInfoConnection';
  nodes: Array<MarketWithTokenInfo>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MarketsQueryFilter = {
  marketFilters?: InputMaybe<Array<MarketFilter>>;
  priceFilter?: InputMaybe<PriceFilter>;
};

export type MarketsQueryInput = {
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  ownerAddressesInput?: InputMaybe<AddressesInput>;
  tokenInputs?: InputMaybe<Array<TokenInput>>;
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
  logIndex: Scalars['Int'];
  transactionHash: Scalars['String'];
};

export type MintEvent = {
  __typename?: 'MintEvent';
  collectionAddress: Scalars['String'];
  fee: PriceAtTime;
  originatorAddress: Scalars['String'];
  toAddress: Scalars['String'];
  tokenId: Scalars['String'];
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

export type PriceAtTime = {
  __typename?: 'PriceAtTime';
  blockNumber: Scalars['Int'];
  ethPrice?: Maybe<CurrencyAmount>;
  nativePrice: CurrencyAmount;
  usdcPrice?: Maybe<CurrencyAmount>;
};

export type PriceFilter = {
  currencyAddress?: InputMaybe<Scalars['String']>;
  maximumEthPrice?: InputMaybe<Scalars['String']>;
  maximumNativePrice?: InputMaybe<Scalars['String']>;
  minimumEthPrice?: InputMaybe<Scalars['String']>;
  minimumNativePrice?: InputMaybe<Scalars['String']>;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  /** Get aggregate attribute set */
  aggregateAttributes: Array<AggregateAttribute>;
  /** Calculate aggregate stat */
  aggregateStat: AggregateStat;
  /** Get collections */
  collections: CollectionConnection;
  /** Get events */
  events: EventConnection;
  /** Get markets */
  markets: MarketWithTokenInfoConnection;
  /** Get sales */
  sales: SaleConnection;
  /** Get token by collection address and token id */
  token?: Maybe<Token>;
  /** Get token markets */
  tokenMarkets: TokenMarketConnection;
  /** Get tokens */
  tokens: TokenConnection;
};


export type RootQueryAggregateAttributesArgs = {
  input: AggregateAttributesQueryInput;
  network: NetworkInput;
};


export type RootQueryAggregateStatArgs = {
  input: AggregateStatQueryInput;
  network: NetworkInput;
  statType: StatType;
};


export type RootQueryCollectionsArgs = {
  input?: InputMaybe<CollectionsQueryInput>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
};


export type RootQueryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>;
  input?: InputMaybe<EventsQueryInput>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: EventSortKeySortInput;
};


export type RootQueryMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>;
  input?: InputMaybe<MarketsQueryInput>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: MarketSortKeySortInput;
};


export type RootQuerySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>;
  input?: InputMaybe<SalesQueryInput>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: SaleSortKeySortInput;
};


export type RootQueryTokenArgs = {
  network: NetworkInput;
  token: TokenInput;
};


export type RootQueryTokenMarketsArgs = {
  filter?: InputMaybe<TokenMarketsFilterInput>;
  input?: InputMaybe<TokenMarketsQueryInput>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: TokenMarketSortKeySortInput;
};


export type RootQueryTokensArgs = {
  filter?: InputMaybe<TokensQueryFilter>;
  input?: InputMaybe<TokensQueryInput>;
  network: NetworkInput;
  pagination: PaginationInput;
  sort: TokenSortKeySortInput;
};

export type Sale = {
  __typename?: 'Sale';
  buyerAddress: Scalars['String'];
  collectionAddress: Scalars['String'];
  price: PriceAtTime;
  saleContractAddress?: Maybe<Scalars['String']>;
  saleType: SaleEventType;
  sellerAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type SaleConnection = {
  __typename?: 'SaleConnection';
  nodes: Array<Sale>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum SaleEventType {
  FoundationSale = 'FOUNDATION_SALE',
  LarvaLabsSale = 'LARVA_LABS_SALE',
  LooksRareSale = 'LOOKS_RARE_SALE',
  OpenseaSale = 'OPENSEA_SALE',
  RaribleSale = 'RARIBLE_SALE',
  SuperrareSale = 'SUPERRARE_SALE',
  ZeroxSale = 'ZEROX_SALE',
  ZoraSale = 'ZORA_SALE'
}

export type SaleFilter = {
  saleType: SaleType;
};

export enum SaleSortKey {
  EthPrice = 'ETH_PRICE',
  NativePrice = 'NATIVE_PRICE'
}

export type SaleSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: SaleSortKey;
};

export enum SaleType {
  OpenseaBundleSale = 'OPENSEA_BUNDLE_SALE',
  OpenseaSingleSale = 'OPENSEA_SINGLE_SALE'
}

export type SalesQueryFilter = {
  saleFilters: Array<SaleFilter>;
};

export type SalesQueryInput = {
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  ownerAddressesInput?: InputMaybe<AddressesInput>;
  tokenInputs?: InputMaybe<Array<TokenInput>>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum StatType {
  FloorPrice = 'FLOOR_PRICE',
  NftCount = 'NFT_COUNT',
  OwnerCount = 'OWNER_COUNT',
  SalesVolume = 'SALES_VOLUME'
}

export type Token = {
  __typename?: 'Token';
  attributes?: Maybe<Array<TokenAttribute>>;
  collectionAddress: Scalars['String'];
  content?: Maybe<TokenContentMedia>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<TokenContentMedia>;
  lastRefreshTime?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['JSONScalar']>;
  mintInfo?: Maybe<MintContext>;
  minter?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  networkInfo: NetworkInfo;
  owner: Scalars['String'];
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
  collectionAddress: Scalars['String'];
  creator: Scalars['String'];
  description: Scalars['String'];
  externalUrl: Scalars['String'];
  iconUrl: Scalars['String'];
  name: Scalars['String'];
  network: Scalars['String'];
  schema: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
};

export type TokenInput = {
  address: Scalars['String'];
  tokenId: Scalars['String'];
};

export type TokenMarket = {
  __typename?: 'TokenMarket';
  events: EventConnection;
  markets: Array<Market>;
  sales: SaleConnection;
  token: Token;
};


export type TokenMarketEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>;
  pagination: PaginationInput;
  sort: EventSortKeySortInput;
};


export type TokenMarketSalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>;
  pagination: PaginationInput;
  sort: SaleSortKeySortInput;
};

export type TokenMarketConnection = {
  __typename?: 'TokenMarketConnection';
  nodes: Array<TokenMarket>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export enum TokenMarketSortKey {
  Minted = 'MINTED',
  TimedSaleEnding = 'TIMED_SALE_ENDING',
  TokenId = 'TOKEN_ID',
  Transferred = 'TRANSFERRED'
}

export type TokenMarketSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: TokenMarketSortKey;
};

export type TokenMarketsFilterInput = {
  attributeFilters?: InputMaybe<Array<AttributeFilter>>;
  marketFilters?: InputMaybe<Array<MarketFilter>>;
};

export type TokenMarketsQueryInput = {
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  ownerAddressesInput?: InputMaybe<AddressesInput>;
  tokenInputs?: InputMaybe<Array<TokenInput>>;
};

export enum TokenSortKey {
  Minted = 'MINTED',
  TokenId = 'TOKEN_ID',
  Transferred = 'TRANSFERRED'
}

export type TokenSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: TokenSortKey;
};

export type TokensQueryFilter = {
  attributeFilters: Array<AttributeFilter>;
};

export type TokensQueryInput = {
  collectionAddressesInput?: InputMaybe<AddressesInput>;
  ownerAddressesInput?: InputMaybe<AddressesInput>;
  tokenInputs?: InputMaybe<Array<TokenInput>>;
};

export type TransferEvent = {
  __typename?: 'TransferEvent';
  collectionAddress: Scalars['String'];
  fromAddress: Scalars['String'];
  toAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type V1Ask = {
  __typename?: 'V1Ask';
  amount: PriceAtTime;
  collectionAddress: Scalars['String'];
  currency: Scalars['String'];
  status: V1MarketEntityStatus;
  tokenId: Scalars['String'];
};

export type V1BidShare = {
  __typename?: 'V1BidShare';
  creator: Scalars['String'];
  owner: Scalars['String'];
  previousOwner: Scalars['String'];
  status: V1MarketEntityStatus;
  tokenId: Scalars['String'];
};

export type V1MarketAskCreatedEventProperties = {
  __typename?: 'V1MarketAskCreatedEventProperties';
  amount: Scalars['String'];
  currency: Scalars['String'];
  price: PriceAtTime;
};

export type V1MarketAskRemovedEventProperties = {
  __typename?: 'V1MarketAskRemovedEventProperties';
  amount: Scalars['String'];
  currency: Scalars['String'];
  price: PriceAtTime;
};

export type V1MarketBidShareUpdatedEventProperties = {
  __typename?: 'V1MarketBidShareUpdatedEventProperties';
  creator: Scalars['String'];
  owner: Scalars['String'];
  previousOwner: Scalars['String'];
};

export enum V1MarketEntityStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED'
}

export type V1MarketEvent = {
  __typename?: 'V1MarketEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  eventType: V1MarketEventType;
  properties: V1MarketEventProperties;
  tokenId: Scalars['String'];
};

export type V1MarketEventProperties = V1MarketAskCreatedEventProperties | V1MarketAskRemovedEventProperties | V1MarketBidShareUpdatedEventProperties | V1MarketOfferCreatedEventProperties | V1MarketOfferFinalizedEventProperties | V1MarketOfferRemovedEventProperties;

export enum V1MarketEventType {
  V1MarketAskCreated = 'V1_MARKET_ASK_CREATED',
  V1MarketAskRemoved = 'V1_MARKET_ASK_REMOVED',
  V1MarketBidCreated = 'V1_MARKET_BID_CREATED',
  V1MarketBidFinalized = 'V1_MARKET_BID_FINALIZED',
  V1MarketBidRemoved = 'V1_MARKET_BID_REMOVED',
  V1MarketBidShareUpdated = 'V1_MARKET_BID_SHARE_UPDATED'
}

export type V1MarketOfferCreatedEventProperties = {
  __typename?: 'V1MarketOfferCreatedEventProperties';
  amount: Scalars['String'];
  bidder: Scalars['String'];
  currency: Scalars['String'];
  price: PriceAtTime;
  recipient: Scalars['String'];
  sellOnShare: Scalars['String'];
};

export type V1MarketOfferFinalizedEventProperties = {
  __typename?: 'V1MarketOfferFinalizedEventProperties';
  amount: Scalars['String'];
  bidder: Scalars['String'];
  currency: Scalars['String'];
  price: PriceAtTime;
  recipient: Scalars['String'];
  sellOnShare: Scalars['String'];
};

export type V1MarketOfferRemovedEventProperties = {
  __typename?: 'V1MarketOfferRemovedEventProperties';
  amount: Scalars['String'];
  bidder: Scalars['String'];
  currency: Scalars['String'];
  price: PriceAtTime;
  recipient: Scalars['String'];
  sellOnShare: Scalars['String'];
};

export type V1Offer = {
  __typename?: 'V1Offer';
  amount: PriceAtTime;
  bidder: Scalars['String'];
  currency: Scalars['String'];
  recipient: Scalars['String'];
  sellOnShare: Scalars['String'];
  status: V1MarketEntityStatus;
  tokenId: Scalars['String'];
};

export type V2Auction = {
  __typename?: 'V2Auction';
  address: Scalars['String'];
  amountCuratorReceived?: Maybe<PriceAtTime>;
  amountTokenOwnerReceived?: Maybe<PriceAtTime>;
  approved: Scalars['Boolean'];
  auctionCurrency: Scalars['String'];
  auctionId: Scalars['String'];
  collectionAddress: Scalars['String'];
  curator: Scalars['String'];
  curatorFeePercentage: Scalars['Int'];
  duration: Scalars['String'];
  estimatedExpirationTime?: Maybe<Scalars['DateTime']>;
  firstBidTime?: Maybe<Scalars['DateTime']>;
  highestBidPrice?: Maybe<PriceAtTime>;
  highestBidder?: Maybe<Scalars['String']>;
  reservePrice: PriceAtTime;
  status: V2AuctionStatus;
  tokenId: Scalars['String'];
  tokenOwner: Scalars['String'];
};

export type V2AuctionApprovalUpdatedEventProperties = {
  __typename?: 'V2AuctionApprovalUpdatedEventProperties';
  approved: Scalars['Boolean'];
};

export type V2AuctionBidEventProperties = {
  __typename?: 'V2AuctionBidEventProperties';
  extended: Scalars['Boolean'];
  firstBid: Scalars['Boolean'];
  price: PriceAtTime;
  sender: Scalars['String'];
  value: Scalars['String'];
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
  duration: Scalars['String'];
  price: PriceAtTime;
  reservePrice: Scalars['String'];
  tokenOwner: Scalars['String'];
};

export type V2AuctionDurationExtendedEventProperties = {
  __typename?: 'V2AuctionDurationExtendedEventProperties';
  duration: Scalars['String'];
};

export type V2AuctionEndedEventProperties = {
  __typename?: 'V2AuctionEndedEventProperties';
  amount: Scalars['String'];
  auctionCurrency: Scalars['String'];
  curator: Scalars['String'];
  curatorFee: Scalars['String'];
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
  tokenId: Scalars['String'];
};

export type V2AuctionEventProperties = V2AuctionApprovalUpdatedEventProperties | V2AuctionBidEventProperties | V2AuctionCanceledEventProperties | V2AuctionCreatedEventProperties | V2AuctionDurationExtendedEventProperties | V2AuctionEndedEventProperties | V2AuctionReservePriceUpdatedEventProperties;

export enum V2AuctionEventType {
  V2AuctionApprovalUpdated = 'V2_AUCTION_APPROVAL_UPDATED',
  V2AuctionBid = 'V2_AUCTION_BID',
  V2AuctionCanceled = 'V2_AUCTION_CANCELED',
  V2AuctionCreated = 'V2_AUCTION_CREATED',
  V2AuctionDurationExtended = 'V2_AUCTION_DURATION_EXTENDED',
  V2AuctionEnded = 'V2_AUCTION_ENDED',
  V2AuctionReservePriceUpdated = 'V2_AUCTION_RESERVE_PRICE_UPDATED'
}

export type V2AuctionReservePriceUpdatedEventProperties = {
  __typename?: 'V2AuctionReservePriceUpdatedEventProperties';
  price: PriceAtTime;
  reservePrice: Scalars['String'];
};

export enum V2AuctionStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED'
}

export type V3Ask = {
  __typename?: 'V3Ask';
  address: Scalars['String'];
  askCurrency: Scalars['String'];
  askPrice: PriceAtTime;
  buyer?: Maybe<Scalars['String']>;
  collectionAddress: Scalars['String'];
  finder?: Maybe<Scalars['String']>;
  findersFeeBps: Scalars['Int'];
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  status: V3AskStatus;
  tokenId: Scalars['String'];
};

export type V3AskCanceledEventProperties = {
  __typename?: 'V3AskCanceledEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['String'];
  findersFeeBps: Scalars['Int'];
  price: PriceAtTime;
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export type V3AskCreatedEventProperties = {
  __typename?: 'V3AskCreatedEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['String'];
  findersFeeBps: Scalars['Int'];
  price: PriceAtTime;
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export type V3AskEvent = {
  __typename?: 'V3AskEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  eventType: V3AskEventType;
  properties: V3AskEventProperties;
  tokenId: Scalars['String'];
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
  askPrice: Scalars['String'];
  buyer: Scalars['String'];
  finder: Scalars['String'];
  findersFeeBps: Scalars['Int'];
  price: PriceAtTime;
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export type V3AskPriceUpdatedEventProperties = {
  __typename?: 'V3AskPriceUpdatedEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['String'];
  findersFeeBps: Scalars['Int'];
  price: PriceAtTime;
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
};

export enum V3AskStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED'
}

export const PriceSummaryFragmentDoc = gql`
    fragment PriceSummary on PriceAtTime {
  blockNumber
  ethPrice {
    decimal
  }
  nativePrice {
    decimal
    currency {
      address
      decimals
      name
    }
  }
  usdcPrice {
    decimal
  }
}
    `;
export const MarketInfoFragmentDoc = gql`
    fragment MarketInfo on Market {
  collectionAddress
  marketAddress
  marketType
  price {
    ...PriceSummary
  }
  status
  networkInfo {
    chain
    network
  }
}
    ${PriceSummaryFragmentDoc}`;
export const MarketPropertiesFullFragmentDoc = gql`
    fragment MarketPropertiesFull on MarketProperties {
  ... on V2Auction {
    __typename
    firstBidTime
    highestBidder
    curator
    collectionAddress
    curatorFeePercentage
    duration
    estimatedExpirationTime
    auctionStatus: status
    tokenOwner
    address
    auctionId
    approved
    reservePrice {
      ...PriceSummary
    }
  }
  ... on V3Ask {
    __typename
    buyer
    finder
    findersFeeBps
    sellerFundsRecipient
    askStatus: status
    seller
    askPrice {
      ...PriceSummary
    }
  }
}
    ${PriceSummaryFragmentDoc}`;
export const MarketDetailsFragmentDoc = gql`
    fragment MarketDetails on Market {
  properties {
    ...MarketPropertiesFull
  }
}
    ${MarketPropertiesFullFragmentDoc}`;
export const TokenContractInfoFragmentDoc = gql`
    fragment TokenContractInfo on TokenContract {
  name
  network
  iconUrl
  description
  collectionAddress
  symbol
  chain
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
export const TokenInfoFragmentDoc = gql`
    fragment TokenInfo on Token {
  minter
  tokenId
  tokenContract {
    ...TokenContractInfo
  }
  mintInfo {
    blockTimestamp
    blockNumber
    transactionHash
  }
  collectionAddress
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
    ${TokenContractInfoFragmentDoc}
${FullMediaFragmentDoc}`;
export const TokenDetailsFragmentDoc = gql`
    fragment TokenDetails on Token {
  metadata
  tokenUrl
  tokenUrlMimeType
}
    `;
export const CollectionInfoFragmentDoc = gql`
    fragment CollectionInfo on Collection {
  address
  description
  name
  symbol
  totalSupply
}
    `;
export const CollectionDetailsFragmentDoc = gql`
    fragment CollectionDetails on Collection {
  attributes {
    traitType
    valueMetrics {
      count
      percent
      value
    }
  }
}
    `;
export const PageInfoDefaultFragmentDoc = gql`
    fragment PageInfoDefault on PageInfo {
  limit
  offset
}
    `;
export const CollectionsDocument = gql`
    query collections($network: NetworkInput!, $query: CollectionsQueryInput!, $pagination: PaginationInput!, $sort: CollectionSortKeySortInput!, $isFull: Boolean!) {
  collections(
    input: $query
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
      ...CollectionInfo
      ...CollectionDetails @include(if: $isFull)
    }
  }
}
    ${CollectionInfoFragmentDoc}
${CollectionDetailsFragmentDoc}`;
export const TokenMarketsDocument = gql`
    query tokenMarkets($network: NetworkInput!, $query: TokenMarketsQueryInput!, $pagination: PaginationInput!, $filter: TokenMarketsFilterInput, $sort: TokenMarketSortKeySortInput!, $isFull: Boolean!) {
  tokenMarkets(
    input: $query
    network: $network
    filter: $filter
    pagination: $pagination
    sort: $sort
  ) {
    nodes {
      markets {
        ...MarketInfo
        ...MarketDetails @include(if: $isFull)
      }
      token {
        ...TokenInfo
        ...TokenDetails @include(if: $isFull)
      }
    }
    pageInfo {
      ...PageInfoDefault
    }
  }
}
    ${MarketInfoFragmentDoc}
${MarketDetailsFragmentDoc}
${TokenInfoFragmentDoc}
${TokenDetailsFragmentDoc}
${PageInfoDefaultFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    collections(variables: CollectionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CollectionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectionsQuery>(CollectionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'collections');
    },
    tokenMarkets(variables: TokenMarketsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenMarketsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenMarketsQuery>(TokenMarketsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tokenMarkets');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type TokenContractInfoFragment = { __typename?: 'TokenContract', name: string, network: string, iconUrl: string, description: string, collectionAddress: string, symbol: string, chain: number };

export type FullMediaFragment = { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null };

export type PriceSummaryFragment = { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null };

type MarketPropertiesFull_V1Ask_Fragment = { __typename?: 'V1Ask' };

type MarketPropertiesFull_V1BidShare_Fragment = { __typename?: 'V1BidShare' };

type MarketPropertiesFull_V1Offer_Fragment = { __typename?: 'V1Offer' };

type MarketPropertiesFull_V2Auction_Fragment = { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, duration: string, estimatedExpirationTime?: any | null, tokenOwner: string, address: string, auctionId: string, approved: boolean, auctionStatus: V2AuctionStatus, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } };

type MarketPropertiesFull_V3Ask_Fragment = { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps: number, sellerFundsRecipient: string, seller: string, askStatus: V3AskStatus, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } };

export type MarketPropertiesFullFragment = MarketPropertiesFull_V1Ask_Fragment | MarketPropertiesFull_V1BidShare_Fragment | MarketPropertiesFull_V1Offer_Fragment | MarketPropertiesFull_V2Auction_Fragment | MarketPropertiesFull_V3Ask_Fragment;

export type MarketInfoFragment = { __typename?: 'Market', collectionAddress: string, marketAddress: string, marketType: MarketType, status: string, price?: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network } };

export type MarketDetailsFragment = { __typename?: 'Market', properties: { __typename?: 'V1Ask' } | { __typename?: 'V1BidShare' } | { __typename?: 'V1Offer' } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, duration: string, estimatedExpirationTime?: any | null, tokenOwner: string, address: string, auctionId: string, approved: boolean, auctionStatus: V2AuctionStatus, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps: number, sellerFundsRecipient: string, seller: string, askStatus: V3AskStatus, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } } };

export type TokenInfoFragment = { __typename?: 'Token', minter?: string | null, tokenId: string, collectionAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, tokenContract: { __typename?: 'TokenContract', name: string, network: string, iconUrl: string, description: string, collectionAddress: string, symbol: string, chain: number }, mintInfo?: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null };

export type TokenDetailsFragment = { __typename?: 'Token', metadata?: any | null, tokenUrl: string, tokenUrlMimeType?: string | null };

export type CollectionInfoFragment = { __typename?: 'Collection', address: string, description: string, name: string, symbol: string, totalSupply?: number | null };

export type CollectionDetailsFragment = { __typename?: 'Collection', attributes?: Array<{ __typename?: 'CollectionAttribute', traitType: string, valueMetrics: Array<{ __typename?: 'CollectionAttributeValue', count: number, percent: number, value: string }> }> | null };

export type PageInfoDefaultFragment = { __typename?: 'PageInfo', limit: number, offset: number };

export type CollectionsQueryVariables = Exact<{
  network: NetworkInput;
  query: CollectionsQueryInput;
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
  isFull: Scalars['Boolean'];
}>;


export type CollectionsQuery = { __typename?: 'RootQuery', collections: { __typename?: 'CollectionConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', limit: number, offset: number }, nodes: Array<{ __typename?: 'Collection', address: string, description: string, name: string, symbol: string, totalSupply?: number | null, attributes?: Array<{ __typename?: 'CollectionAttribute', traitType: string, valueMetrics: Array<{ __typename?: 'CollectionAttributeValue', count: number, percent: number, value: string }> }> | null }> } };

export type TokenMarketsQueryVariables = Exact<{
  network: NetworkInput;
  query: TokenMarketsQueryInput;
  pagination: PaginationInput;
  filter?: InputMaybe<TokenMarketsFilterInput>;
  sort: TokenMarketSortKeySortInput;
  isFull: Scalars['Boolean'];
}>;


export type TokenMarketsQuery = { __typename?: 'RootQuery', tokenMarkets: { __typename?: 'TokenMarketConnection', nodes: Array<{ __typename?: 'TokenMarket', markets: Array<{ __typename?: 'Market', collectionAddress: string, marketAddress: string, marketType: MarketType, status: string, price?: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, properties: { __typename?: 'V1Ask' } | { __typename?: 'V1BidShare' } | { __typename?: 'V1Offer' } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, duration: string, estimatedExpirationTime?: any | null, tokenOwner: string, address: string, auctionId: string, approved: boolean, auctionStatus: V2AuctionStatus, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps: number, sellerFundsRecipient: string, seller: string, askStatus: V3AskStatus, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, ethPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } } }>, token: { __typename?: 'Token', minter?: string | null, tokenId: string, collectionAddress: string, lastRefreshTime?: number | null, owner: string, name?: string | null, description?: string | null, metadata?: any | null, tokenUrl: string, tokenUrlMimeType?: string | null, tokenContract: { __typename?: 'TokenContract', name: string, network: string, iconUrl: string, description: string, collectionAddress: string, symbol: string, chain: number }, mintInfo?: { __typename?: 'MintContext', blockTimestamp: any, blockNumber: number, transactionHash: string } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaType?: MediaType | null, mediaEncoding?: { __typename?: 'MediaEncoding', preview: string, original: string } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', limit: number, offset: number } } };
