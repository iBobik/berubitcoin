import fetch, { Request } from 'node-fetch'

const appPrefix = 'apps/efbaec88-cfc7-439c-856a-8a28d216730a/'

export async function fetchDoo (apiKey, path, method = 'GET', body = null) {
  const request = new Request('https://app.tabidoo.cloud/api/v2/' + appPrefix + path, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'content-type': 'application/json;charset=UTF-8'
    }
  })
  const response = await fetch(request)
  if (response.status !== 200) {
    throw new Error(`Tabidoo error: ${response.status} ${response.statusText}\n${await response.text()}\nRequest: ${request.url}\n${JSON.stringify(body)}`)
  }
  return response.json()
}