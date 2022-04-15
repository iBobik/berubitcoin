export function onRequestPost ({ request }) {
  const data = (await fetch('http://echo.jsontest.com/insert-key-here/insert-value-here/key/value')).json()
  console.log(data)
  return new Response(request)
}
