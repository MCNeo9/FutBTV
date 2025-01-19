import { linkStore } from "../../page"; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token || !linkStore.has(token)) {
    return new Response(
      JSON.stringify({ message: "Token inválido o no encontrado" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const link = linkStore.get(token); 
  return new Response(JSON.stringify({ link }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
