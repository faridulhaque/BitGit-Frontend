import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const event = req.headers.get("x-github-event");
    const payload = await req.json();

    // Define the backend URL
    const backendUrl = `${process.env.BASE_URL}/contributions/bit-git`;

    // Forward the request to the main backend
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-github-event": event || "", // Forward GitHub event header
      },
      body: JSON.stringify(payload),
    });

    // Handle backend response
    if (!response.ok) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing GitHub webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
