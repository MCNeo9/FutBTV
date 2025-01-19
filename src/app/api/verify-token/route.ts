import { NextResponse } from "next/server";
import { verifyJWTToken } from "@/app/utils/utils";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token no proporcionado." }, { status: 400 });
  }

  try {
    const decoded = verifyJWTToken(token);
    return NextResponse.json({ valid: true, decoded });
  } catch (error) {
    return NextResponse.json({ valid: false, error: "Token inválido o expirado." }, { status: 401 });
  }
}
