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
  /** The GenericScalar scalar type represents a generic GraphQL scalar value that could be: List or Object. */
  JSONScalar: any;
};

export type Collection = {
  __typename?: 'Collection';
  address: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
};


export enum Network {
  Ethereum = 'ETHEREUM',
  Flow = 'FLOW',
  Solana = 'SOLANA'
}

export type RootQuery = {
  __typename?: 'RootQuery';
  /** Get all collections */
  collections: Array<Collection>;
  /** Get all token contracts */
  tokenContracts: Array<TokenContract>;
  /** Get all tokens */
  tokens: Array<Token>;
};


export type RootQueryCollectionsArgs = {
  addresses?: Maybe<Array<Scalars['String']>>;
};


export type RootQueryTokenContractsArgs = {
  addresses?: Maybe<Array<Scalars['String']>>;
};


export type RootQueryTokensArgs = {
  addresses?: Maybe<Array<Scalars['String']>>;
};

export type Token = {
  __typename?: 'Token';
  tokenAddress: Scalars['String'];
  tokenId: Scalars['String'];
  network: Network;
  tokenUrl: Scalars['String'];
  tokenUrlMimeType?: Maybe<Scalars['String']>;
  owner: Scalars['String'];
  tokenContract: TokenContract;
  mintBlockNumber: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  externalURL?: Maybe<Scalars['String']>;
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

export type TokenContract = {
  __typename?: 'TokenContract';
  tokenAddress: Scalars['String'];
  network: Scalars['String'];
  chain: Scalars['Int'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  totalSupply?: Maybe<Scalars['Int']>;
  schema: Scalars['String'];
  description: Scalars['String'];
  creator: Scalars['String'];
  iconURL: Scalars['String'];
  externalURL: Scalars['String'];
};
