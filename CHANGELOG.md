# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2021-01-28

### Added

- Added `isValidBid` and `isValidAsk` to help clients validate Bids and Asks input data before submitting a transaction to the blockchain

## [1.0.1] - 2021-01-28

### Added

- Hotfix for `Out of Gas` error fixed for Wallet Connect users. Added 10% gas limit padding for mint transactions.

## [1.0.0] - 2021-01-27

### Added

- no additions were made between 1.0.0-rc0 and 1.0.0

## [1.0.0-rc0] - 2021-01-25

### Added

- The Zora class, with contract read and write methods available to interact with instances of the Zora Protocol
- Utility Functions for hashing, constructing types, and doing EIP-712 operations.
- Addresses of officially supported Zora Protocol instances on different networks.
- Export Metadata from media-metadatas-schema
