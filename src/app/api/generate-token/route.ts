import { NextResponse } from "next/server";
import { generateJWTToken } from "@/app/utils/utils";

export async function POST(request: Request) {
  try {
    const { link } = await request.json();
    if (!link) {
      return NextResponse.json({ error: "Link is required" }, { status: 400 });
    }

    const token = generateJWTToken({ link }, "5h");

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Error generating token" },
      { status: 500 }
    );
  }
}
