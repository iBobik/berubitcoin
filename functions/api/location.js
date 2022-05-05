export function onRequestGet ({ request, env }) {
  return new Response(JSON.stringify([
    parseFloat(request.cf.longitude),
    parseFloat(request.cf.latitude)
  ]), {
    headers: { 'content-type': 'application/json;charset=UTF-8' }
  })
}
