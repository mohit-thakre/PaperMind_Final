import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pdfId } = await request.json();

    if (!pdfId) {
      return NextResponse.json({ error: "PDF ID is required" }, { status: 400 });
    }

    const deletedPdf = await prisma.PDFFile.delete({
      where: {
        id: pdfId,
        user: {
          clerkId: userId
        }
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "PDF deleted successfully" 
    });

  } catch (error) {
    console.error("❌ Delete PDF error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}