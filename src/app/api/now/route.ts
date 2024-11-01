// app/api/hello/route.js
export async function GET(request:any) {
    return new Response(JSON.stringify({ message: 'Hello from Next.js 14 API route!' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  