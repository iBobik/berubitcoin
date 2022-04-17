const dooApp = 'efbaec88-cfc7-439c-856a-8a28d216730a'

export async function onRequestPost ({ request, env }) {
  try {
    const formData = await request.formData()
    const data = await fetchDoo(
      env.TABIDOO_JWT,
      `apps/${dooApp}/tables/88d629e4-48fa-4cae-b86d-b81dac1078fa/data`,
      'POST',
      {
        fields: {
          email: { href: formData.get('email'), isMailto: true },
          topics: formData.getAll('topics')
        }
      }
    )
    return JSONResponse(data)
  } catch (err) {
    return JSONResponse({ error: env.DEBUG === '1' ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : true })
  }
}

async function fetchDoo (apiKey, path, method = 'GET', body = null) {
  const request = new Request('https://app.tabidoo.cloud/api/v2/' + path, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      Authorization: 'Bearer ' + apiKey,
      'content-type': 'application/json;charset=UTF-8'
    }
  })
  const response = await fetch(request)
  if (response.status !== 200) {
    throw new Error(`Tabidoo error: ${response.status} ${response.statusText}\n${await response.text()}\nRequest: ${path}\n${JSON.stringify(body)}`)
  }
  return response.json()
}

function JSONResponse (data) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json;charset=UTF-8' }
  })
}
