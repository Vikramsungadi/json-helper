import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    JSON.parse(JSON.stringify(body)); // Validate JSON structure
    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }
}
