import { gql } from 'graphql-request';


export const QUERY_TOKEN_CONTRACT = gql`
  query TokenContract($addresses: [String!]) {
    tokenContract(addresses: $addresses) {
      name
      description
    }
  }
`;

export const QUERY_COLLECTIONS = gql`
  query Collections($addresses: [String!]) {
    collections(addresses: $addresses) {
      name
      description
    }
  }
`;

export const QUERY_TOKEN = gql`
  query Token($addresses: [String!]) {
    token(addresses: $addresses) {
      name
      metadata
    }
  }
`;
