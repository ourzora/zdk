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
  /** The GenericScalar scalar type represents a generic GraphQL scalar value that could be: List or Object. */
  JSONScalar: any;
  datetime: any;
};

export type ActiveMarket = {
  __typename?: 'ActiveMarket';
  collectionAddress?: Maybe<Scalars['String']>;
  marketAddress: Scalars['String'];
  marketType: ActiveMarketType;
  networkInfo: NetworkInfo;
  price?: Maybe<PriceAtTime>;
  properties?: Maybe<ActiveMarketProperties>;
  status: Scalars['String'];
  tokenId?: Maybe<Scalars['String']>;
  transactionInfo: TransactionInfo;
};

export type ActiveMarketProperties = LilNounsAuction | NounsAuction | V2Auction | V3ReserveAuction;

export type ActiveMarketQueryInput = {
  marketType: ActiveMarketType;
  token?: InputMaybe<TokenInput>;
};

export enum ActiveMarketType {
  ActiveLilNounsAuction = 'ACTIVE_LIL_NOUNS_AUCTION',
  ActiveNounsAuction = 'ACTIVE_NOUNS_AUCTION',
  ActiveV2Auction = 'ACTIVE_V2_AUCTION',
  ActiveV3ReserveAuction = 'ACTIVE_V3_RESERVE_AUCTION'
}

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
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  ownerAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export type AggregateStat = {
  __typename?: 'AggregateStat';
  floorPrice?: Maybe<Scalars['Float']>;
  nftCount: Scalars['Int'];
  ownerCount: Scalars['Int'];
  ownersByCount: OwnerCountConnection;
  salesVolume: SalesVolume;
};


export type AggregateStatFloorPriceArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  where: CollectionAddressAndAttributesInput;
};


export type AggregateStatNftCountArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  where: CollectionAddressOwnerAddressAttributesInput;
};


export type AggregateStatOwnerCountArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  where: CollectionAddressAndAttributesInput;
};


export type AggregateStatOwnersByCountArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  where: OwnersByCountQueryInput;
};


export type AggregateStatSalesVolumeArgs = {
  filter?: InputMaybe<SalesVolumeFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  where: CollectionAddressOwnerAddressAttributesInput;
};

export type ApprovalEvent = {
  __typename?: 'ApprovalEvent';
  approvalEventType: ApprovalEventType;
  approved?: Maybe<Scalars['Boolean']>;
  approvedAddress: Scalars['String'];
  collectionAddress: Scalars['String'];
  ownerAddress: Scalars['String'];
  tokenId?: Maybe<Scalars['String']>;
};

export enum ApprovalEventType {
  Approval = 'APPROVAL',
  ApprovalForAll = 'APPROVAL_FOR_ALL'
}

export type AttributeFilter = {
  traitType: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type AudioEncodingTypes = {
  __typename?: 'AudioEncodingTypes';
  large?: Maybe<Scalars['String']>;
  original: Scalars['String'];
};

export enum Chain {
  Goerli = 'GOERLI',
  Mainnet = 'MAINNET',
  Rinkeby = 'RINKEBY'
}

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String'];
  attributes?: Maybe<Array<CollectionAttribute>>;
  description: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  networkInfo: NetworkInfo;
  symbol?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['Int']>;
};

export type CollectionAddressAndAttributesInput = {
  attributes?: InputMaybe<Array<AttributeFilter>>;
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type CollectionAddressOwnerAddressAttributesInput = {
  attributes?: InputMaybe<Array<AttributeFilter>>;
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  ownerAddresses?: InputMaybe<Array<Scalars['String']>>;
};

export type CollectionAttribute = {
  __typename?: 'CollectionAttribute';
  traitType?: Maybe<Scalars['String']>;
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
};

export enum CollectionSortKey {
  Created = 'CREATED',
  Name = 'NAME',
  None = 'NONE'
}

export type CollectionSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: CollectionSortKey;
};

export type CollectionsQueryInput = {
  collectionAddresses: Array<Scalars['String']>;
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
  collectionAddress?: Maybe<Scalars['String']>;
  eventType: EventType;
  networkInfo: NetworkInfo;
  properties: EventProperties;
  tokenId?: Maybe<Scalars['String']>;
  transactionInfo: TransactionInfo;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  nodes: Array<Event>;
  pageInfo: PageInfo;
};

export type EventProperties = ApprovalEvent | LilNounsAuctionEvent | MintEvent | NounsAuctionEvent | Sale | SeaportEvent | TransferEvent | V1MarketEvent | V2AuctionEvent | V3AskEvent | V3ReserveAuctionEvent;

export enum EventSortKey {
  Created = 'CREATED'
}

export type EventSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: EventSortKey;
};

export enum EventType {
  ApprovalEvent = 'APPROVAL_EVENT',
  LilNounsAuctionEvent = 'LIL_NOUNS_AUCTION_EVENT',
  MintEvent = 'MINT_EVENT',
  NounsAuctionEvent = 'NOUNS_AUCTION_EVENT',
  SaleEvent = 'SALE_EVENT',
  SeaportEvent = 'SEAPORT_EVENT',
  TransferEvent = 'TRANSFER_EVENT',
  V1MarketEvent = 'V1_MARKET_EVENT',
  V2AuctionEvent = 'V2_AUCTION_EVENT',
  V3AskEvent = 'V3_ASK_EVENT',
  V3ReserveAuctionEvent = 'V3_RESERVE_AUCTION_EVENT'
}

export type EventsQueryFilter = {
  bidderAddresses?: InputMaybe<Array<Scalars['String']>>;
  eventTypes?: InputMaybe<Array<EventType>>;
  recipientAddresses?: InputMaybe<Array<Scalars['String']>>;
  sellerAddresses?: InputMaybe<Array<Scalars['String']>>;
  senderAddresses?: InputMaybe<Array<Scalars['String']>>;
  timeFilter?: InputMaybe<TimeFilter>;
};

export type EventsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export type ImageEncodingTypes = {
  __typename?: 'ImageEncodingTypes';
  large?: Maybe<Scalars['String']>;
  original: Scalars['String'];
  poster?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type ImageEncodingTypesVideoEncodingTypesAudioEncodingTypesUnsupportedEncodingTypes = AudioEncodingTypes | ImageEncodingTypes | UnsupportedEncodingTypes | VideoEncodingTypes;

export type LilNounsAuction = {
  __typename?: 'LilNounsAuction';
  address: Scalars['String'];
  amount?: Maybe<PriceAtTime>;
  auctionCurrency: Scalars['String'];
  auctionId: Scalars['String'];
  collectionAddress: Scalars['String'];
  duration: Scalars['String'];
  endTime: Scalars['String'];
  estimatedDurationTime?: Maybe<Scalars['datetime']>;
  firstBidTime?: Maybe<Scalars['datetime']>;
  highestBidPrice?: Maybe<PriceAtTime>;
  highestBidder?: Maybe<Scalars['String']>;
  minBidIncrementPercentage?: Maybe<Scalars['Int']>;
  reservePrice?: Maybe<PriceAtTime>;
  startTime: Scalars['String'];
  timeBuffer?: Maybe<Scalars['Int']>;
  tokenId: Scalars['String'];
  winner?: Maybe<Scalars['String']>;
};

export type LilNounsAuctionBidEventProperties = {
  __typename?: 'LilNounsAuctionBidEventProperties';
  extended: Scalars['Boolean'];
  lilNounId: Scalars['String'];
  sender: Scalars['String'];
  value: Scalars['String'];
};

export type LilNounsAuctionCreatedEventProperties = {
  __typename?: 'LilNounsAuctionCreatedEventProperties';
  endTime: Scalars['String'];
  lilNounId: Scalars['String'];
  startTime: Scalars['String'];
};

export type LilNounsAuctionEvent = {
  __typename?: 'LilNounsAuctionEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  lilNounsAuctionEventType: LilNounsAuctionEventType;
  properties: LilNounsAuctionEventProperties;
  tokenId: Scalars['String'];
};

export type LilNounsAuctionEventProperties = LilNounsAuctionBidEventProperties | LilNounsAuctionCreatedEventProperties | LilNounsAuctionExtendedEventProperties | LilNounsAuctionMinBidIncrementPercentageUpdatedEventProperties | LilNounsAuctionReservePriceUpdatedEventProperties | LilNounsAuctionSettledEventProperties | LilNounsAuctionTimeBufferUpdatedEventProperties;

export enum LilNounsAuctionEventType {
  LilNounsAuctionHouseAuctionBidEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  LilNounsAuctionHouseAuctionCreatedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  LilNounsAuctionHouseAuctionExtendedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  LilNounsAuctionHouseAuctionMinBidIncrementPercentageUpdated = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED',
  LilNounsAuctionHouseAuctionReservePriceUpdatedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  LilNounsAuctionHouseAuctionSettledEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
  LilNounsAuctionHouseAuctionTimeBufferUpdatedEvent = 'LIL_NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT'
}

export type LilNounsAuctionExtendedEventProperties = {
  __typename?: 'LilNounsAuctionExtendedEventProperties';
  endTime: Scalars['String'];
  lilNounId: Scalars['String'];
};

export type LilNounsAuctionMinBidIncrementPercentageUpdatedEventProperties = {
  __typename?: 'LilNounsAuctionMinBidIncrementPercentageUpdatedEventProperties';
  minBidIncrementPercentage: Scalars['String'];
};

export type LilNounsAuctionReservePriceUpdatedEventProperties = {
  __typename?: 'LilNounsAuctionReservePriceUpdatedEventProperties';
  reservePrice: Scalars['String'];
};

export type LilNounsAuctionSettledEventProperties = {
  __typename?: 'LilNounsAuctionSettledEventProperties';
  amount: Scalars['String'];
  lilNounId: Scalars['String'];
  price: PriceAtTime;
  winner: Scalars['String'];
};

export type LilNounsAuctionTimeBufferUpdatedEventProperties = {
  __typename?: 'LilNounsAuctionTimeBufferUpdatedEventProperties';
  timeBuffer: Scalars['String'];
};

export type Market = {
  __typename?: 'Market';
  collectionAddress?: Maybe<Scalars['String']>;
  marketAddress: Scalars['String'];
  marketType: MarketType;
  networkInfo: NetworkInfo;
  price?: Maybe<PriceAtTime>;
  properties?: Maybe<MarketProperties>;
  status: Scalars['String'];
  tokenId?: Maybe<Scalars['String']>;
  transactionInfo: TransactionInfo;
};

export enum MarketCategory {
  Ask = 'ASK',
  Auction = 'AUCTION',
  Offer = 'OFFER'
}

export type MarketProperties = LilNounsAuction | NounsAuction | V1Ask | V1BidShare | V1Offer | V2Auction | V3Ask | V3ReserveAuction;

export enum MarketSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  Created = 'CREATED',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  TimedSaleEnding = 'TIMED_SALE_ENDING'
}

export type MarketSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: MarketSortKey;
};

export enum MarketStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Invalid = 'INVALID'
}

export enum MarketType {
  LilNounsAuction = 'LIL_NOUNS_AUCTION',
  NounsAuction = 'NOUNS_AUCTION',
  V1Ask = 'V1_ASK',
  V1BidShare = 'V1_BID_SHARE',
  V1Offer = 'V1_OFFER',
  V2Auction = 'V2_AUCTION',
  V3Ask = 'V3_ASK',
  V3ReserveAuction = 'V3_RESERVE_AUCTION'
}

export type MarketTypeFilter = {
  bidderAddresses?: InputMaybe<Array<Scalars['String']>>;
  marketType: MarketType;
  statuses?: InputMaybe<Array<MarketStatus>>;
};

export type MarketWithToken = {
  __typename?: 'MarketWithToken';
  market: Market;
  token?: Maybe<Token>;
};

export type MarketWithTokenConnection = {
  __typename?: 'MarketWithTokenConnection';
  nodes: Array<MarketWithToken>;
  pageInfo: PageInfo;
};

export type MarketsQueryFilter = {
  marketFilters?: InputMaybe<Array<MarketTypeFilter>>;
  priceFilter?: InputMaybe<PriceFilter>;
};

export type MarketsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export enum MediaType {
  Audio = 'AUDIO',
  Gif = 'GIF',
  Html = 'HTML',
  Image = 'IMAGE',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export type Mint = {
  __typename?: 'Mint';
  collectionAddress: Scalars['String'];
  networkInfo: NetworkInfo;
  originatorAddress: Scalars['String'];
  price: PriceAtTime;
  toAddress: Scalars['String'];
  tokenId: Scalars['String'];
  transactionInfo: TransactionInfo;
};

export type MintEvent = {
  __typename?: 'MintEvent';
  collectionAddress: Scalars['String'];
  originatorAddress: Scalars['String'];
  price: PriceAtTime;
  toAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type MintInfo = {
  __typename?: 'MintInfo';
  mintContext: TransactionInfo;
  originatorAddress: Scalars['String'];
  price: PriceAtTime;
  toAddress: Scalars['String'];
};

export enum MintSortKey {
  None = 'NONE',
  Price = 'PRICE',
  Time = 'TIME',
  TokenId = 'TOKEN_ID'
}

export type MintSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: MintSortKey;
};

export type MintWithTokenAndMarkets = {
  __typename?: 'MintWithTokenAndMarkets';
  markets: Array<Market>;
  mint: Mint;
  token?: Maybe<Token>;
};


export type MintWithTokenAndMarketsMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<MarketSortKeySortInput>;
};

export type MintWithTokenAndMarketsConnection = {
  __typename?: 'MintWithTokenAndMarketsConnection';
  nodes: Array<MintWithTokenAndMarkets>;
  pageInfo: PageInfo;
};

export type MintsQueryFilter = {
  priceFilter?: InputMaybe<PriceFilter>;
  timeFilter?: InputMaybe<TimeFilter>;
};

export type MintsQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  minterAddresses?: InputMaybe<Array<Scalars['String']>>;
  recipientAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export enum Network {
  Ethereum = 'ETHEREUM'
}

export type NetworkInfo = {
  __typename?: 'NetworkInfo';
  chain: Chain;
  network: Network;
};

export type NetworkInput = {
  chain?: Chain;
  network?: Network;
};

export type NounsAuction = {
  __typename?: 'NounsAuction';
  address: Scalars['String'];
  amount?: Maybe<PriceAtTime>;
  auctionCurrency: Scalars['String'];
  auctionId: Scalars['String'];
  collectionAddress: Scalars['String'];
  duration: Scalars['String'];
  endTime: Scalars['String'];
  estimatedDurationTime?: Maybe<Scalars['datetime']>;
  firstBidTime?: Maybe<Scalars['datetime']>;
  highestBidPrice?: Maybe<PriceAtTime>;
  highestBidder?: Maybe<Scalars['String']>;
  minBidIncrementPercentage?: Maybe<Scalars['Int']>;
  reservePrice?: Maybe<PriceAtTime>;
  startTime: Scalars['String'];
  timeBuffer?: Maybe<Scalars['Int']>;
  tokenId: Scalars['String'];
  winner?: Maybe<Scalars['String']>;
};

export type NounsAuctionBidEventProperties = {
  __typename?: 'NounsAuctionBidEventProperties';
  extended: Scalars['Boolean'];
  nounId: Scalars['String'];
  sender: Scalars['String'];
  value: Scalars['String'];
};

export type NounsAuctionCreatedEventProperties = {
  __typename?: 'NounsAuctionCreatedEventProperties';
  endTime: Scalars['String'];
  nounId: Scalars['String'];
  startTime: Scalars['String'];
};

export type NounsAuctionEvent = {
  __typename?: 'NounsAuctionEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  nounsAuctionEventType: NounsAuctionEventType;
  properties: NounsAuctionEventProperties;
  tokenId: Scalars['String'];
};

export type NounsAuctionEventProperties = NounsAuctionBidEventProperties | NounsAuctionCreatedEventProperties | NounsAuctionExtendedEventProperties | NounsAuctionMinBidIncrementPercentageUpdatedEventProperties | NounsAuctionReservePriceUpdatedEventProperties | NounsAuctionSettledEventProperties | NounsAuctionTimeBufferUpdatedEventProperties;

export enum NounsAuctionEventType {
  NounsAuctionHouseAuctionBidEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_BID_EVENT',
  NounsAuctionHouseAuctionCreatedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_CREATED_EVENT',
  NounsAuctionHouseAuctionExtendedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_EXTENDED_EVENT',
  NounsAuctionHouseAuctionMinBidIncrementPercentageUpdated = 'NOUNS_AUCTION_HOUSE_AUCTION_MIN_BID_INCREMENT_PERCENTAGE_UPDATED',
  NounsAuctionHouseAuctionReservePriceUpdatedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_RESERVE_PRICE_UPDATED_EVENT',
  NounsAuctionHouseAuctionSettledEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_SETTLED_EVENT',
  NounsAuctionHouseAuctionTimeBufferUpdatedEvent = 'NOUNS_AUCTION_HOUSE_AUCTION_TIME_BUFFER_UPDATED_EVENT'
}

export type NounsAuctionExtendedEventProperties = {
  __typename?: 'NounsAuctionExtendedEventProperties';
  endTime: Scalars['String'];
  nounId: Scalars['String'];
};

export type NounsAuctionMinBidIncrementPercentageUpdatedEventProperties = {
  __typename?: 'NounsAuctionMinBidIncrementPercentageUpdatedEventProperties';
  minBidIncrementPercentage: Scalars['String'];
};

export type NounsAuctionReservePriceUpdatedEventProperties = {
  __typename?: 'NounsAuctionReservePriceUpdatedEventProperties';
  reservePrice: Scalars['String'];
};

export type NounsAuctionSettledEventProperties = {
  __typename?: 'NounsAuctionSettledEventProperties';
  amount: Scalars['String'];
  nounId: Scalars['String'];
  price: PriceAtTime;
  winner: Scalars['String'];
};

export type NounsAuctionTimeBufferUpdatedEventProperties = {
  __typename?: 'NounsAuctionTimeBufferUpdatedEventProperties';
  timeBuffer: Scalars['String'];
};

export type NounsBuilderGovernorEvent = {
  __typename?: 'NounsBuilderGovernorEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  nounsBuilderGovernorEventType: NounsBuilderGovernorEventType;
  properties: NounsBuilderGovernorProposalCreatedEventProperties;
};

export enum NounsBuilderGovernorEventType {
  NounsBuilderGovernorProposalCreatedEvent = 'NOUNS_BUILDER_GOVERNOR_PROPOSAL_CREATED_EVENT'
}

export type NounsBuilderGovernorProposalCreatedEventProperties = {
  __typename?: 'NounsBuilderGovernorProposalCreatedEventProperties';
  calldatas: Array<Scalars['String']>;
  description: Scalars['String'];
  endBlock: Scalars['String'];
  proposalId: Scalars['String'];
  proposer: Scalars['String'];
  signatures: Array<Scalars['String']>;
  startBlock: Scalars['String'];
  targets: Array<Scalars['String']>;
  values: Array<Scalars['String']>;
};

export type NounsBuilderManagerDaoDeployedEventProperties = {
  __typename?: 'NounsBuilderManagerDaoDeployedEventProperties';
  auction: Scalars['String'];
  governor: Scalars['String'];
  metadata: Scalars['String'];
  timelock: Scalars['String'];
  token: Scalars['String'];
};

export type NounsBuilderManagerEvent = {
  __typename?: 'NounsBuilderManagerEvent';
  address: Scalars['String'];
  nounsBuilderManagerEventType: NounsBuilderManagerEventType;
  properties: NounsBuilderManagerDaoDeployedEventProperties;
};

export enum NounsBuilderManagerEventType {
  NounsBuilderManagerDaoDeployedEvent = 'NOUNS_BUILDER_MANAGER_DAO_DEPLOYED_EVENT'
}

export type NounsDao = {
  __typename?: 'NounsDao';
  auctionAddress: Scalars['String'];
  collectionAddress: Scalars['String'];
  contractAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  governorAddress: Scalars['String'];
  metadataAddress: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  networkInfo: NetworkInfo;
  symbol?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['Int']>;
  treasuryAddress: Scalars['String'];
};

export type NounsDaoWithEvents = {
  __typename?: 'NounsDaoWithEvents';
  events: Array<NounsEvent>;
  nounsDao: NounsDao;
};

export type NounsDaoWithEventsConnection = {
  __typename?: 'NounsDaoWithEventsConnection';
  nodes: Array<NounsDaoWithEvents>;
  pageInfo: PageInfo;
};

export type NounsEvent = {
  __typename?: 'NounsEvent';
  collectionAddress: Scalars['String'];
  eventType: NounsEventType;
  networkInfo: NetworkInfo;
  properties: NounsEventProperties;
  transactionInfo: TransactionInfo;
};

export type NounsEventProperties = NounsBuilderGovernorEvent | NounsBuilderManagerEvent;

export enum NounsEventType {
  NounsBuilderGovernorEvent = 'NOUNS_BUILDER_GOVERNOR_EVENT',
  NounsBuilderManagerEvent = 'NOUNS_BUILDER_MANAGER_EVENT'
}

export type NounsQueryInput = {
  collectionAddresses: Array<Scalars['String']>;
};

export enum NounsSortKey {
  Created = 'CREATED',
  None = 'NONE'
}

export type NounsSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: NounsSortKey;
};

export type OffchainOrder = {
  __typename?: 'OffchainOrder';
  calldata?: Maybe<Scalars['String']>;
  collectionAddress?: Maybe<Scalars['String']>;
  contractAddress: Scalars['String'];
  endTime: Scalars['datetime'];
  networkInfo: NetworkInfo;
  offerer: Scalars['String'];
  orderType: Scalars['String'];
  price: PriceAtTime;
  properties: SeaportOrder;
  startTime: Scalars['datetime'];
  tokenId?: Maybe<Scalars['String']>;
};

export enum OffchainOrderSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  EndTime = 'END_TIME',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  UsdcPrice = 'USDC_PRICE'
}

export type OffchainOrderSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: OffchainOrderSortKey;
};

export type OffchainOrderWithToken = {
  __typename?: 'OffchainOrderWithToken';
  offchainOrder: OffchainOrder;
  token?: Maybe<Token>;
};

export type OffchainOrderWithTokenConnection = {
  __typename?: 'OffchainOrderWithTokenConnection';
  nodes: Array<OffchainOrderWithToken>;
  pageInfo: PageInfo;
};

export type OffchainOrdersQueryFilter = {
  priceFilter?: InputMaybe<PriceFilter>;
};

export type OffchainOrdersQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  sellerAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export type OwnerCount = {
  __typename?: 'OwnerCount';
  count: Scalars['Int'];
  owner: Scalars['String'];
  tokenIds: Array<Scalars['String']>;
};

export type OwnerCountConnection = {
  __typename?: 'OwnerCountConnection';
  nodes: Array<OwnerCount>;
  pageInfo: PageInfo;
};

export type OwnersByCountQueryInput = {
  attributes?: InputMaybe<Array<AttributeFilter>>;
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  limit: Scalars['Int'];
};

export type PaginationInput = {
  after?: InputMaybe<Scalars['String']>;
  limit?: Scalars['Int'];
};

export type PriceAtTime = {
  __typename?: 'PriceAtTime';
  blockNumber: Scalars['Int'];
  chainTokenPrice?: Maybe<CurrencyAmount>;
  nativePrice: CurrencyAmount;
  usdcPrice?: Maybe<CurrencyAmount>;
};

export type PriceFilter = {
  currencyAddress?: InputMaybe<Scalars['String']>;
  maximumChainTokenPrice?: InputMaybe<Scalars['String']>;
  maximumNativePrice?: InputMaybe<Scalars['String']>;
  minimumChainTokenPrice?: InputMaybe<Scalars['String']>;
  minimumNativePrice?: InputMaybe<Scalars['String']>;
};

export type ReceivedItem = {
  __typename?: 'ReceivedItem';
  address: Scalars['String'];
  amount: Scalars['String'];
  itemType: Scalars['String'];
  price?: Maybe<PriceAtTime>;
  recipient: Scalars['String'];
  tokenId: Scalars['String'];
};

export type RootQuery = {
  __typename?: 'RootQuery';
  /** Gets the total set of NFT attributes */
  aggregateAttributes: Array<AggregateAttribute>;
  /** Gets counts, sales volume, and other statistics */
  aggregateStat: AggregateStat;
  /** NFT collection data */
  collections: CollectionConnection;
  /** Contract event information, e.g. Sales, Transfers, Mints, etc. */
  events: EventConnection;
  /** Real time data for active markets */
  market?: Maybe<ActiveMarket>;
  /** Data for specific ZORA markets, e.g. Buy Now, Auctions, Offers */
  markets: MarketWithTokenConnection;
  /** Historical minting data */
  mints: MintWithTokenAndMarketsConnection;
  /** Noun daos */
  nouns: NounsDaoWithEventsConnection;
  /** Offchain liquidity */
  offchainOrders: OffchainOrderWithTokenConnection;
  /** Historical sales data from ZORA, OpenSea, LooksRare, 0x, and more */
  sales: SaleWithTokenConnection;
  /** Returns search results for a query */
  search: SearchResultConnection;
  /** Gets data on a single token */
  token?: Maybe<TokenWithFullMarketHistory>;
  /** Gets data for multiple tokens */
  tokens: TokenWithMarketsSummaryConnection;
};


export type RootQueryAggregateAttributesArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  where: AggregateAttributesQueryInput;
};


export type RootQueryCollectionsArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<CollectionSortKeySortInput>;
  where?: InputMaybe<CollectionsQueryInput>;
};


export type RootQueryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<EventSortKeySortInput>;
  where?: InputMaybe<EventsQueryInput>;
};


export type RootQueryMarketArgs = {
  network?: InputMaybe<NetworkInput>;
  where: ActiveMarketQueryInput;
};


export type RootQueryMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<MarketSortKeySortInput>;
  where?: InputMaybe<MarketsQueryInput>;
};


export type RootQueryMintsArgs = {
  filter?: InputMaybe<MintsQueryFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<MintSortKeySortInput>;
  where?: InputMaybe<MintsQueryInput>;
};


export type RootQueryNounsArgs = {
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<NounsSortKeySortInput>;
  where?: InputMaybe<NounsQueryInput>;
};


export type RootQueryOffchainOrdersArgs = {
  filter?: InputMaybe<OffchainOrdersQueryFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<OffchainOrderSortKeySortInput>;
  where?: InputMaybe<OffchainOrdersQueryInput>;
};


export type RootQuerySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SaleSortKeySortInput>;
  where?: InputMaybe<SalesQueryInput>;
};


export type RootQuerySearchArgs = {
  filter?: InputMaybe<SearchFilter>;
  pagination: SearchPaginationInput;
  query: SearchQueryInput;
};


export type RootQueryTokenArgs = {
  network?: InputMaybe<NetworkInput>;
  token: TokenInput;
};


export type RootQueryTokensArgs = {
  filter?: InputMaybe<TokensQueryFilter>;
  networks?: InputMaybe<Array<NetworkInput>>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<TokenSortInput>;
  where?: InputMaybe<TokensQueryInput>;
};

export type Sale = {
  __typename?: 'Sale';
  buyerAddress: Scalars['String'];
  collectionAddress: Scalars['String'];
  networkInfo: NetworkInfo;
  price: PriceAtTime;
  saleContractAddress?: Maybe<Scalars['String']>;
  saleType: SaleType;
  sellerAddress: Scalars['String'];
  tokenId: Scalars['String'];
  transactionInfo: TransactionInfo;
};

export enum SaleSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  Time = 'TIME'
}

export type SaleSortKeySortInput = {
  sortDirection: SortDirection;
  sortKey: SaleSortKey;
};

export enum SaleType {
  CryptopunksSale = 'CRYPTOPUNKS_SALE',
  FoundationSale = 'FOUNDATION_SALE',
  LilNounsAuctionSale = 'LIL_NOUNS_AUCTION_SALE',
  LooksRareSale = 'LOOKS_RARE_SALE',
  NounsAuctionSale = 'NOUNS_AUCTION_SALE',
  OpenseaBundleSale = 'OPENSEA_BUNDLE_SALE',
  OpenseaSingleSale = 'OPENSEA_SINGLE_SALE',
  RaribleSale = 'RARIBLE_SALE',
  SeaportSale = 'SEAPORT_SALE',
  SuperrareSale = 'SUPERRARE_SALE',
  ZeroxSale = 'ZEROX_SALE',
  ZoraV2AuctionSale = 'ZORA_V2_AUCTION_SALE',
  ZoraV3AskSale = 'ZORA_V3_ASK_SALE',
  ZoraV3ReserveAuctionSale = 'ZORA_V3_RESERVE_AUCTION_SALE'
}

export type SaleWithToken = {
  __typename?: 'SaleWithToken';
  sale: Sale;
  token?: Maybe<Token>;
};

export type SaleWithTokenConnection = {
  __typename?: 'SaleWithTokenConnection';
  nodes: Array<SaleWithToken>;
  pageInfo: PageInfo;
};

export type SalesQueryFilter = {
  priceFilter?: InputMaybe<PriceFilter>;
  saleTypes?: InputMaybe<Array<SaleType>>;
  timeFilter?: InputMaybe<TimeFilter>;
};

export type SalesQueryInput = {
  buyerAddresses?: InputMaybe<Array<Scalars['String']>>;
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  sellerAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export type SalesVolume = {
  __typename?: 'SalesVolume';
  chainTokenPrice: Scalars['Float'];
  totalCount: Scalars['Int'];
  usdcPrice: Scalars['Float'];
};

export type SalesVolumeFilter = {
  saleTypes?: InputMaybe<Array<SaleType>>;
  timeFilter?: InputMaybe<TimeFilter>;
};

export type SeaportCounterIncrementedProperties = {
  __typename?: 'SeaportCounterIncrementedProperties';
  newCounter: Scalars['String'];
};

export type SeaportEvent = {
  __typename?: 'SeaportEvent';
  address: Scalars['String'];
  eventType: SeaportEventType;
  offerer: Scalars['String'];
  orderHash?: Maybe<Scalars['String']>;
  properties?: Maybe<SeaportEventProperties>;
  zone?: Maybe<Scalars['String']>;
};

export type SeaportEventProperties = SeaportCounterIncrementedProperties | SeaportOrderFulfilledProperties;

export enum SeaportEventType {
  SeaportCounterIncrementedEvent = 'SEAPORT_COUNTER_INCREMENTED_EVENT',
  SeaportOrderCancelledEvent = 'SEAPORT_ORDER_CANCELLED_EVENT',
  SeaportOrderFulfilledEvent = 'SEAPORT_ORDER_FULFILLED_EVENT',
  SeaportOrderValidatedEvent = 'SEAPORT_ORDER_VALIDATED_EVENT'
}

export type SeaportOrder = {
  __typename?: 'SeaportOrder';
  conduitKey: Scalars['String'];
  considerations: Array<SeaportOrderItem>;
  counter: Scalars['String'];
  endTime: Scalars['datetime'];
  offerer: Scalars['String'];
  offers: Array<SeaportOrderItem>;
  orderHash: Scalars['String'];
  orderType: Scalars['String'];
  price: PriceAtTime;
  salt: Scalars['String'];
  schemaHash: Scalars['String'];
  signature: Scalars['String'];
  startTime: Scalars['datetime'];
  zone: Scalars['String'];
  zoneHash: Scalars['String'];
};

export type SeaportOrderFulfilledProperties = {
  __typename?: 'SeaportOrderFulfilledProperties';
  consideration: Array<ReceivedItem>;
  offer: Array<SpentItem>;
  recipient: Scalars['String'];
};

export type SeaportOrderItem = {
  __typename?: 'SeaportOrderItem';
  address: Scalars['String'];
  criteria?: Maybe<Scalars['String']>;
  endAmount: Scalars['String'];
  endPrice?: Maybe<PriceAtTime>;
  itemType: Scalars['String'];
  recipient?: Maybe<Scalars['String']>;
  startAmount: Scalars['String'];
  startPrice?: Maybe<PriceAtTime>;
  tokenId?: Maybe<Scalars['String']>;
};

export type SearchFilter = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  entityType?: InputMaybe<SearchableEntity>;
};

export type SearchPaginationInput = {
  after?: InputMaybe<Scalars['String']>;
  limit?: Scalars['Int'];
};

export type SearchQueryInput = {
  text: Scalars['String'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  collectionAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  entity?: Maybe<TokenCollection>;
  entityType: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  networkInfo: NetworkInfo;
  tokenId?: Maybe<Scalars['String']>;
};

export type SearchResultConnection = {
  __typename?: 'SearchResultConnection';
  nodes: Array<SearchResult>;
  pageInfo: PageInfo;
};

export enum SearchableEntity {
  Collection = 'COLLECTION',
  Token = 'TOKEN'
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SpentItem = {
  __typename?: 'SpentItem';
  address: Scalars['String'];
  amount: Scalars['String'];
  itemType: Scalars['String'];
  price?: Maybe<PriceAtTime>;
  tokenId: Scalars['String'];
};

export type TimeFilter = {
  endBlock?: InputMaybe<Scalars['Int']>;
  /** Date in YYYY-MM-DD format. Deprecating in favor of end_datetime */
  endDate?: InputMaybe<Scalars['String']>;
  endDatetime?: InputMaybe<Scalars['String']>;
  lookbackHours?: InputMaybe<Scalars['Int']>;
  startBlock?: InputMaybe<Scalars['Int']>;
  /** Date in YYYY-MM-DD format. Deprecating in favor of start_datetime */
  startDate?: InputMaybe<Scalars['String']>;
  startDatetime?: InputMaybe<Scalars['String']>;
};

export type Token = {
  __typename?: 'Token';
  attributes?: Maybe<Array<TokenAttribute>>;
  collectionAddress: Scalars['String'];
  collectionName?: Maybe<Scalars['String']>;
  content?: Maybe<TokenContentMedia>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<TokenContentMedia>;
  lastRefreshTime?: Maybe<Scalars['datetime']>;
  metadata?: Maybe<Scalars['JSONScalar']>;
  mintInfo?: Maybe<MintInfo>;
  name?: Maybe<Scalars['String']>;
  networkInfo: NetworkInfo;
  owner?: Maybe<Scalars['String']>;
  tokenContract?: Maybe<TokenContract>;
  tokenId: Scalars['String'];
  tokenUrl?: Maybe<Scalars['String']>;
  tokenUrlMimeType?: Maybe<Scalars['String']>;
};

export type TokenAttribute = {
  __typename?: 'TokenAttribute';
  displayType?: Maybe<Scalars['String']>;
  traitType?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TokenCollection = Collection | Token;

export type TokenContentMedia = {
  __typename?: 'TokenContentMedia';
  mediaEncoding?: Maybe<ImageEncodingTypesVideoEncodingTypesAudioEncodingTypesUnsupportedEncodingTypes>;
  mimeType?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type TokenContract = {
  __typename?: 'TokenContract';
  chain: Scalars['Int'];
  collectionAddress: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  network: Scalars['String'];
  symbol?: Maybe<Scalars['String']>;
  totalSupply?: Maybe<Scalars['Int']>;
};

export type TokenInput = {
  address: Scalars['String'];
  tokenId: Scalars['String'];
};

export type TokenSortInput = {
  sortAxis?: InputMaybe<MarketCategory>;
  sortDirection: SortDirection;
  sortKey: TokenSortKey;
};

export enum TokenSortKey {
  ChainTokenPrice = 'CHAIN_TOKEN_PRICE',
  Minted = 'MINTED',
  NativePrice = 'NATIVE_PRICE',
  None = 'NONE',
  TimedSaleEnding = 'TIMED_SALE_ENDING',
  TokenId = 'TOKEN_ID',
  Transferred = 'TRANSFERRED'
}

export type TokenWithFullMarketHistory = {
  __typename?: 'TokenWithFullMarketHistory';
  events: Array<Event>;
  markets: Array<Market>;
  sales: Array<Sale>;
  token: Token;
};


export type TokenWithFullMarketHistoryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<EventSortKeySortInput>;
};


export type TokenWithFullMarketHistoryMarketsArgs = {
  filter?: InputMaybe<MarketsQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<MarketSortKeySortInput>;
};


export type TokenWithFullMarketHistorySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SaleSortKeySortInput>;
};

export type TokenWithMarketsSummary = {
  __typename?: 'TokenWithMarketsSummary';
  events: Array<Event>;
  marketsSummary: Array<Market>;
  sales: Array<Sale>;
  token: Token;
};


export type TokenWithMarketsSummaryEventsArgs = {
  filter?: InputMaybe<EventsQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<EventSortKeySortInput>;
};


export type TokenWithMarketsSummarySalesArgs = {
  filter?: InputMaybe<SalesQueryFilter>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SaleSortKeySortInput>;
};

export type TokenWithMarketsSummaryConnection = {
  __typename?: 'TokenWithMarketsSummaryConnection';
  nodes: Array<TokenWithMarketsSummary>;
  pageInfo: PageInfo;
};

export type TokensQueryFilter = {
  attributeFilters?: InputMaybe<Array<AttributeFilter>>;
  marketFilters?: InputMaybe<Array<MarketTypeFilter>>;
  mediaType?: InputMaybe<MediaType>;
  priceFilter?: InputMaybe<PriceFilter>;
};

export type TokensQueryInput = {
  collectionAddresses?: InputMaybe<Array<Scalars['String']>>;
  ownerAddresses?: InputMaybe<Array<Scalars['String']>>;
  tokens?: InputMaybe<Array<TokenInput>>;
};

export type TransactionInfo = {
  __typename?: 'TransactionInfo';
  blockNumber: Scalars['Int'];
  blockTimestamp: Scalars['datetime'];
  logIndex?: Maybe<Scalars['Int']>;
  transactionHash?: Maybe<Scalars['String']>;
};

export type TransferEvent = {
  __typename?: 'TransferEvent';
  collectionAddress: Scalars['String'];
  fromAddress: Scalars['String'];
  toAddress: Scalars['String'];
  tokenId: Scalars['String'];
};

export type UnsupportedEncodingTypes = {
  __typename?: 'UnsupportedEncodingTypes';
  original: Scalars['String'];
};

export type V1Ask = {
  __typename?: 'V1Ask';
  address: Scalars['String'];
  amount: PriceAtTime;
  collectionAddress: Scalars['String'];
  currency: Scalars['String'];
  tokenId: Scalars['String'];
  tokenOwner?: Maybe<Scalars['String']>;
  v1AskStatus: Scalars['String'];
};

export type V1BidShare = {
  __typename?: 'V1BidShare';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  creator: Scalars['String'];
  owner: Scalars['String'];
  previousOwner: Scalars['String'];
  tokenId: Scalars['String'];
  v1BidShareStatus: Scalars['String'];
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

export type V1MarketEvent = {
  __typename?: 'V1MarketEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  properties: V1MarketEventProperties;
  tokenId: Scalars['String'];
  v1MarketEventType: V1MarketEventType;
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
  address: Scalars['String'];
  amount: PriceAtTime;
  bidder: Scalars['String'];
  collectionAddress: Scalars['String'];
  currency: Scalars['String'];
  recipient: Scalars['String'];
  sellOnShare: Scalars['String'];
  tokenId: Scalars['String'];
  v1OfferStatus: Scalars['String'];
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
  estimatedExpirationTime?: Maybe<Scalars['datetime']>;
  firstBidTime?: Maybe<Scalars['datetime']>;
  highestBidPrice?: Maybe<PriceAtTime>;
  highestBidder?: Maybe<Scalars['String']>;
  reservePrice: PriceAtTime;
  tokenId: Scalars['String'];
  tokenOwner: Scalars['String'];
  v2AuctionStatus: Scalars['String'];
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
  properties: V2AuctionEventProperties;
  tokenId: Scalars['String'];
  v2AuctionEventType: V2AuctionEventType;
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

export type V3Ask = {
  __typename?: 'V3Ask';
  address: Scalars['String'];
  askCurrency: Scalars['String'];
  askPrice: PriceAtTime;
  buyer?: Maybe<Scalars['String']>;
  collectionAddress: Scalars['String'];
  finder?: Maybe<Scalars['String']>;
  findersFeeBps?: Maybe<Scalars['Int']>;
  seller: Scalars['String'];
  sellerFundsRecipient?: Maybe<Scalars['String']>;
  tokenId: Scalars['String'];
  v3AskStatus: Scalars['String'];
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
  properties: V3AskEventProperties;
  tokenId: Scalars['String'];
  v3AskEventType: V3AskEventType;
};

export type V3AskEventProperties = V3AskCanceledEventProperties | V3AskCreatedEventProperties | V3AskFilledEventProperties | V3AskPriceUpdatedEventProperties | V3PrivateAskEventProperties;

export enum V3AskEventType {
  V3AskCanceled = 'V3_ASK_CANCELED',
  V3AskCreated = 'V3_ASK_CREATED',
  V3AskFilled = 'V3_ASK_FILLED',
  V3AskPriceUpdated = 'V3_ASK_PRICE_UPDATED',
  V3PrivateAskCanceled = 'V3_PRIVATE_ASK_CANCELED',
  V3PrivateAskCreated = 'V3_PRIVATE_ASK_CREATED',
  V3PrivateAskFilled = 'V3_PRIVATE_ASK_FILLED',
  V3PrivateAskPriceUpdated = 'V3_PRIVATE_ASK_PRICE_UPDATED'
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

export type V3PrivateAskEventProperties = {
  __typename?: 'V3PrivateAskEventProperties';
  askCurrency: Scalars['String'];
  askPrice: Scalars['String'];
  buyer: Scalars['String'];
  price: PriceAtTime;
  seller: Scalars['String'];
  tokenContract: Scalars['String'];
  tokenId: Scalars['String'];
};

export type V3ReserveAuction = {
  __typename?: 'V3ReserveAuction';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  currency: Scalars['String'];
  duration: Scalars['String'];
  estimatedDurationTime?: Maybe<Scalars['datetime']>;
  extended: Scalars['Boolean'];
  finder: Scalars['String'];
  findersFeeBps: Scalars['String'];
  firstBid: Scalars['Boolean'];
  firstBidTime: Scalars['String'];
  highestBid: Scalars['String'];
  highestBidPrice?: Maybe<PriceAtTime>;
  highestBidder: Scalars['String'];
  price?: Maybe<PriceAtTime>;
  reserve: Scalars['String'];
  reservePrice: PriceAtTime;
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  startTime: Scalars['String'];
  status: Scalars['String'];
  tokenId: Scalars['String'];
};

export type V3ReserveAuctionAuctionProperties = {
  __typename?: 'V3ReserveAuctionAuctionProperties';
  currency: Scalars['String'];
  duration: Scalars['String'];
  finder: Scalars['String'];
  findersFeeBps: Scalars['String'];
  firstBidTime: Scalars['String'];
  highestBid: Scalars['String'];
  highestBidPrice: PriceAtTime;
  highestBidder: Scalars['String'];
  reserve: Scalars['String'];
  reservePrice: PriceAtTime;
  seller: Scalars['String'];
  sellerFundsRecipient: Scalars['String'];
  startTime: Scalars['String'];
};

export type V3ReserveAuctionEvent = {
  __typename?: 'V3ReserveAuctionEvent';
  address: Scalars['String'];
  collectionAddress: Scalars['String'];
  eventType: V3ReserveAuctionEventType;
  properties: V3ReserveAuctionEventProperties;
  tokenId: Scalars['String'];
};

export type V3ReserveAuctionEventProperties = V3ReserveAuctionV1AuctionBidProperties | V3ReserveAuctionV1AuctionCanceledProperties | V3ReserveAuctionV1AuctionCreatedProperties | V3ReserveAuctionV1AuctionEndedProperties | V3ReserveAuctionV1AuctionReservePriceUpdatedProperties;

export enum V3ReserveAuctionEventType {
  V3ReserveAuctionBid = 'V3_RESERVE_AUCTION_BID',
  V3ReserveAuctionCanceled = 'V3_RESERVE_AUCTION_CANCELED',
  V3ReserveAuctionCreated = 'V3_RESERVE_AUCTION_CREATED',
  V3ReserveAuctionEnded = 'V3_RESERVE_AUCTION_ENDED',
  V3ReserveAuctionReservePriceUpdated = 'V3_RESERVE_AUCTION_RESERVE_PRICE_UPDATED'
}

export type V3ReserveAuctionV1AuctionBidProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionBidProperties';
  auction: V3ReserveAuctionAuctionProperties;
  extended: Scalars['Boolean'];
  firstBid: Scalars['Boolean'];
  price: PriceAtTime;
};

export type V3ReserveAuctionV1AuctionCanceledProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionCanceledProperties';
  auction: V3ReserveAuctionAuctionProperties;
};

export type V3ReserveAuctionV1AuctionCreatedProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionCreatedProperties';
  auction: V3ReserveAuctionAuctionProperties;
};

export type V3ReserveAuctionV1AuctionEndedProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionEndedProperties';
  auction: V3ReserveAuctionAuctionProperties;
};

export type V3ReserveAuctionV1AuctionReservePriceUpdatedProperties = {
  __typename?: 'V3ReserveAuctionV1AuctionReservePriceUpdatedProperties';
  auction: V3ReserveAuctionAuctionProperties;
};

export type VideoEncodingTypes = {
  __typename?: 'VideoEncodingTypes';
  large?: Maybe<Scalars['String']>;
  original: Scalars['String'];
  poster?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export const TokenContractInfoFragmentDoc = gql`
    fragment TokenContractInfo on TokenContract {
  name
  network
  description
  collectionAddress
  symbol
  chain
}
    `;
export const PriceSummaryFragmentDoc = gql`
    fragment PriceSummary on PriceAtTime {
  blockNumber
  chainTokenPrice {
    decimal
    raw
  }
  nativePrice {
    decimal
    raw
    currency {
      address
      decimals
      name
    }
  }
  usdcPrice {
    decimal
    raw
  }
}
    `;
export const TransactionDetailsFragmentDoc = gql`
    fragment TransactionDetails on TransactionInfo {
  blockNumber
  blockTimestamp
  transactionHash
  logIndex
}
    `;
export const MintDetailsFragmentDoc = gql`
    fragment MintDetails on MintInfo {
  price {
    __typename
    ...PriceSummary
  }
  originatorAddress
  toAddress
  mintContext {
    __typename
    ...TransactionDetails
  }
}
    ${PriceSummaryFragmentDoc}
${TransactionDetailsFragmentDoc}`;
export const FullMediaFragmentDoc = gql`
    fragment FullMedia on TokenContentMedia {
  size
  url
  size
  mimeType
  mediaEncoding {
    ... on ImageEncodingTypes {
      __typename
      original
      large
      poster
      thumbnail
    }
    ... on VideoEncodingTypes {
      __typename
      original
      large
      poster
      preview
      thumbnail
    }
    ... on AudioEncodingTypes {
      __typename
      original
      large
    }
    ... on UnsupportedEncodingTypes {
      __typename
      original
    }
  }
}
    `;
export const TokenInfoFragmentDoc = gql`
    fragment TokenInfo on Token {
  __typename
  tokenId
  tokenContract {
    ...TokenContractInfo
  }
  mintInfo {
    ...MintDetails
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
${MintDetailsFragmentDoc}
${FullMediaFragmentDoc}`;
export const TokenDetailsFragmentDoc = gql`
    fragment TokenDetails on Token {
  metadata
  tokenUrl
  tokenUrlMimeType
  attributes {
    traitType
    value
    displayType
  }
}
    `;
export const NetworkInfoDetailsFragmentDoc = gql`
    fragment NetworkInfoDetails on NetworkInfo {
  chain
  network
}
    `;
export const CollectionInfoFragmentDoc = gql`
    fragment CollectionInfo on Collection {
  address
  description
  name
  symbol
  totalSupply
  networkInfo {
    ...NetworkInfoDetails
  }
}
    ${NetworkInfoDetailsFragmentDoc}`;
export const CollectionInfoSearchResultFragmentDoc = gql`
    fragment CollectionInfoSearchResult on Collection {
  address
  collectionDescription: description
  name
  symbol
  totalSupply
}
    `;
export const CollectionDetailsFragmentDoc = gql`
    fragment CollectionDetails on Collection {
  networkInfo {
    ...NetworkInfoDetails
  }
  attributes {
    traitType
    valueMetrics {
      count
      percent
      value
    }
  }
}
    ${NetworkInfoDetailsFragmentDoc}`;
export const PageInfoDefaultFragmentDoc = gql`
    fragment PageInfoDefault on PageInfo {
  endCursor
  hasNextPage
  limit
}
    `;
export const OwnerCountInfoFragmentDoc = gql`
    fragment OwnerCountInfo on OwnerCount {
  owner
  count
  tokenIds
}
    `;
export const MarketInfoFragmentDoc = gql`
    fragment MarketInfo on Market {
  collectionAddress
  marketAddress
  marketType
  transactionInfo {
    ...TransactionDetails
  }
  price {
    ...PriceSummary
  }
  status
  networkInfo {
    ...NetworkInfoDetails
  }
}
    ${TransactionDetailsFragmentDoc}
${PriceSummaryFragmentDoc}
${NetworkInfoDetailsFragmentDoc}`;
export const V2AuctionMarketPropertiesFragmentDoc = gql`
    fragment V2AuctionMarketProperties on V2Auction {
  __typename
  firstBidTime
  highestBidder
  curator
  collectionAddress
  curatorFeePercentage
  tokenId
  auctionCurrency
  duration
  estimatedExpirationTime
  v2AuctionStatus
  tokenOwner
  address
  auctionId
  approved
  reservePrice {
    ...PriceSummary
  }
  highestBidPrice {
    ...PriceSummary
  }
}
    ${PriceSummaryFragmentDoc}`;
export const V3AskPropertiesFragmentDoc = gql`
    fragment V3AskProperties on V3Ask {
  __typename
  buyer
  finder
  findersFeeBps
  sellerFundsRecipient
  v3AskStatus
  seller
  address
  askCurrency
  collectionAddress
  askPrice {
    ...PriceSummary
  }
}
    ${PriceSummaryFragmentDoc}`;
export const V1OfferPropertiesFragmentDoc = gql`
    fragment V1OfferProperties on V1Offer {
  v1OfferStatus
  sellOnShare
  bidder
  currency
  amount {
    ...PriceSummary
  }
}
    ${PriceSummaryFragmentDoc}`;
export const V1AskPropertiesFragmentDoc = gql`
    fragment V1AskProperties on V1Ask {
  v1AskStatus
  currency
  amount {
    ...PriceSummary
  }
}
    ${PriceSummaryFragmentDoc}`;
export const MarketPropertiesFullFragmentDoc = gql`
    fragment MarketPropertiesFull on MarketProperties {
  __typename
  ...V2AuctionMarketProperties
  ...V3AskProperties
  ...V1OfferProperties
  ...V1AskProperties
}
    ${V2AuctionMarketPropertiesFragmentDoc}
${V3AskPropertiesFragmentDoc}
${V1OfferPropertiesFragmentDoc}
${V1AskPropertiesFragmentDoc}`;
export const MarketDetailsFragmentDoc = gql`
    fragment MarketDetails on Market {
  properties {
    ...MarketPropertiesFull
  }
}
    ${MarketPropertiesFullFragmentDoc}`;
export const MarketsOnMintInfoFragmentDoc = gql`
    fragment MarketsOnMintInfo on MintWithTokenAndMarkets {
  markets(pagination: {limit: 10}, sort: {sortKey: NONE, sortDirection: DESC}) {
    ...MarketInfo
    ...MarketDetails
  }
}
    ${MarketInfoFragmentDoc}
${MarketDetailsFragmentDoc}`;
export const SaleInfoFragmentDoc = gql`
    fragment SaleInfo on Sale {
  saleContractAddress
  transactionInfo {
    ...TransactionDetails
  }
  buyerAddress
  collectionAddress
  price {
    ...PriceSummary
  }
  sellerAddress
  tokenId
}
    ${TransactionDetailsFragmentDoc}
${PriceSummaryFragmentDoc}`;
export const TokensSalesInfoFragmentDoc = gql`
    fragment TokensSalesInfo on TokenWithMarketsSummary {
  sales(pagination: {limit: 10}, sort: {sortKey: TIME, sortDirection: DESC}) {
    ...SaleInfo
  }
}
    ${SaleInfoFragmentDoc}`;
export const V1MarketEventPropertiesInfoFragmentDoc = gql`
    fragment V1MarketEventPropertiesInfo on V1MarketEventProperties {
  __typename
  ... on V1MarketAskCreatedEventProperties {
    amount
    price {
      ...PriceSummary
    }
    currency
  }
  ... on V1MarketAskRemovedEventProperties {
    amount
    price {
      ...PriceSummary
    }
    currency
  }
  ... on V1MarketOfferCreatedEventProperties {
    amount
    price {
      ...PriceSummary
    }
    currency
    bidder
  }
  ... on V1MarketOfferFinalizedEventProperties {
    amount
    price {
      ...PriceSummary
    }
    currency
    bidder
  }
  ... on V1MarketOfferRemovedEventProperties {
    amount
    price {
      ...PriceSummary
    }
    currency
    bidder
  }
}
    ${PriceSummaryFragmentDoc}`;
export const V2AuctionEventPropertiesInfoFragmentDoc = gql`
    fragment V2AuctionEventPropertiesInfo on V2AuctionEventProperties {
  __typename
  ... on V2AuctionBidEventProperties {
    sender
    firstBid
    extended
    value
    price {
      ...PriceSummary
    }
  }
  ... on V2AuctionCreatedEventProperties {
    auctionCurrency
    tokenOwner
    curator
    curatorFeePercentage
    duration
    reservePrice
    price {
      ...PriceSummary
    }
  }
  ... on V2AuctionCanceledEventProperties {
    tokenOwner
  }
  ... on V2AuctionDurationExtendedEventProperties {
    duration
  }
  ... on V2AuctionBidEventProperties {
    sender
    firstBid
    extended
    value
    price {
      ...PriceSummary
    }
  }
  ... on V2AuctionEndedEventProperties {
    tokenOwner
    curator
    winner
    auctionCurrency
    amount
    curatorFee
  }
  ... on V2AuctionReservePriceUpdatedEventProperties {
    reservePrice
    price {
      ...PriceSummary
    }
  }
  ... on V2AuctionEndedEventProperties {
    tokenOwner
    curator
    winner
    auctionCurrency
    amount
    curatorFee
  }
  ... on V2AuctionApprovalUpdatedEventProperties {
    approved
  }
}
    ${PriceSummaryFragmentDoc}`;
export const V3AskEventPropertiesInfoFragmentDoc = gql`
    fragment V3AskEventPropertiesInfo on V3AskEventProperties {
  __typename
  ... on V3AskCreatedEventProperties {
    seller
    sellerFundsRecipient
    askCurrency
    askPrice
    findersFeeBps
    price {
      ...PriceSummary
    }
  }
  ... on V3AskCanceledEventProperties {
    seller
    sellerFundsRecipient
    askCurrency
    askPrice
    findersFeeBps
    price {
      ...PriceSummary
    }
  }
  ... on V3AskPriceUpdatedEventProperties {
    seller
    sellerFundsRecipient
    askCurrency
    askPrice
    findersFeeBps
    price {
      ...PriceSummary
    }
  }
  ... on V3AskFilledEventProperties {
    seller
    sellerFundsRecipient
    askCurrency
    askPrice
    findersFeeBps
    price {
      ...PriceSummary
    }
    finder
    buyer
  }
}
    ${PriceSummaryFragmentDoc}`;
export const EventInfoFragmentDoc = gql`
    fragment EventInfo on Event {
  transactionInfo {
    ...TransactionDetails
  }
  eventType
  collectionAddress
  tokenId
  properties {
    __typename
    ... on MintEvent {
      tokenId
      collectionAddress
      originatorAddress
      toAddress
      price {
        ...PriceSummary
      }
    }
    ... on TransferEvent {
      fromAddress
      toAddress
      collectionAddress
      tokenId
    }
    ... on V1MarketEvent {
      v1MarketEventType
      address
      collectionAddress
      tokenId
      properties {
        ...V1MarketEventPropertiesInfo
      }
    }
    ... on V2AuctionEvent {
      v2AuctionEventType
      address
      auctionId
      collectionAddress
      tokenId
      properties {
        ...V2AuctionEventPropertiesInfo
      }
    }
    ... on V3AskEvent {
      v3AskEventType
      address
      collectionAddress
      tokenId
      properties {
        ...V3AskEventPropertiesInfo
      }
    }
  }
}
    ${TransactionDetailsFragmentDoc}
${PriceSummaryFragmentDoc}
${V1MarketEventPropertiesInfoFragmentDoc}
${V2AuctionEventPropertiesInfoFragmentDoc}
${V3AskEventPropertiesInfoFragmentDoc}`;
export const TokensEventsInfoFragmentDoc = gql`
    fragment TokensEventsInfo on TokenWithMarketsSummary {
  events(pagination: {limit: 10}, sort: {sortKey: CREATED, sortDirection: DESC}) {
    ...EventInfo
  }
}
    ${EventInfoFragmentDoc}`;
export const TokenFullDetailsFragmentDoc = gql`
    fragment TokenFullDetails on TokenWithFullMarketHistory {
  sales(pagination: {limit: 10}, sort: {sortKey: TIME, sortDirection: DESC}) {
    ...SaleInfo @include(if: $includeFullDetails)
  }
  events(pagination: {limit: 10}, sort: {sortKey: CREATED, sortDirection: DESC}) {
    ...EventInfo
  }
}
    ${SaleInfoFragmentDoc}
${EventInfoFragmentDoc}`;
export const SeaportOrderItemDetailsFragmentDoc = gql`
    fragment SeaportOrderItemDetails on SeaportOrderItem {
  itemType
  address
  tokenId
  criteria
  startAmount
  endAmount
  startPrice {
    __typename
    ...PriceSummary
  }
  endPrice {
    __typename
    ...PriceSummary
  }
  recipient
}
    ${PriceSummaryFragmentDoc}`;
export const SeaportOrderDetailsFragmentDoc = gql`
    fragment SeaportOrderDetails on SeaportOrder {
  orderHash
  offerer
  startTime
  endTime
  orderType
  price {
    __typename
    ...PriceSummary
  }
  offers {
    __typename
    ...SeaportOrderItemDetails
  }
  considerations {
    __typename
    ...SeaportOrderItemDetails
  }
  zone
  zoneHash
  salt
  conduitKey
  counter
  signature
  schemaHash
}
    ${PriceSummaryFragmentDoc}
${SeaportOrderItemDetailsFragmentDoc}`;
export const OffchainOrderInfoFragmentDoc = gql`
    fragment OffchainOrderInfo on OffchainOrder {
  networkInfo {
    __typename
    ...NetworkInfoDetails
  }
  contractAddress
  collectionAddress
  tokenId
  offerer
  startTime
  endTime
  orderType
  price {
    __typename
    ...PriceSummary
  }
  properties {
    ...SeaportOrderDetails
  }
  calldata
}
    ${NetworkInfoDetailsFragmentDoc}
${PriceSummaryFragmentDoc}
${SeaportOrderDetailsFragmentDoc}`;
export const EventsDocument = gql`
    query events($networks: [NetworkInput!]!, $filter: EventsQueryFilter, $pagination: PaginationInput!, $sort: EventSortKeySortInput!, $where: EventsQueryInput!) {
  events(
    networks: $networks
    filter: $filter
    pagination: $pagination
    sort: $sort
    where: $where
  ) {
    __typename
    pageInfo {
      __typename
      ...PageInfoDefault
    }
    nodes {
      ...EventInfo
    }
  }
}
    ${PageInfoDefaultFragmentDoc}
${EventInfoFragmentDoc}`;
export const MarketsDocument = gql`
    query markets($networks: [NetworkInput!]!, $filter: MarketsQueryFilter, $pagination: PaginationInput!, $sort: MarketSortKeySortInput!, $where: MarketsQueryInput, $includeFullDetails: Boolean!) {
  markets(
    networks: $networks
    filter: $filter
    sort: $sort
    where: $where
    pagination: $pagination
  ) {
    __typename
    pageInfo {
      endCursor
      hasNextPage
      limit
    }
    nodes {
      token {
        ...TokenInfo
        ...TokenDetails @include(if: $includeFullDetails)
      }
      market {
        ...MarketInfo
        ...MarketDetails @include(if: $includeFullDetails)
      }
    }
  }
}
    ${TokenInfoFragmentDoc}
${TokenDetailsFragmentDoc}
${MarketInfoFragmentDoc}
${MarketDetailsFragmentDoc}`;
export const MintsDocument = gql`
    query mints($networks: [NetworkInput!]!, $filter: MintsQueryFilter, $pagination: PaginationInput!, $sort: MintSortKeySortInput!, $where: MintsQueryInput, $includeFullDetails: Boolean!, $includeMarkets: Boolean!) {
  mints(
    where: $where
    networks: $networks
    filter: $filter
    pagination: $pagination
    sort: $sort
  ) {
    __typename
    pageInfo {
      endCursor
      hasNextPage
      limit
    }
    nodes {
      __typename
      mint {
        collectionAddress
        tokenId
        originatorAddress
        toAddress
        transactionInfo {
          ...TransactionDetails
        }
      }
      token {
        ...TokenInfo
        ...TokenDetails @include(if: $includeFullDetails)
      }
      ...MarketsOnMintInfo @include(if: $includeMarkets)
    }
  }
}
    ${TransactionDetailsFragmentDoc}
${TokenInfoFragmentDoc}
${TokenDetailsFragmentDoc}
${MarketsOnMintInfoFragmentDoc}`;
export const CollectionsDocument = gql`
    query collections($networks: [NetworkInput!]!, $where: CollectionsQueryInput!, $pagination: PaginationInput!, $sort: CollectionSortKeySortInput!, $includeFullDetails: Boolean!) {
  collections(
    where: $where
    networks: $networks
    pagination: $pagination
    sort: $sort
  ) {
    __typename
    pageInfo {
      endCursor
      hasNextPage
      limit
    }
    nodes {
      ...CollectionInfo
      ...CollectionDetails @include(if: $includeFullDetails)
    }
  }
}
    ${CollectionInfoFragmentDoc}
${CollectionDetailsFragmentDoc}`;
export const SalesDocument = gql`
    query sales($networks: [NetworkInput!]!, $where: SalesQueryInput!, $filter: SalesQueryFilter, $sort: SaleSortKeySortInput!, $pagination: PaginationInput!, $includeFullDetails: Boolean!) {
  sales(
    networks: $networks
    where: $where
    filter: $filter
    sort: $sort
    pagination: $pagination
  ) {
    __typename
    pageInfo {
      endCursor
      hasNextPage
      limit
    }
    nodes {
      sale {
        ...SaleInfo
      }
      token {
        ...TokenInfo
        ...TokenDetails @include(if: $includeFullDetails)
      }
    }
  }
}
    ${SaleInfoFragmentDoc}
${TokenInfoFragmentDoc}
${TokenDetailsFragmentDoc}`;
export const TokensDocument = gql`
    query tokens($networks: [NetworkInput!]!, $where: TokensQueryInput, $filter: TokensQueryFilter, $pagination: PaginationInput!, $sort: TokenSortInput!, $includeFullDetails: Boolean!, $includeSalesHistory: Boolean!) {
  tokens(
    where: $where
    networks: $networks
    pagination: $pagination
    sort: $sort
    filter: $filter
  ) {
    __typename
    pageInfo {
      endCursor
      hasNextPage
      limit
    }
    nodes {
      __typename
      marketsSummary {
        ...MarketInfo
        ...MarketDetails @include(if: $includeFullDetails)
      }
      token {
        ...TokenInfo
        ...TokenDetails @include(if: $includeFullDetails)
      }
      ...TokensSalesInfo @include(if: $includeSalesHistory)
      ...TokensEventsInfo @include(if: $includeFullDetails)
    }
  }
}
    ${MarketInfoFragmentDoc}
${MarketDetailsFragmentDoc}
${TokenInfoFragmentDoc}
${TokenDetailsFragmentDoc}
${TokensSalesInfoFragmentDoc}
${TokensEventsInfoFragmentDoc}`;
export const TokenDocument = gql`
    query token($network: NetworkInput!, $token: TokenInput!, $includeFullDetails: Boolean!) {
  token(network: $network, token: $token) {
    __typename
    token {
      __typename
      ...TokenInfo
      ...TokenDetails @include(if: $includeFullDetails)
    }
    ...TokenFullDetails @include(if: $includeFullDetails)
    markets(
      pagination: {limit: 10, after: null}
      sort: {sortKey: NONE, sortDirection: DESC}
    ) {
      ...MarketInfo
      ...MarketDetails @include(if: $includeFullDetails)
    }
  }
}
    ${TokenInfoFragmentDoc}
${TokenDetailsFragmentDoc}
${TokenFullDetailsFragmentDoc}
${MarketInfoFragmentDoc}
${MarketDetailsFragmentDoc}`;
export const OffchainOrdersDocument = gql`
    query offchainOrders($networks: [NetworkInput!], $where: OffchainOrdersQueryInput, $filter: OffchainOrdersQueryFilter, $sort: OffchainOrderSortKeySortInput, $pagination: PaginationInput) {
  offchainOrders(
    networks: $networks
    where: $where
    filter: $filter
    sort: $sort
    pagination: $pagination
  ) {
    nodes {
      __typename
      token {
        __typename
        ...TokenInfo
      }
      offchainOrder {
        __typename
        ...OffchainOrderInfo
      }
    }
    pageInfo {
      __typename
      ...PageInfoDefault
    }
  }
}
    ${TokenInfoFragmentDoc}
${OffchainOrderInfoFragmentDoc}
${PageInfoDefaultFragmentDoc}`;
export const AggregateAttributesDocument = gql`
    query aggregateAttributes($networks: [NetworkInput!]!, $where: AggregateAttributesQueryInput!) {
  aggregateAttributes(networks: $networks, where: $where) {
    traitType
    valueMetrics {
      value
      count
      percent
    }
  }
}
    `;
export const OwnersByCountDocument = gql`
    query ownersByCount($networks: [NetworkInput!]!, $pagination: PaginationInput!, $where: OwnersByCountQueryInput!) {
  aggregateStat {
    ownersByCount(networks: $networks, pagination: $pagination, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
        limit
      }
      nodes {
        ...OwnerCountInfo
      }
    }
  }
}
    ${OwnerCountInfoFragmentDoc}`;
export const SalesVolumeDocument = gql`
    query salesVolume($networks: [NetworkInput!]!, $where: CollectionAddressOwnerAddressAttributesInput!, $filter: SalesVolumeFilter) {
  aggregateStat {
    salesVolume(where: $where, networks: $networks, filter: $filter) {
      chainTokenPrice
      usdcPrice
      totalCount
    }
  }
}
    `;
export const OwnerCountDocument = gql`
    query ownerCount($networks: [NetworkInput!]!, $where: CollectionAddressAndAttributesInput!) {
  aggregateStat {
    ownerCount(where: $where, networks: $networks)
  }
}
    `;
export const NftCountDocument = gql`
    query nftCount($networks: [NetworkInput!]!, $where: CollectionAddressOwnerAddressAttributesInput!) {
  aggregateStat {
    nftCount(where: $where, networks: $networks)
  }
}
    `;
export const FloorPriceDocument = gql`
    query floorPrice($networks: [NetworkInput!]!, $where: CollectionAddressAndAttributesInput!) {
  aggregateStat {
    floorPrice(where: $where, networks: $networks)
  }
}
    `;
export const CollectionStatsAggregateDocument = gql`
    query collectionStatsAggregate($collectionAddress: String!, $networks: [NetworkInput!]!) {
  aggregateStat {
    floorPrice(
      where: {collectionAddresses: [$collectionAddress]}
      networks: $networks
    )
    ownerCount(
      where: {collectionAddresses: [$collectionAddress]}
      networks: $networks
    )
    nftCount(
      where: {collectionAddresses: [$collectionAddress]}
      networks: $networks
    )
    salesVolume(
      where: {collectionAddresses: [$collectionAddress]}
      networks: $networks
    ) {
      chainTokenPrice
      usdcPrice
      totalCount
    }
  }
}
    `;
export const SearchDocument = gql`
    query search($pagination: SearchPaginationInput!, $query: SearchQueryInput!, $filter: SearchFilter) {
  search(pagination: $pagination, query: $query, filter: $filter) {
    __typename
    pageInfo {
      endCursor
      hasNextPage
      limit
    }
    nodes {
      name
      description
      entityType
      collectionAddress
      networkInfo {
        chain
        network
      }
      tokenId
      entity {
        __typename
        ... on Token {
          ...TokenInfo
        }
        ... on Collection {
          ...CollectionInfoSearchResult
        }
      }
    }
  }
}
    ${TokenInfoFragmentDoc}
${CollectionInfoSearchResultFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    events(variables: EventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventsQuery>(EventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'events');
    },
    markets(variables: MarketsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MarketsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MarketsQuery>(MarketsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'markets');
    },
    mints(variables: MintsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MintsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MintsQuery>(MintsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'mints');
    },
    collections(variables: CollectionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CollectionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectionsQuery>(CollectionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'collections');
    },
    sales(variables: SalesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SalesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SalesQuery>(SalesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'sales');
    },
    tokens(variables: TokensQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokensQuery>(TokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'tokens');
    },
    token(variables: TokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TokenQuery>(TokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'token');
    },
    offchainOrders(variables?: OffchainOrdersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OffchainOrdersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OffchainOrdersQuery>(OffchainOrdersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'offchainOrders');
    },
    aggregateAttributes(variables: AggregateAttributesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AggregateAttributesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AggregateAttributesQuery>(AggregateAttributesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'aggregateAttributes');
    },
    ownersByCount(variables: OwnersByCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OwnersByCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OwnersByCountQuery>(OwnersByCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ownersByCount');
    },
    salesVolume(variables: SalesVolumeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SalesVolumeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SalesVolumeQuery>(SalesVolumeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'salesVolume');
    },
    ownerCount(variables: OwnerCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<OwnerCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<OwnerCountQuery>(OwnerCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ownerCount');
    },
    nftCount(variables: NftCountQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<NftCountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<NftCountQuery>(NftCountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'nftCount');
    },
    floorPrice(variables: FloorPriceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FloorPriceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<FloorPriceQuery>(FloorPriceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'floorPrice');
    },
    collectionStatsAggregate(variables: CollectionStatsAggregateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CollectionStatsAggregateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CollectionStatsAggregateQuery>(CollectionStatsAggregateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'collectionStatsAggregate');
    },
    search(variables: SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchQuery>(SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'search');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type TokenContractInfoFragment = { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number };

export type FullMediaFragment = { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null };

export type PriceSummaryFragment = { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null };

export type MintDetailsFragment = { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } };

export type TransactionDetailsFragment = { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null };

export type SaleInfoFragment = { __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, collectionAddress: string, sellerAddress: string, tokenId: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

export type V2AuctionMarketPropertiesFragment = { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null };

export type V3AskPropertiesFragment = { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

export type V1OfferPropertiesFragment = { __typename?: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

export type V1AskPropertiesFragment = { __typename?: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type MarketPropertiesFull_LilNounsAuction_Fragment = { __typename: 'LilNounsAuction' };

type MarketPropertiesFull_NounsAuction_Fragment = { __typename: 'NounsAuction' };

type MarketPropertiesFull_V1Ask_Fragment = { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type MarketPropertiesFull_V1BidShare_Fragment = { __typename: 'V1BidShare' };

type MarketPropertiesFull_V1Offer_Fragment = { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type MarketPropertiesFull_V2Auction_Fragment = { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null };

type MarketPropertiesFull_V3Ask_Fragment = { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type MarketPropertiesFull_V3ReserveAuction_Fragment = { __typename: 'V3ReserveAuction' };

export type MarketPropertiesFullFragment = MarketPropertiesFull_LilNounsAuction_Fragment | MarketPropertiesFull_NounsAuction_Fragment | MarketPropertiesFull_V1Ask_Fragment | MarketPropertiesFull_V1BidShare_Fragment | MarketPropertiesFull_V1Offer_Fragment | MarketPropertiesFull_V2Auction_Fragment | MarketPropertiesFull_V3Ask_Fragment | MarketPropertiesFull_V3ReserveAuction_Fragment;

export type NetworkInfoDetailsFragment = { __typename?: 'NetworkInfo', chain: Chain, network: Network };

export type MarketInfoFragment = { __typename?: 'Market', collectionAddress?: string | null, marketAddress: string, marketType: MarketType, status: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network } };

export type MarketDetailsFragment = { __typename?: 'Market', properties?: { __typename: 'LilNounsAuction' } | { __typename: 'NounsAuction' } | { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1BidShare' } | { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3ReserveAuction' } | null };

export type TokenInfoFragment = { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null };

type V1MarketEventPropertiesInfo_V1MarketAskCreatedEventProperties_Fragment = { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V1MarketEventPropertiesInfo_V1MarketAskRemovedEventProperties_Fragment = { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V1MarketEventPropertiesInfo_V1MarketBidShareUpdatedEventProperties_Fragment = { __typename: 'V1MarketBidShareUpdatedEventProperties' };

type V1MarketEventPropertiesInfo_V1MarketOfferCreatedEventProperties_Fragment = { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V1MarketEventPropertiesInfo_V1MarketOfferFinalizedEventProperties_Fragment = { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V1MarketEventPropertiesInfo_V1MarketOfferRemovedEventProperties_Fragment = { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

export type V1MarketEventPropertiesInfoFragment = V1MarketEventPropertiesInfo_V1MarketAskCreatedEventProperties_Fragment | V1MarketEventPropertiesInfo_V1MarketAskRemovedEventProperties_Fragment | V1MarketEventPropertiesInfo_V1MarketBidShareUpdatedEventProperties_Fragment | V1MarketEventPropertiesInfo_V1MarketOfferCreatedEventProperties_Fragment | V1MarketEventPropertiesInfo_V1MarketOfferFinalizedEventProperties_Fragment | V1MarketEventPropertiesInfo_V1MarketOfferRemovedEventProperties_Fragment;

type V2AuctionEventPropertiesInfo_V2AuctionApprovalUpdatedEventProperties_Fragment = { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean };

type V2AuctionEventPropertiesInfo_V2AuctionBidEventProperties_Fragment = { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V2AuctionEventPropertiesInfo_V2AuctionCanceledEventProperties_Fragment = { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string };

type V2AuctionEventPropertiesInfo_V2AuctionCreatedEventProperties_Fragment = { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V2AuctionEventPropertiesInfo_V2AuctionDurationExtendedEventProperties_Fragment = { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string };

type V2AuctionEventPropertiesInfo_V2AuctionEndedEventProperties_Fragment = { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string };

type V2AuctionEventPropertiesInfo_V2AuctionReservePriceUpdatedEventProperties_Fragment = { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

export type V2AuctionEventPropertiesInfoFragment = V2AuctionEventPropertiesInfo_V2AuctionApprovalUpdatedEventProperties_Fragment | V2AuctionEventPropertiesInfo_V2AuctionBidEventProperties_Fragment | V2AuctionEventPropertiesInfo_V2AuctionCanceledEventProperties_Fragment | V2AuctionEventPropertiesInfo_V2AuctionCreatedEventProperties_Fragment | V2AuctionEventPropertiesInfo_V2AuctionDurationExtendedEventProperties_Fragment | V2AuctionEventPropertiesInfo_V2AuctionEndedEventProperties_Fragment | V2AuctionEventPropertiesInfo_V2AuctionReservePriceUpdatedEventProperties_Fragment;

type V3AskEventPropertiesInfo_V3AskCanceledEventProperties_Fragment = { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V3AskEventPropertiesInfo_V3AskCreatedEventProperties_Fragment = { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V3AskEventPropertiesInfo_V3AskFilledEventProperties_Fragment = { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V3AskEventPropertiesInfo_V3AskPriceUpdatedEventProperties_Fragment = { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } };

type V3AskEventPropertiesInfo_V3PrivateAskEventProperties_Fragment = { __typename: 'V3PrivateAskEventProperties' };

export type V3AskEventPropertiesInfoFragment = V3AskEventPropertiesInfo_V3AskCanceledEventProperties_Fragment | V3AskEventPropertiesInfo_V3AskCreatedEventProperties_Fragment | V3AskEventPropertiesInfo_V3AskFilledEventProperties_Fragment | V3AskEventPropertiesInfo_V3AskPriceUpdatedEventProperties_Fragment | V3AskEventPropertiesInfo_V3PrivateAskEventProperties_Fragment;

export type EventInfoFragment = { __typename?: 'Event', eventType: EventType, collectionAddress?: string | null, tokenId?: string | null, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, properties: { __typename: 'ApprovalEvent' } | { __typename: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', tokenId: string, collectionAddress: string, originatorAddress: string, toAddress: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'NounsAuctionEvent' } | { __typename: 'Sale' } | { __typename: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string, collectionAddress: string, tokenId: string } | { __typename: 'V1MarketEvent', v1MarketEventType: V1MarketEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketBidShareUpdatedEventProperties' } | { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V2AuctionEvent', v2AuctionEventType: V2AuctionEventType, address: string, auctionId: number, collectionAddress: string, tokenId: string, properties: { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean } | { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string } | { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string } | { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string } | { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V3AskEvent', v3AskEventType: V3AskEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3PrivateAskEventProperties' } } | { __typename: 'V3ReserveAuctionEvent' } };

export type TokenDetailsFragment = { __typename?: 'Token', metadata?: any | null, tokenUrl?: string | null, tokenUrlMimeType?: string | null, attributes?: Array<{ __typename?: 'TokenAttribute', traitType?: string | null, value?: string | null, displayType?: string | null }> | null };

export type CollectionInfoFragment = { __typename?: 'Collection', address: string, description: string, name?: string | null, symbol?: string | null, totalSupply?: number | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network } };

export type CollectionInfoSearchResultFragment = { __typename?: 'Collection', address: string, name?: string | null, symbol?: string | null, totalSupply?: number | null, collectionDescription: string };

export type CollectionDetailsFragment = { __typename?: 'Collection', networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, attributes?: Array<{ __typename?: 'CollectionAttribute', traitType?: string | null, valueMetrics: Array<{ __typename?: 'CollectionAttributeValue', count: number, percent: number, value: string }> }> | null };

export type PageInfoDefaultFragment = { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number };

export type OwnerCountInfoFragment = { __typename?: 'OwnerCount', owner: string, count: number, tokenIds: Array<string> };

export type EventsQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  filter?: InputMaybe<EventsQueryFilter>;
  pagination: PaginationInput;
  sort: EventSortKeySortInput;
  where: EventsQueryInput;
}>;


export type EventsQuery = { __typename?: 'RootQuery', events: { __typename: 'EventConnection', pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename?: 'Event', eventType: EventType, collectionAddress?: string | null, tokenId?: string | null, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, properties: { __typename: 'ApprovalEvent' } | { __typename: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', tokenId: string, collectionAddress: string, originatorAddress: string, toAddress: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'NounsAuctionEvent' } | { __typename: 'Sale' } | { __typename: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string, collectionAddress: string, tokenId: string } | { __typename: 'V1MarketEvent', v1MarketEventType: V1MarketEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketBidShareUpdatedEventProperties' } | { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V2AuctionEvent', v2AuctionEventType: V2AuctionEventType, address: string, auctionId: number, collectionAddress: string, tokenId: string, properties: { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean } | { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string } | { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string } | { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string } | { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V3AskEvent', v3AskEventType: V3AskEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3PrivateAskEventProperties' } } | { __typename: 'V3ReserveAuctionEvent' } }> } };

export type MarketsQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  filter?: InputMaybe<MarketsQueryFilter>;
  pagination: PaginationInput;
  sort: MarketSortKeySortInput;
  where?: InputMaybe<MarketsQueryInput>;
  includeFullDetails: Scalars['Boolean'];
}>;


export type MarketsQuery = { __typename?: 'RootQuery', markets: { __typename: 'MarketWithTokenConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename?: 'MarketWithToken', token?: { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, metadata?: any | null, tokenUrl?: string | null, tokenUrlMimeType?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, attributes?: Array<{ __typename?: 'TokenAttribute', traitType?: string | null, value?: string | null, displayType?: string | null }> | null } | null, market: { __typename?: 'Market', collectionAddress?: string | null, marketAddress: string, marketType: MarketType, status: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, properties?: { __typename: 'LilNounsAuction' } | { __typename: 'NounsAuction' } | { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1BidShare' } | { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3ReserveAuction' } | null } }> } };

export type MarketsOnMintInfoFragment = { __typename?: 'MintWithTokenAndMarkets', markets: Array<{ __typename?: 'Market', collectionAddress?: string | null, marketAddress: string, marketType: MarketType, status: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, properties?: { __typename: 'LilNounsAuction' } | { __typename: 'NounsAuction' } | { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1BidShare' } | { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3ReserveAuction' } | null }> };

export type MintsQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  filter?: InputMaybe<MintsQueryFilter>;
  pagination: PaginationInput;
  sort: MintSortKeySortInput;
  where?: InputMaybe<MintsQueryInput>;
  includeFullDetails: Scalars['Boolean'];
  includeMarkets: Scalars['Boolean'];
}>;


export type MintsQuery = { __typename?: 'RootQuery', mints: { __typename: 'MintWithTokenAndMarketsConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename: 'MintWithTokenAndMarkets', mint: { __typename?: 'Mint', collectionAddress: string, tokenId: string, originatorAddress: string, toAddress: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } }, token?: { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, metadata?: any | null, tokenUrl?: string | null, tokenUrlMimeType?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, attributes?: Array<{ __typename?: 'TokenAttribute', traitType?: string | null, value?: string | null, displayType?: string | null }> | null } | null, markets: Array<{ __typename?: 'Market', collectionAddress?: string | null, marketAddress: string, marketType: MarketType, status: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, properties?: { __typename: 'LilNounsAuction' } | { __typename: 'NounsAuction' } | { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1BidShare' } | { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3ReserveAuction' } | null }> }> } };

export type CollectionsQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: CollectionsQueryInput;
  pagination: PaginationInput;
  sort: CollectionSortKeySortInput;
  includeFullDetails: Scalars['Boolean'];
}>;


export type CollectionsQuery = { __typename?: 'RootQuery', collections: { __typename: 'CollectionConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename?: 'Collection', address: string, description: string, name?: string | null, symbol?: string | null, totalSupply?: number | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, attributes?: Array<{ __typename?: 'CollectionAttribute', traitType?: string | null, valueMetrics: Array<{ __typename?: 'CollectionAttributeValue', count: number, percent: number, value: string }> }> | null }> } };

export type SalesQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: SalesQueryInput;
  filter?: InputMaybe<SalesQueryFilter>;
  sort: SaleSortKeySortInput;
  pagination: PaginationInput;
  includeFullDetails: Scalars['Boolean'];
}>;


export type SalesQuery = { __typename?: 'RootQuery', sales: { __typename: 'SaleWithTokenConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename?: 'SaleWithToken', sale: { __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, collectionAddress: string, sellerAddress: string, tokenId: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } }, token?: { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, metadata?: any | null, tokenUrl?: string | null, tokenUrlMimeType?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, attributes?: Array<{ __typename?: 'TokenAttribute', traitType?: string | null, value?: string | null, displayType?: string | null }> | null } | null }> } };

export type TokensSalesInfoFragment = { __typename?: 'TokenWithMarketsSummary', sales: Array<{ __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, collectionAddress: string, sellerAddress: string, tokenId: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } }> };

export type TokensEventsInfoFragment = { __typename?: 'TokenWithMarketsSummary', events: Array<{ __typename?: 'Event', eventType: EventType, collectionAddress?: string | null, tokenId?: string | null, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, properties: { __typename: 'ApprovalEvent' } | { __typename: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', tokenId: string, collectionAddress: string, originatorAddress: string, toAddress: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'NounsAuctionEvent' } | { __typename: 'Sale' } | { __typename: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string, collectionAddress: string, tokenId: string } | { __typename: 'V1MarketEvent', v1MarketEventType: V1MarketEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketBidShareUpdatedEventProperties' } | { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V2AuctionEvent', v2AuctionEventType: V2AuctionEventType, address: string, auctionId: number, collectionAddress: string, tokenId: string, properties: { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean } | { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string } | { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string } | { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string } | { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V3AskEvent', v3AskEventType: V3AskEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3PrivateAskEventProperties' } } | { __typename: 'V3ReserveAuctionEvent' } }> };

export type TokensQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where?: InputMaybe<TokensQueryInput>;
  filter?: InputMaybe<TokensQueryFilter>;
  pagination: PaginationInput;
  sort: TokenSortInput;
  includeFullDetails: Scalars['Boolean'];
  includeSalesHistory: Scalars['Boolean'];
}>;


export type TokensQuery = { __typename?: 'RootQuery', tokens: { __typename: 'TokenWithMarketsSummaryConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename: 'TokenWithMarketsSummary', marketsSummary: Array<{ __typename?: 'Market', collectionAddress?: string | null, marketAddress: string, marketType: MarketType, status: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, properties?: { __typename: 'LilNounsAuction' } | { __typename: 'NounsAuction' } | { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1BidShare' } | { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3ReserveAuction' } | null }>, token: { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, metadata?: any | null, tokenUrl?: string | null, tokenUrlMimeType?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, attributes?: Array<{ __typename?: 'TokenAttribute', traitType?: string | null, value?: string | null, displayType?: string | null }> | null }, sales: Array<{ __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, collectionAddress: string, sellerAddress: string, tokenId: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } }>, events: Array<{ __typename?: 'Event', eventType: EventType, collectionAddress?: string | null, tokenId?: string | null, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, properties: { __typename: 'ApprovalEvent' } | { __typename: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', tokenId: string, collectionAddress: string, originatorAddress: string, toAddress: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'NounsAuctionEvent' } | { __typename: 'Sale' } | { __typename: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string, collectionAddress: string, tokenId: string } | { __typename: 'V1MarketEvent', v1MarketEventType: V1MarketEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketBidShareUpdatedEventProperties' } | { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V2AuctionEvent', v2AuctionEventType: V2AuctionEventType, address: string, auctionId: number, collectionAddress: string, tokenId: string, properties: { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean } | { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string } | { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string } | { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string } | { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V3AskEvent', v3AskEventType: V3AskEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3PrivateAskEventProperties' } } | { __typename: 'V3ReserveAuctionEvent' } }> }> } };

export type TokenFullDetailsFragment = { __typename?: 'TokenWithFullMarketHistory', sales: Array<{ __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, collectionAddress: string, sellerAddress: string, tokenId: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } }>, events: Array<{ __typename?: 'Event', eventType: EventType, collectionAddress?: string | null, tokenId?: string | null, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, properties: { __typename: 'ApprovalEvent' } | { __typename: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', tokenId: string, collectionAddress: string, originatorAddress: string, toAddress: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'NounsAuctionEvent' } | { __typename: 'Sale' } | { __typename: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string, collectionAddress: string, tokenId: string } | { __typename: 'V1MarketEvent', v1MarketEventType: V1MarketEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketBidShareUpdatedEventProperties' } | { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V2AuctionEvent', v2AuctionEventType: V2AuctionEventType, address: string, auctionId: number, collectionAddress: string, tokenId: string, properties: { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean } | { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string } | { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string } | { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string } | { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V3AskEvent', v3AskEventType: V3AskEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3PrivateAskEventProperties' } } | { __typename: 'V3ReserveAuctionEvent' } }> };

export type TokenQueryVariables = Exact<{
  network: NetworkInput;
  token: TokenInput;
  includeFullDetails: Scalars['Boolean'];
}>;


export type TokenQuery = { __typename?: 'RootQuery', token?: { __typename: 'TokenWithFullMarketHistory', token: { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, metadata?: any | null, tokenUrl?: string | null, tokenUrlMimeType?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, attributes?: Array<{ __typename?: 'TokenAttribute', traitType?: string | null, value?: string | null, displayType?: string | null }> | null }, markets: Array<{ __typename?: 'Market', collectionAddress?: string | null, marketAddress: string, marketType: MarketType, status: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, properties?: { __typename: 'LilNounsAuction' } | { __typename: 'NounsAuction' } | { __typename: 'V1Ask', v1AskStatus: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1BidShare' } | { __typename: 'V1Offer', v1OfferStatus: string, sellOnShare: string, bidder: string, currency: string, amount: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2Auction', firstBidTime?: any | null, highestBidder?: string | null, curator: string, collectionAddress: string, curatorFeePercentage: number, tokenId: string, auctionCurrency: string, duration: string, estimatedExpirationTime?: any | null, v2AuctionStatus: string, tokenOwner: string, address: string, auctionId: string, approved: boolean, reservePrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, highestBidPrice?: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null } | { __typename: 'V3Ask', buyer?: string | null, finder?: string | null, findersFeeBps?: number | null, sellerFundsRecipient?: string | null, v3AskStatus: string, seller: string, address: string, askCurrency: string, collectionAddress: string, askPrice: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3ReserveAuction' } | null }>, sales: Array<{ __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, collectionAddress: string, sellerAddress: string, tokenId: string, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } }>, events: Array<{ __typename?: 'Event', eventType: EventType, collectionAddress?: string | null, tokenId?: string | null, transactionInfo: { __typename?: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null }, properties: { __typename: 'ApprovalEvent' } | { __typename: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', tokenId: string, collectionAddress: string, originatorAddress: string, toAddress: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'NounsAuctionEvent' } | { __typename: 'Sale' } | { __typename: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string, collectionAddress: string, tokenId: string } | { __typename: 'V1MarketEvent', v1MarketEventType: V1MarketEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V1MarketAskCreatedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketAskRemovedEventProperties', amount: string, currency: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketBidShareUpdatedEventProperties' } | { __typename: 'V1MarketOfferCreatedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferFinalizedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V1MarketOfferRemovedEventProperties', amount: string, currency: string, bidder: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V2AuctionEvent', v2AuctionEventType: V2AuctionEventType, address: string, auctionId: number, collectionAddress: string, tokenId: string, properties: { __typename: 'V2AuctionApprovalUpdatedEventProperties', approved: boolean } | { __typename: 'V2AuctionBidEventProperties', sender: string, firstBid: boolean, extended: boolean, value: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionCanceledEventProperties', tokenOwner: string } | { __typename: 'V2AuctionCreatedEventProperties', auctionCurrency: string, tokenOwner: string, curator: string, curatorFeePercentage: number, duration: string, reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V2AuctionDurationExtendedEventProperties', duration: string } | { __typename: 'V2AuctionEndedEventProperties', tokenOwner: string, curator: string, winner: string, auctionCurrency: string, amount: string, curatorFee: string } | { __typename: 'V2AuctionReservePriceUpdatedEventProperties', reservePrice: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } } | { __typename: 'V3AskEvent', v3AskEventType: V3AskEventType, address: string, collectionAddress: string, tokenId: string, properties: { __typename: 'V3AskCanceledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskCreatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskFilledEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, finder: string, buyer: string, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3AskPriceUpdatedEventProperties', seller: string, sellerFundsRecipient: string, askCurrency: string, askPrice: string, findersFeeBps: number, price: { __typename?: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } } | { __typename: 'V3PrivateAskEventProperties' } } | { __typename: 'V3ReserveAuctionEvent' } }> } | null };

export type SeaportOrderItemDetailsFragment = { __typename?: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null };

export type SeaportOrderDetailsFragment = { __typename?: 'SeaportOrder', orderHash: string, offerer: string, startTime: any, endTime: any, orderType: string, zone: string, zoneHash: string, salt: string, conduitKey: string, counter: string, signature: string, schemaHash: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, offers: Array<{ __typename: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null }>, considerations: Array<{ __typename: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null }> };

export type OffchainOrderInfoFragment = { __typename?: 'OffchainOrder', contractAddress: string, collectionAddress?: string | null, tokenId?: string | null, offerer: string, startTime: any, endTime: any, orderType: string, calldata?: string | null, networkInfo: { __typename: 'NetworkInfo', chain: Chain, network: Network }, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, properties: { __typename?: 'SeaportOrder', orderHash: string, offerer: string, startTime: any, endTime: any, orderType: string, zone: string, zoneHash: string, salt: string, conduitKey: string, counter: string, signature: string, schemaHash: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, offers: Array<{ __typename: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null }>, considerations: Array<{ __typename: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null }> } };

export type OffchainOrdersQueryVariables = Exact<{
  networks?: InputMaybe<Array<NetworkInput> | NetworkInput>;
  where?: InputMaybe<OffchainOrdersQueryInput>;
  filter?: InputMaybe<OffchainOrdersQueryFilter>;
  sort?: InputMaybe<OffchainOrderSortKeySortInput>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type OffchainOrdersQuery = { __typename?: 'RootQuery', offchainOrders: { __typename?: 'OffchainOrderWithTokenConnection', nodes: Array<{ __typename: 'OffchainOrderWithToken', token?: { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null } | null, offchainOrder: { __typename: 'OffchainOrder', contractAddress: string, collectionAddress?: string | null, tokenId?: string | null, offerer: string, startTime: any, endTime: any, orderType: string, calldata?: string | null, networkInfo: { __typename: 'NetworkInfo', chain: Chain, network: Network }, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, properties: { __typename?: 'SeaportOrder', orderHash: string, offerer: string, startTime: any, endTime: any, orderType: string, zone: string, zoneHash: string, salt: string, conduitKey: string, counter: string, signature: string, schemaHash: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, offers: Array<{ __typename: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null }>, considerations: Array<{ __typename: 'SeaportOrderItem', itemType: string, address: string, tokenId?: string | null, criteria?: string | null, startAmount: string, endAmount: string, recipient?: string | null, startPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null, endPrice?: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null } | null }> } } }>, pageInfo: { __typename: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number } } };

export type AggregateAttributesQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: AggregateAttributesQueryInput;
}>;


export type AggregateAttributesQuery = { __typename?: 'RootQuery', aggregateAttributes: Array<{ __typename?: 'AggregateAttribute', traitType: string, valueMetrics: Array<{ __typename?: 'AggregateAttributeValue', value: string, count: number, percent: number }> }> };

export type OwnersByCountQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  pagination: PaginationInput;
  where: OwnersByCountQueryInput;
}>;


export type OwnersByCountQuery = { __typename?: 'RootQuery', aggregateStat: { __typename?: 'AggregateStat', ownersByCount: { __typename?: 'OwnerCountConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename?: 'OwnerCount', owner: string, count: number, tokenIds: Array<string> }> } } };

export type SalesVolumeQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: CollectionAddressOwnerAddressAttributesInput;
  filter?: InputMaybe<SalesVolumeFilter>;
}>;


export type SalesVolumeQuery = { __typename?: 'RootQuery', aggregateStat: { __typename?: 'AggregateStat', salesVolume: { __typename?: 'SalesVolume', chainTokenPrice: number, usdcPrice: number, totalCount: number } } };

export type OwnerCountQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: CollectionAddressAndAttributesInput;
}>;


export type OwnerCountQuery = { __typename?: 'RootQuery', aggregateStat: { __typename?: 'AggregateStat', ownerCount: number } };

export type NftCountQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: CollectionAddressOwnerAddressAttributesInput;
}>;


export type NftCountQuery = { __typename?: 'RootQuery', aggregateStat: { __typename?: 'AggregateStat', nftCount: number } };

export type FloorPriceQueryVariables = Exact<{
  networks: Array<NetworkInput> | NetworkInput;
  where: CollectionAddressAndAttributesInput;
}>;


export type FloorPriceQuery = { __typename?: 'RootQuery', aggregateStat: { __typename?: 'AggregateStat', floorPrice?: number | null } };

export type CollectionStatsAggregateQueryVariables = Exact<{
  collectionAddress: Scalars['String'];
  networks: Array<NetworkInput> | NetworkInput;
}>;


export type CollectionStatsAggregateQuery = { __typename?: 'RootQuery', aggregateStat: { __typename?: 'AggregateStat', floorPrice?: number | null, ownerCount: number, nftCount: number, salesVolume: { __typename?: 'SalesVolume', chainTokenPrice: number, usdcPrice: number, totalCount: number } } };

export type SearchQueryVariables = Exact<{
  pagination: SearchPaginationInput;
  query: SearchQueryInput;
  filter?: InputMaybe<SearchFilter>;
}>;


export type SearchQuery = { __typename?: 'RootQuery', search: { __typename: 'SearchResultConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, limit: number }, nodes: Array<{ __typename?: 'SearchResult', name?: string | null, description?: string | null, entityType: string, collectionAddress: string, tokenId?: string | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain, network: Network }, entity?: { __typename: 'Collection', address: string, name?: string | null, symbol?: string | null, totalSupply?: number | null, collectionDescription: string } | { __typename: 'Token', tokenId: string, collectionAddress: string, lastRefreshTime?: any | null, owner?: string | null, name?: string | null, description?: string | null, tokenContract?: { __typename?: 'TokenContract', name?: string | null, network: string, description?: string | null, collectionAddress: string, symbol?: string | null, chain: number } | null, mintInfo?: { __typename?: 'MintInfo', originatorAddress: string, toAddress: string, price: { __typename: 'PriceAtTime', blockNumber: number, chainTokenPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null, nativePrice: { __typename?: 'CurrencyAmount', decimal: number, raw: string, currency: { __typename?: 'Currency', address: string, decimals: number, name: string } }, usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number, raw: string } | null }, mintContext: { __typename: 'TransactionInfo', blockNumber: number, blockTimestamp: any, transactionHash?: string | null, logIndex?: number | null } } | null, image?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null, content?: { __typename?: 'TokenContentMedia', size?: string | null, url?: string | null, mimeType?: string | null, mediaEncoding?: { __typename: 'AudioEncodingTypes', original: string, large?: string | null } | { __typename: 'ImageEncodingTypes', original: string, large?: string | null, poster?: string | null, thumbnail?: string | null } | { __typename: 'UnsupportedEncodingTypes', original: string } | { __typename: 'VideoEncodingTypes', original: string, large?: string | null, poster?: string | null, preview?: string | null, thumbnail?: string | null } | null } | null } | null }> } };
