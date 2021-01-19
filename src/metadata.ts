import {
  Generator,
  Parser,
  Validator,
  validateVersion,
  supportedVersions,
  supportedVersionsTypeMapping,
} from '@zoralabs/media-metadata-schemas/dist/src'
import * as MetadataTypes from '@zoralabs/media-metadata-schemas/dist/types/types'

export { MetadataTypes }
export { validateVersion, supportedVersions, supportedVersionsTypeMapping }
export type JSONLike = { [key: string]: any }

/**
 * Generates alphabetized, minified JSON for the specified Zora Metadata Schema Version.
 * Raises an Error if the data does not conform to the Schema Version specified.
 *
 * @param version
 * @param data
 */
export function generateMetadata(version: string, data: JSONLike): string {
  const generator = new Generator(version)
  return generator.generateJSON(data)
}

/**
 * Parses the metadata into the Schema Version Interface
 *
 * @param version
 * @param json
 */
export function parseMetadata(version: string, json: string) {
  const parser = new Parser(version)
  return parser.parse(json)
}

/**
 * Validates the metadata for the specified schema.
 * Raises if the schema version is not supported.
 *
 * @param version
 * @param data
 */
export function validateMetadata(version: string, data: JSONLike): boolean {
  const validator = new Validator(version)
  return validator.validate(data)
}
