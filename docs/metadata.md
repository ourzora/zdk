## Metadata

The Zora Protocol requires media that is minted on its smart contracts contain a URI pointing to its metadata.

The Zora Protocol maintains zero opinion about the structure of that metadata. It is explicitly not enforceable at the blockchain level.

As such, the `media-metadata-schemas` [repository](https://github.com/ourzora/media-metadata-schemas) will serve as the source of truth of community supported metadata schemas described by JSON Schema, and will generate Types, Parsers, Generators, and Validators that will be served through the [Zora Development Kit (ZDK)](https://github.com/ourzora/zdk)

### Generate

Given a schema version and some nonformatted json it generates a valid, minified, alphabetized json

```typescript
import { generateMetadata } from '@zoralabs/zdk'

const metadata = {
  version: 'zora-20210101',
  name: randomName,
  description: randomDescription,
  mimeType: mimeType,
}

const minified = generateMetadata(metadata.version, metadata)
```

### Validate

```typescript
import { validateMetadata } from '@zoralabs/zdk'

const metadata = {
  version: 'zora-20210101',
  name: randomName,
  description: randomDescription,
  mimeType: mimeType,
}

const minified = validateMetadata(metadata.version, metadata)
```

### Parse

```typescript
import { parseMetadata } from '@zoralabs/zdk'

const metadata = `
  {
    version: 'zora-20210101',
    name: randomName,
    description: randomDescription,
    mimeType: mimeType,
  }
`
const parsed = parseMetadata('zora-20210101', metadata)
```

## Define a New Schema

To define a new schema, visit the [github repository](https://github.com/ourzora/media-metadata-schemas) and follow the instructions in the `README.md`

## Further Reading

- JSON-schema spec: https://tools.ietf.org/html/draft-zyp-json-schema-04
- JSON-schema wiki: https://github.com/json-schema/json-schema/wiki
