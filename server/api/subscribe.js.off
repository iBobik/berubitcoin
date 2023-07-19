import { fetchDoo, JSONResponse, errorResponse } from '~/lib/tabidoo'

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
    return errorResponse(err, env.DEBUG)
  }
}
