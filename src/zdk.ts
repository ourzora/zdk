import { GraphQLClient } from "graphql-request";
import { ActiveMarketQueryArgs, CollectionQueryArgs, CollectionsQueryArgs, CollectionStatsAggregateQuery, EventsQueryArgs, MarketsQueryArgs, MintsQueryArgs, OffchainOrderQueryArgs, OverrideNetworksOption, SalesQueryArgs, SearchQueryArgs, TokenQueryArgs, TokensQueryArgs } from "./types";
import { AggregateAttributesQueryVariables, Chain, CollectionSortKey, EventSortKey, FloorPriceQueryVariables, getSdk, MarketSortKey, MintSortKey, Network, NftCountQueryVariables, OwnerCountQueryVariables, OwnersByCountQueryVariables, PaginationInput, SaleSortKey, SalesVolumeQueryVariables, SdkFunctionWrapper, SortDirection, TokenSortKey } from "./queries/queries-sdk";

type OptionalNetwork<K> = Omit<K, 'networks'> & {
  networks?: OverrideNetworksOption;
};

const DEFAULT_PROD_ENDPOINT = 'https://api.zora.co/graphql';

type ZDKOptions = {
  endpoint?: string;
  networks?: OverrideNetworksOption;
  apiKey?: string;
};

export class ZDK {
  endpoint: string;
  defaultNetworks: OverrideNetworksOption;
  defaultPageSize: number = 50;
  apiKey?: string;

  public sdk: ReturnType<typeof getSdk>;

  constructor({
    endpoint = DEFAULT_PROD_ENDPOINT,
    networks = [{ network: Network.Ethereum, chain: Chain.Mainnet }],
    apiKey = undefined,
  }: ZDKOptions = {}) {
    this.endpoint = endpoint;
    this.defaultNetworks = networks;
    this.sdk = getSdk(new GraphQLClient(this.endpoint), this.apiKeyWrapper);
    this.apiKey = apiKey;
  }

  private apiKeyWrapper: SdkFunctionWrapper = async <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>
  ): Promise<T> => {
    const headers: Record<string, string> = {};
    if (this.apiKey) {
      headers['X-API-KEY'] = this.apiKey;
    }

    const result = await action(headers);
    return result;
  };

  private getNetworksOption = (networks?: OverrideNetworksOption) => {
    return {
      networks: networks ?? this.defaultNetworks,
    };
  };

  private getPaginationOptions = ({ limit, after }: PaginationInput = {}) => {
    return {
      pagination: {
        limit: limit || this.defaultPageSize,
        after: after || null,
      },
    };
  };

  /**
   * A function to query Zora API for a set of NFT collections.
   * @param {TokenQueryArgs} - where, filter, pagination, networks, sort, includeFullDetails
   * @returns {Promise<TokensQuery>}
   */
  public tokens = async ({
    where,
    filter,
    pagination,
    networks,
    sort,
    includeFullDetails = false,
    includeSalesHistory = false,
  }: TokensQueryArgs) =>
    this.sdk.tokens({
      where,
      filter,
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Asc,
        sortKey: sort?.sortKey || TokenSortKey.Transferred,
        sortAxis: sort?.sortAxis,
      },
      includeFullDetails,
      includeSalesHistory,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
    });

  /**
   * A function to query Zora API for a specific token.
   * @param {TokenInput} - token
   * @param {NetworkInput} - token
   * @returns {Promise<TokenQuery>}
   */
  public token = async ({
    token,
    network = this.defaultNetworks[0],
    includeFullDetails = false,
  }: OptionalNetwork<TokenQueryArgs>) =>
    await this.sdk.token({
      token,
      network,
      includeFullDetails,
    });

  /**
   * A function to query Zora API for a collection's event set.
   * @param {EventQueryArgs} - networks, filter, pagination, sort, where
   * @returns {Promise<EventsQuery>}
   */
  public events = async ({
    networks,
    filter,
    pagination,
    sort,
    where,
  }: EventsQueryArgs) =>
    this.sdk.events({
      filter,
      where,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || EventSortKey.Created,
      },
    });

  /**
   * A function to query Zora API for a collection's market data.
   * @param {MarketQueryArgs} - networks, filter, pagination, sort, where, includeFullDetails
   * @returns {Promise<MarketsQuery>}
   */
  public markets = async ({
    networks,
    filter,
    pagination,
    sort,
    where,
    includeFullDetails = false,
  }: MarketsQueryArgs) =>
    this.sdk.markets({
      filter,
      where,
      includeFullDetails,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || MarketSortKey.None,
      },
    });

  /**
   * A query for getting off-chain liquidity with a variety of protocols.
   *
   * @param {OffchainOrderQueryArgs} - networks, filter, pagiantion, sort, where
   * @returns {Promise<OffchainOrdersQuery>}
   */
  public offchainOrders = async ({
    networks,
    filter,
    pagination,
    sort,
    where,
  }: OffchainOrderQueryArgs) =>
    this.sdk.offchainOrders({
      networks,
      filter,
      pagination,
      sort,
      where,
    });

  /*
   * A function to query Zora API for a collection's market data.
   * @param {MarketQueryArgs} - networks, filter, pagination, sort, where, includeFullDetails
   * @returns {Promise<MarketsQuery>}
   */
  public market = async ({ network, where }: ActiveMarketQueryArgs) =>
    this.sdk.market({
      network: network ?? this.defaultNetworks[0],
      where,
    });

  /**
   * A function to query Zora API for a collection's mint data.
   * @param {MintsQueryArgs} - networks, filter, pagination, sort, where, includeFullDetails, includeMarkets
   * @returns {Promise<MintsQuery>}
   */
  public mints = async ({
    networks,
    filter,
    pagination,
    sort,
    where,
    includeFullDetails = false,
    includeMarkets = false,
  }: MintsQueryArgs) =>
    this.sdk.mints({
      filter,
      where,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || MintSortKey.None,
      },
      includeFullDetails,
      includeMarkets,
    });

  /**
   * A function to query Zora API for a collection's sales data.
   * @param {SalesQueryArgs} - where, networks, filter, pagination, sort, includeFullDetails
   * @returns {Promise<SalesQuery>}
   */
  public sales = async ({
    where,
    pagination,
    networks,
    sort,
    filter,
    includeFullDetails = false,
  }: SalesQueryArgs) =>
    this.sdk.sales({
      where,
      filter,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || SaleSortKey.Time,
      },
      includeFullDetails,
    });

  /**
   * A function to query Zora API for a set of NFT collection's data.
   * @param {CollectionsQueryArgs} - where, networks, pagination, sort, includeFullDetails
   * @returns {Promise<CollectionsQuery>}
   */
  public collections = async ({
    where,
    pagination,
    networks,
    sort,
    includeFullDetails = false,
  }: CollectionsQueryArgs) =>
    this.sdk.collections({
      where,
      includeFullDetails,
      ...this.getPaginationOptions(pagination),
      ...this.getNetworksOption(networks),
      sort: {
        sortDirection: sort?.sortDirection || SortDirection.Desc,
        sortKey: sort?.sortKey || CollectionSortKey.Created,
      },
    });

  /**
   * A function to query Zora API for an NFT collection's aggregate statistical data.
   * @param {CollectionStatsAggregateQuery} - networks, collectionAddress
   * @returns {Promise<CollectionStatsAggregateQuery>}
   */
  public collectionStatsAggregate = async ({
    collectionAddress,
    network,
  }: CollectionStatsAggregateQuery) =>
    this.sdk.collectionStatsAggregate({
      collectionAddress,
      ...this.getNetworksOption(network ? [network] : undefined),
    });

  /**
   * A function to query Zora API for an NFT collection's data.
   * @param {CollectionQueryArgs} - address, networks, includeFullDetails
   * @returns {Promise<CollectionQuery>}
   */
  public collection = async ({
    address,
    network,
    includeFullDetails = true,
  }: CollectionQueryArgs) => {
    const collectionsResponse = await this.sdk.collections({
      where: {
        collectionAddresses: [address],
      },
      pagination: {
        limit: 2,
        after: null,
      },
      sort: {
        sortKey: CollectionSortKey.Created,
        sortDirection: SortDirection.Asc,
      },
      includeFullDetails,
      ...this.getNetworksOption(network ? [network] : undefined),
    });

    const items = collectionsResponse.collections.nodes;
    if (items.length === 0) {
      throw new Error('No collections found');
    }
    if (items.length === 2) {
      throw new Error('Invariant: multiple collections found, expecting 1');
    }
    return items[0];
  };

  /**
   * A function to query Zora API for a set of NFT collection's owners by count.
   * @param {OwnersByCountQueryVariables} - where, networks, pagination
   * @returns {Promise<OwnersByCountQuery>}
   */
  public ownersByCount = async ({
    where,
    pagination,
    networks = this.defaultNetworks,
  }: OptionalNetwork<OwnersByCountQueryVariables>) =>
    this.sdk.ownersByCount({
      where,
      networks,
      pagination,
    });

  /**
   * A function to query Zora API for a set of NFT aggregate attribute data.
   * @param {AggregateAttributesQueryVariable} - where, networks
   * @returns {Promise<AggregateAttributesQuery>}
   */
  public aggregateAttributes = async ({
    where,
    networks = this.defaultNetworks,
  }: OptionalNetwork<AggregateAttributesQueryVariables>) =>
    this.sdk.aggregateAttributes({ where, networks });

  /**
   * A function to query Zora API for a set of NFT collection's sales volume data.
   * @param {SalesVolumeQueryVariables} - where, networks, TimeFilter
   * @returns {Promise<SalesVolumeQuery>}
   */
  public salesVolume = async ({
    where,
    networks = this.defaultNetworks,
    filter,
  }: OptionalNetwork<SalesVolumeQueryVariables>) =>
    this.sdk.salesVolume({
      where,
      networks,
      filter,
    });

  /**
   * A function to query Zora API for a set of NFT owner counts.
   * @param {OwnerCountQueryVariables} - where, networks
   * @returns {Promise<OwnerCountQuery>}
   */
  public ownerCount = async ({
    where,
    networks = this.defaultNetworks,
  }: OptionalNetwork<OwnerCountQueryVariables>) =>
    this.sdk.ownerCount({
      where,
      networks,
    });

  /**
   * A function to query Zora API for a set of NFT collection floor prices
   * @param {FloorPriceQueryVariables} - where, networks
   * @returns {Promise<FloorPriceQuery>}
   */
  public floorPrice = async ({
    where,
    networks = this.defaultNetworks,
  }: OptionalNetwork<FloorPriceQueryVariables>) =>
    this.sdk.floorPrice({
      where,
      networks,
    });

  /**
   * A function to query Zora API for a set of NFT collection count data.
   * @param {NftCountQueryVariables} - where, networks
   * @returns {Promise<NftCountQuery>}
   */
  public nftCount = async ({
    where,
    networks = this.defaultNetworks,
  }: OptionalNetwork<NftCountQueryVariables>) =>
    this.sdk.nftCount({
      where,
      networks,
    });

  /**
   * A function to query Zora API to query for an NFT collection with a query string.
   * @param {SearchQueryArgs} - pagination, query, filter
   * @returns {Promise<SearchQuery>}
   */
  public search = async ({ pagination, query, filter }: SearchQueryArgs) =>
    this.sdk.search({
      filter,
      query: { text: query },
      ...this.getPaginationOptions(pagination),
    });
}
