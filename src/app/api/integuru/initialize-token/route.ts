import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://sandbox.integuru.ai/initialize-token",
      {
        method: "GET",
        headers: {
          "INTEGURU-SECRET": process.env.INTEGURU_SECRET || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to initialize token");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error initializing token:", error);
    return NextResponse.json(
      { error: "Failed to initialize token" },
      { status: 500 }
    );
  }
}
