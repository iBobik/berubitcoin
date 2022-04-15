export function onRequestPost (request) {
  return new Response(JSON.stringify(request.request.body) + JSON.stringify(request.data))
}
