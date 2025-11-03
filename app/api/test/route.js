import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = auth();
    console.log(userId);
    if (!userId) return NextResponse.json({ data: "unauthorized" });
    return NextResponse.json({ data: userId });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "internal server error" });
  }
}
