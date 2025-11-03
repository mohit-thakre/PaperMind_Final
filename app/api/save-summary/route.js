import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { pdfId, parsedText, summaryText } = body;

    
    if (!pdfId || typeof pdfId !== 'string') {
      return NextResponse.json({ error: "PDF ID is required and must be a string" }, { status: 400 });
    }

    const cleanParsedText = parsedText?.replace(/\0/g, '') || '';
    const cleanSummaryText = summaryText?.replace(/\0/g, '') || '';

    console.log("🔍 Updating PDF:", { 
      pdfId, 
      userId,
      pdfIdType: typeof pdfId,
      parsedTextLength: cleanParsedText?.length, 
      summaryTextLength: cleanSummaryText?.length 
    });

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ 
        error: "User not found" 
      }, { status: 404 });
    }

   
    const existingPdf = await prisma.PDFFile.findFirst({
      where: {
        id: String(pdfId),
        userId: user.id
      },
      select: {
        id: true,
        userId: true
      }
    });

    if (!existingPdf) {
      return NextResponse.json({ 
        error: "PDF not found or you don't have permission" 
      }, { status: 404 });
    }

    const pdfFile = await prisma.PDFFile.update({
      where: { id: String(pdfId) },
      data: {
        parsedText: cleanParsedText,
        summaryText: cleanSummaryText,
      },
    });

    console.log("✅ PDF updated successfully:", { 
      id: pdfFile.id, 
      hasParsedText: !!pdfFile.parsedText, 
      hasSummary: !!pdfFile.summaryText 
    });

    return NextResponse.json({
      success: true,
      message: "PDF parsed text and summary updated successfully",
      pdfFile: pdfFile,
    });

  } catch (error) {
    console.error("❌ Save summary error:", error);
    return NextResponse.json(
      { 
        error: "Internal Server Error",
        details: error.message 
      },
      { status: 500 }
    );
  }
}