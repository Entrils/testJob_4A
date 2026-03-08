import { NextResponse } from "next/server";
import { TARIFFS_ENDPOINT } from "@/shared/config/tariffs";

export async function GET() {
  try {
    const response = await fetch(TARIFFS_ENDPOINT, {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to load tariffs: ${response.status}` },
        { status: response.status }
      );
    }

    const payload = await response.json();
    const tariffs = Array.isArray(payload) ? payload : [];

    return NextResponse.json(tariffs, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unknown tariffs loading error" },
      { status: 500 }
    );
  }
}
