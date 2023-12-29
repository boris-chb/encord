export async function GET(request: Request, { params }: any) {
  const url = new URL(request.url);

  console.log(params);

  return Response.json({ route: '/api/categories' });
}
