export function onRequestPost (request) {
  return new Response(JSON.stringify(request.data))
}
