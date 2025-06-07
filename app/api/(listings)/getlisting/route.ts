import { NextResponse } from "next/server";  // Import NextResponse
import client from "@/db";

export async function GET() {
  try {
    const response = await client.listings.findMany({
      include: {
        images: true,
      },
    });

    // Set Cache-Control to ensure no caching
    const res = NextResponse.json({ data: response });

    // Set Cache-Control header
    res.headers.set("Cache-Control", "no-store");

    return res;  // Return the response
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch listings!" },
      { status: 500 }  // Set the status here
    );
  }
}
