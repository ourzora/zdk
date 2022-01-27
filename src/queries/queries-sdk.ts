import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  Solana = 'SOLANA',
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

export const GetTokenContractDocument = gql`
  query getTokenContract($addresses: [String!]) {
    tokenContracts(addresses: $addresses) {
      name
      description
    }
  }
`;
export const GetCollectionsDocument = gql`
  query getCollections($addresses: [String!]) {
    collections(addresses: $addresses) {
      name
      description
    }
  }
`;
export const GetTokenDocument = gql`
  query getToken($addresses: [String!]) {
    tokens(addresses: $addresses) {
      name
      metadata
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getTokenContract(
      variables?: GetTokenContractQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetTokenContractQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTokenContractQuery>(GetTokenContractDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getTokenContract'
      );
    },
    getCollections(
      variables?: GetCollectionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetCollectionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCollectionsQuery>(GetCollectionsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getCollections'
      );
    },
    getToken(
      variables?: GetTokenQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTokenQuery>(GetTokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getToken'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type GetTokenContractQueryVariables = Exact<{
  addresses?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetTokenContractQuery = { __typename?: 'RootQuery' } & {
  tokenContracts: Array<
    { __typename?: 'TokenContract' } & Pick<TokenContract, 'name' | 'description'>
  >;
};

export type GetCollectionsQueryVariables = Exact<{
  addresses?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetCollectionsQuery = { __typename?: 'RootQuery' } & {
  collections: Array<
    { __typename?: 'Collection' } & Pick<Collection, 'name' | 'description'>
  >;
};

export type GetTokenQueryVariables = Exact<{
  addresses?: Maybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetTokenQuery = { __typename?: 'RootQuery' } & {
  tokens: Array<{ __typename?: 'Token' } & Pick<Token, 'name' | 'metadata'>>;
};
