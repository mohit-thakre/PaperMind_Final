import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { base64Pdf } = await req.json();

    const result = await cloudinary.uploader.upload(
      `data:application/pdf;base64,${base64Pdf}`,
      {
        resource_type: "auto",
        folder: "pdf_uploads",
      }
    );

    return NextResponse.json({ url: result.url }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload PDF" },
      { status: 500 }
    );
  }
}
