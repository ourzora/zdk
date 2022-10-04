# ZDK 2.0

If you're looking for 1.0 branch use [v1-archive](https://github.com/ourzora/zdk/tree/v1-archive)

### Getting started

```
yarn add @zoralabs/zdk
```

```ts
import { ZDK, ZDKChain, ZDKNetwork } from '@zoralabs/zdk';

// assuming you set API_ENDPOINT to https://api.zora.co/graphql
const API_ENDPOINT = process.env.API_ENDPOINT;

const zdk = new ZDK({
  endpoint: API_ENDPOINT,
  networks: [
    {
      chain: ZDKChain.Mainnet,
      network: ZDKNetwork.Ethereum,
    },
  ],
  apiKey: API_KEY // optional!
);
```

<a name="ZDK"></a>

## ZDK
ZDK Main Interface class

**Kind**: global class

* [ZDK](#ZDK)
    * [.tokens(where, filter, pagination, networks, sort, includeFullDetails, includeSalesDetails)](#ZDK+tokens) ⇒
    * [.token(args)](#ZDK+token) ⇒ <code>Promise.&lt;TokenQuery&gt;</code>

[Examples Here](https://replit.com/@iainzora/ZDK-Examples?v=1)

<a name="ZDK+tokens"></a>

### zdk.tokens(where, filter, pagination, networks, sort, includeFullDetails, includeSalesDetails) ⇒
Gets data on a group of tokens based on query parameters.

**Returns**: Promise of response from tokens of type TokensQuery

| Param | Description |
| --- | --- |
| where | Arguments to filter tokens by, required. |
| where.collectionAddresses | List of collection addresses to filter by |
| where.ownerAddresses | List of owner addresses to filter by |
| where.tokens: | Tuple of token and id to filter by an exact match as a list |
| filter | Filter query parameters after the where query |
| pagination | Settings for pagination |
| networks | Networks to query on |
| sort | Sorting information for tokens |
| includeFullDetails | include entire token details (full uris, history etc.) |
| includeSalesDetails | include full token sale details for the last 10 sales |

<a name="ZDK+token"></a>

### zdk.token(args) ⇒ <code>Promise.&lt;TokenQuery&gt;</code>
Gets data on a single NFT give a contract address and tokenId.

**Returns**: <code>Promise.&lt;TokenQuery&gt;</code> - Token graphql response

| Param | Type | Description |
| --- | --- | --- |
| args |  | arguemnts for query object |
| args.token |  | Token parameters |
| args.token.address | <code>string</code> | address of the token (req'd) |
| args.token.tokenId | <code>string</code> | string ID of the token (req'd) |
| args.network |  | the network to use to retrieve the token |
| args.network.chain | <code>Chain</code> | Chain to use (default ETHEREUM) |
| args.network.network | <code>Network</code> | Network on the given chain to use (default MAINNET) |
| args.includeFullDetails | <code>bool</code> | should full details be added to the response |

<a name="ZDK+events"></a>

### zdk.events(where, filter, pagination, networks, sort) ⇒
Gets all the events associated with a collection, token, or owner address e.g. Transfers, Mints, Sales, Approvals

**Returns**: <code>Promise.&lt;EventsQuery&gt;</code> - Events graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.collectionAddresses | List of collection addresses to filter by |
| where.tokens: | Tuple of token and id to filter by an exact match as a list |
| filter | Filter query parameters after the where query |
| filter.bidderAddresses | A string array of addresses that have bid on this NFT |
| filter.eventTypes | An array of EventTypes |
| filter.recipientAddresses | A string array of addresses that have received this NFT |
| filter.sellerAddresses | A string array of addresses that have sold this NFT |
| filter.senderAddresses | A string array of addresses that have sent this NFT |
| filter.timeFilter | An input of type TimeFilter for time partitioned event responses. |
| pagination | Settings for pagination |
| pagination.after | A string specifying which record to begin pagination |
| pagination.limit | An int setting the number of event records per page |
| networks | Network info to query on as an array of enums |
| networks.chain | Chain to query on (currently only MAINNET) |
| networks.network | Network to query on (currently only ETHEREUM) |
| sort | Sorting information for tokens |
| sort.direction | An enum value specifying the direction of results | ASC, DESC
| sort.sortKey | An enum value specifying the value to sort results by | ChainTokenPrice, Created, NativePrice, None, TimeSaleEnding

<a name="ZDK+markets"></a>

### zdk.markets(where, filter, pagination, networks, sort, includeFullDetails) ⇒
Gets NFTs that are active on the Zora markets e.g. Buy Now, Offers, Auctions

**Returns**: <code>Promise.&lt;MarketsQuery&gt;</code> - Markets graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.collectionAddresses | List of collection addresses to filter by |
| where.tokens: | Tuple of token and id to filter by an exact match as a list |
| filter | Filter query parameters after the where query |
| filter.marketQueryFilter | Arguments for filtering market info expectations |
| marketQueryFilter.bidderAddresses | A string array of addresses that have bid for this NFT |
| marketQueryFilter.marketType | An enum specifying the version of Zora the order is made on | V1Ask, V1BidShare, V1Offer, V2Auction, V3Ask
| marketQueryFilter.statuses | An enum specifying status of orders being returned | Active, Canceled, Completed
| filter.priceFilter | Arguments for filtering price ranges |
| priceFilter.currencyAddress | A string specifying the currency being used for the market transaction to be returned |
| priceFilter.maximumChainTokenPrice | A string specifying the maximum price of the native chain token (ETH, MATIC, etc) to return |
| priceFilter.maximumNativePrice | A string specifying the minimum price of the native chain token (ETH in our case) to return |
| priceFilter.minimumChainTokenPrice | A string specifying the minimum price of the native chain token (ETH, MATIC, etc) to return |
| priceFilter.minimumNativePrice | A string specifying the minimum price of the native chain token (ETH in our case) to return |
| sort | Sorting information for tokens |
| sort.sortDirection | An enum value specifying the direction of results | ASC, DESC
| sort.sortKey | An enum value specifying the value to sort results by | ChainTokenPrice, Created, NativePrice, None, TimeSaleEnding
| networks | Argument for chain to query as an array of enums |
| networks.chain | Chain to query on (currently only MAINNET) |
| networks.network | Network to query on (currently only ETHEREUM) |
| includeFullDetails | include entire token details (full uris, history etc.) |


<a name="ZDK+mints"></a>

### zdk.mints(where, filter, pagination, networks, sort, includeFullDetails, includeMarkets) ⇒
Gets historic minting data for any NFT or any group of NFTs.

**Returns**: <code>Promise.&lt;MintsQuery&gt;</code> - Mints graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.collectionAddresses | List of collection addresses to filter by |
| where.minterAddresses: | List of minter addresses to filter by |
| where.recipientAddresses | List of receiver addresses to filter by |
| where.tokens: | Tuple of token and id to filter by an exact match as a list |
| filter | Filter query parameters after the where query |
| filter.timeFilter | An input of type TimeFilter for time partitioned event responses. |
| timeFilter.endDate | A date string specifying when to stop collecting mint data|
| timeFilter.lookbackHours | A string specifying how many hours to look back from an end date | 
| timeFilter.startDate | A date string specifying when to start collecting mint data |
| filter.priceFilter | Arguments for filtering price ranges |
| priceFilter.currencyAddress | A string specifying the currency being used for the market transaction to be returned |
| priceFilter.maximumChainTokenPrice | A string specifying the maximum price of the native chain token (ETH, MATIC, etc) to return |
| priceFilter.maximumNativePrice | A string specifying the minimum price of the native chain token (ETH in our case) to return |
| priceFilter.minimumChainTokenPrice | A string specifying the minimum price of the native chain token (ETH, MATIC, etc) to return |
| priceFilter.minimumNativePrice | A string specifying the minimum price of the native chain token (ETH in our case) to return |
| pagination | Settings for pagination |
| pagination.after | A string specifying which record to begin pagination |
| pagination.limit | An int setting the number of event records per page |
| sort | Sorting information for tokens |
| sort.sortDirection | An enum value specifying the direction of results | ASC, DESC
| sort.sortKey | An enum value specifying the value to sort results by | ChainTokenPrice, Created, NativePrice, None, TimeSaleEnding
| networks | Argument for chain to query as an array of enums |
| networks.chain | Chain to query on (currently only MAINNET) |
| networks.network | Network to query on (currently only ETHEREUM) |
| includeFullDetails | include entire token details (full uris, history etc.) |
| includeMarkets | include entire market details for these contracts |

<a name="ZDK+sales"></a>

### zdk.sales(where, filter, pagination, networks, sort, includeFullDetails) ⇒
Gets sales data for any NFT or collection across multiple marketplaces e.g. Zora, OpenSea, LooksRare, Foundation, etc.

**Returns**: <code>Promise.&lt;SalesQuery&gt;</code> - Sales graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.buyerAddresses: | List of minter addresses to filter by |
| where.collectionAddresses | List of collection addresses to filter by |
| where.sellerAddresses | List of receiver addresses to filter by |
| where.tokens: | Tuple of token and id to filter by an exact match as a list |
| filter.timeFilter | An input of type TimeFilter for time partitioned event responses. |
| timeFilter.endDate | A date string specifying when to stop collecting mint data|
| timeFilter.lookbackHours | A string specifying how many hours to look back from an end date | 
| timeFilter.startDate | A date string specifying when to start collecting mint data |
| filter.priceFilter | Arguments for filtering price ranges |
| priceFilter.currencyAddress | A string specifying the currency being used for the market transaction to be returned |
| priceFilter.maximumChainTokenPrice | A string specifying the maximum price of the native chain token (ETH, MATIC, etc) to return |
| priceFilter.maximumNativePrice | A string specifying the minimum price of the native chain token (ETH in our case) to return |
| priceFilter.minimumChainTokenPrice | A string specifying the minimum price of the native chain token (ETH, MATIC, etc) to return |
| priceFilter.minimumNativePrice | A string specifying the minimum price of the native chain token (ETH in our case) to return |
| sort | Sorting information for tokens |
| sort.sortDirection | An enum value specifying the direction of results | ASC, DESC
| sort.sortKey | An enum value specifying the value to sort results by | ChainTokenPrice, Created, NativePrice, None, TimeSaleEnding
| networks | Argument for chain to query as an array of enums |
| networks.chain | Chain to query on (currently only MAINNET) |
| networks.network | Network to query on (currently only ETHEREUM) |
| includeFullDetails | include entire token details (full uris, history etc.) |
| includeMarkets | include entire market details for these contracts |

### zdk.collections(where, pagination, networks, sort, includeFullDetails) ⇒
Gets data for a group of NFT collections.

**Returns**: <code>Promise.&lt;CollectionsQuery&gt;</code> - Collections graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.collectionAddresses | List of collection addresses to filter by |
| pagination | Settings for pagination |
| pagination.after | A string specifying which record to begin pagination |
| pagination.limit | An int setting the number of event records per page |
| networks | Argument for chain to query as an array of enums |
| networks.chain | Chain to query on (currently only MAINNET) |
| networks.network | Network to query on (currently only ETHEREUM) |
| sort | Sorting information for tokens |
| sort.sortDirection | An enum value specifying the direction of results | ASC, DESC
| sort.sortKey | An enum value specifying the value to sort results by | ChainTokenPrice, Created, NativePrice, None, TimeSaleEnding
| includeFullDetails | include entire token details (full uris, history etc.) |

### zdk.collectionStatsAggregate(collectionAddress, network) ⇒
Gets statistics for a specific collection such as the total supply, number of owners and sales volume.

**Returns**: <code>Promise.&lt;CollectionStatsAggregateQuery&gt;</code> - Collection stats graphql response

| Param | Description | Type |
| --- | --- | --- |
| collectionAddresses | List of collection addresses to filter by |
| network | Argument for chain to query as an array of enums |
| network.chain | Chain to query on (currently only MAINNET) |
| network.network | Network to query on (currently only ETHEREUM) |

### zdk.collection(address, network) ⇒
Gets data for a specific NFT collection based on an address.

**Returns**: <code>Promise.&lt;CollectionQuery&gt;</code> - Collection graphql response

| Param | Description | Type |
| --- | --- | --- |
| address | String of collection address to filter by |
| network | Argument for chain to query as an array of enums |
| network.chain | Chain to query on (currently only MAINNET) |
| network.network | Network to query on (currently only ETHEREUM) |

### zdk.ownersByCount(where, pagination, networks) ⇒
Gets the number of NFTs held be certain owner addresses e.g. Top holders of a collection.

**Returns**: <code>Promise.&lt;OwnersByCountQuery&gt;</code> - Owners by count graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.attributes | An array of the CollectionAttributes |
| attributes.traitType | A string to set the trait type to return by |
| attributes.value | A string of a trait's possible value(s) to return by |
| where.collectionAddresses | List of collection addresses to filter by |
| pagination | Settings for pagination |
| pagination.after | A string specifying which record to begin pagination |
| pagination.limit | An int setting the number of event records per page |
| networks | Argument for chain to query as an array of enums |
| network.chains | Chain to query on (currently only MAINNET) |
| network.networks | Network to query on (currently only ETHEREUM) |

### zdk.aggregateAttributes(where, networks) ⇒
Gets statistics on all the attributes for a collection.

**Returns**: <code>Promise.&lt;AggregateAttributesQuery&gt;</code> - Aggregate attributes graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.collectionAddresses | List of collection addresses to filter by |
| where.ownerAddresses | List of owner addresses to filter by |
| where.tokens: | Tuple of token and id to filter by an exact match as a list |
| tokens.address | A string for the contract address to return a token for |
| tokens.tokenId | A string for the tokenId to return a token for |
| networks | Argument for chain to query as an array of enums |
| network.chain | Chain to query on (currently only MAINNET) |
| network.network | Network to query on (currently only ETHEREUM) |

### zdk.salesVolume(where, networks, timeFilter) ⇒
Gets the total sales volume for a collection across all marketplaces.

**Returns**: <code>Promise.&lt;SalesVolumeQuery&gt;</code> - Sales volume graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.attributes | An array of the CollectionAttributes |
| attributes.traitType | A string to set the trait type to return by |
| attributes.value | A string of a trait's possible value(s) to return by |
| where.collectionAddresses | List of collection addresses to filter by |
| networks | Argument for chain to query as an array of enums |
| network.chains | Chain to query on (currently only MAINNET) |
| network.networks | Network to query on (currently only ETHEREUM) |
| timeFilter | Network to query on (currently only ETHEREUM) |
| timeFilter.endDate | A string array of addresses that have bid for this NFT |
| timeFilter.lookbackHours | An enum specifying the version of Zora the order is made on | V1Ask, V1BidShare, V1Offer, V2Auction, V3Ask
| timeFilter.startDate | An enum specifying status of orders being returned | Active, Canceled, Completed

### zdk.ownerCount(where, networks) ⇒
Gets the number of NFTs held be certain owner addresses e.g. Top holders of a collection.

**Returns**: <code>Promise.&lt;OwnerCountQuery&gt;</code> - Owner count graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.attributes | An array of the CollectionAttributes |
| attributes.traitType | A string to set the trait type to return by |
| attributes.value | A string of a trait's possible value(s) to return by |
| where.collectionAddresses | List of collection addresses to filter by |
| networks | Argument for chain to query as an array of enums |
| network.chains | Chain to query on (currently only MAINNET) |
| network.networks | Network to query on (currently only ETHEREUM) |

### zdk.floorPrice(where, networks) ⇒
Gets data on the cheapest available NFT across all Zora marketplaces.

**Returns**: <code>Promise.&lt;FloorPriceQuery&gt;</code> - Floor price graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.attributes | An array of the CollectionAttributes |
| attributes.traitType | A string to set the trait type to return by |
| attributes.value | A string of a trait's possible value(s) to return by |
| where.collectionAddresses | List of collection addresses to filter by |
| networks | Argument for chain to query as an array of enums |
| network.chains | Chain to query on (currently only MAINNET) |
| network.networks | Network to query on (currently only ETHEREUM) |

### zdk.nftCount(where, networks) ⇒
Gets data on the total supply of NFTs in a collection.

**Returns**: <code>Promise.&lt;NftCountQuery&gt;</code> - NFT count graphql response

| Param | Description | Type |
| --- | --- | --- |
| where | Arguments to filter tokens by, required. |
| where.attributes | An array of the CollectionAttributes |
| attributes.traitType | A string to set the trait type to return by |
| attributes.value | A string of a trait's possible value(s) to return by |
| where.collectionAddresses | List of collection addresses to filter by |
| where.ownerAddresses | List of owner addresses to filter by |
| networks | Argument for chain to query as an array of enums |
| network.chains | Chain to query on (currently only MAINNET) |
| network.networks | Network to query on (currently only ETHEREUM) |

### zdk.search(pagination, query, filter) ⇒
Searchs for an NFT or collection based on a string input.

**Returns**: <code>Promise.&lt;SearchQuery&gt;</code> - Search query graphql response

| Param | Description | Type |
| --- | --- | --- |
| pagination | Settings for pagination |
| pagination.after | A string specifying which record to begin pagination |
| pagination.limit | An int setting the number of event records per page |
| query | A text string to query with |
| filter | Parameters for setting query filter |
| filter.collectionAddresses | An array of string addresses to query with |
| filter.entityType | An enum specifying the entity type being queried | COLLECTION, TOKEN

