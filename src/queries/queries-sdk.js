'use strict';
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
exports.getSdk =
  exports.GetTokenDocument =
  exports.GetCollectionsDocument =
  exports.GetTokenContractDocument =
  exports.Network =
    void 0;
var graphql_tag_1 = require('graphql-tag');
var Network;
(function (Network) {
  Network['Ethereum'] = 'ETHEREUM';
  Network['Flow'] = 'FLOW';
  Network['Solana'] = 'SOLANA';
})((Network = exports.Network || (exports.Network = {})));
exports.GetTokenContractDocument = (0, graphql_tag_1['default'])(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n    query getTokenContract($addresses: [String!]) {\n  tokenContracts(addresses: $addresses) {\n    name\n    description\n  }\n}\n    ',
      ],
      [
        '\n    query getTokenContract($addresses: [String!]) {\n  tokenContracts(addresses: $addresses) {\n    name\n    description\n  }\n}\n    ',
      ]
    ))
);
exports.GetCollectionsDocument = (0, graphql_tag_1['default'])(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        '\n    query getCollections($addresses: [String!]) {\n  collections(addresses: $addresses) {\n    name\n    description\n  }\n}\n    ',
      ],
      [
        '\n    query getCollections($addresses: [String!]) {\n  collections(addresses: $addresses) {\n    name\n    description\n  }\n}\n    ',
      ]
    ))
);
exports.GetTokenDocument = (0, graphql_tag_1['default'])(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      [
        '\n    query getToken($addresses: [String!]) {\n  tokens(addresses: $addresses) {\n    name\n    metadata\n  }\n}\n    ',
      ],
      [
        '\n    query getToken($addresses: [String!]) {\n  tokens(addresses: $addresses) {\n    name\n    metadata\n  }\n}\n    ',
      ]
    ))
);
var defaultWrapper = function (action, _operationName) {
  return action();
};
function getSdk(client, withWrapper) {
  if (withWrapper === void 0) {
    withWrapper = defaultWrapper;
  }
  return {
    getTokenContract: function (variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.request(
          exports.GetTokenContractDocument,
          variables,
          __assign(__assign({}, requestHeaders), wrappedRequestHeaders)
        );
      }, 'getTokenContract');
    },
    getCollections: function (variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.request(
          exports.GetCollectionsDocument,
          variables,
          __assign(__assign({}, requestHeaders), wrappedRequestHeaders)
        );
      }, 'getCollections');
    },
    getToken: function (variables, requestHeaders) {
      return withWrapper(function (wrappedRequestHeaders) {
        return client.request(
          exports.GetTokenDocument,
          variables,
          __assign(__assign({}, requestHeaders), wrappedRequestHeaders)
        );
      }, 'getToken');
    },
  };
}
exports.getSdk = getSdk;
var templateObject_1, templateObject_2, templateObject_3;
