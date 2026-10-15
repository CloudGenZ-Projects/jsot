export async function onRequest(context) {
  const url = new URL(context.request.url);
  const key = url.pathname.substring(1); // Remove leading /
  const object = await context.env.R2.get(key);
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }
  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000');
  return new Response(object.body, { headers });
}
