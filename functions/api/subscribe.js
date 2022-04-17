import { fetchDoo } from '~/lib/tabidoo'

export async function onRequestPost ({ request, env }) {
  try {
    const formData = await request.formData()
    const data = await fetchDoo(env.TABIDOO_JWT, 'tables/Subscriptions/data', 'POST', {
      fields: {
        email: { href: formData.get('email'), isMailto: true },
        topics: formData.getAll('topics')
      }
    })
    return JSONResponse(data)
  } catch (err) {
    return JSONResponse({ error: env.DEBUG === '1' ? JSON.stringify(err, Object.getOwnPropertyNames(err)) : true }, 500)
  }
}

function JSONResponse (data, status = 200) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json;charset=UTF-8' },
    status
  })
}
