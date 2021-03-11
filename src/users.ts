import axios from 'axios'

const ZORA_API_BASE_URL = 'https://zora.co'
const MAX_USERS_PER_REQUEST = 100

/**
 * Returns a list of Zora user profiles given a list of up to 100 addresses
 * @param addresses
 */
export async function getZoraProfiles(addresses: string[]) {
  if (addresses.length === 0) {
    throw new Error('Empty addresses array')
  }
  if (addresses.length > MAX_USERS_PER_REQUEST) {
    throw new Error(`Addresses array exceeds max length of ${MAX_USERS_PER_REQUEST}`)
  }
  try {
    const res = await axios.post(`${ZORA_API_BASE_URL}/api/users`, { addresses })
    if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
      throw new Error()
    }
    return res.data
  } catch (err) {
    let msg: string
    if (err.response && err.response.data && typeof err.response.data === 'string') {
      msg = err.response.data
    } else if (err.message) {
      msg = err.message
    } else {
      msg = 'Error retrieving users'
    }
    throw new Error(msg)
  }
}
