import { fetchDoo, JSONResponse, errorResponse } from '~/lib/tabidoo'

export async function onRequestPost ({ request, env }) {
  try {
    const formData = await request.formData()
    const data = await fetchDoo(env.TABIDOO_JWT, 'tables/Contacts/data', 'POST', {
      fields: {
        name: formData.get('name'),
        email: { href: formData.get('email'), isMailto: true },
        phone: formData.get('phone'),
        signal: formData.get('signal') === 'on',
        company: formData.get('company'),
        place: { href: formData.get('place') },
        intent: formData.get('intent'),
        message: formData.get('message')
      }
    })
    return JSONResponse(data)
  } catch (err) {
    return errorResponse(err, env.DEBUG)
  }
}
