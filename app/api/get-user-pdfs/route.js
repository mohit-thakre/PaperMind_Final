import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        pdfFiles: {
          orderBy: {
            uploadedAt: 'desc'
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      pdfFiles: user.pdfFiles.map(pdf => ({
        id: pdf.id,
        fileName: pdf.fileName,
        originalFileUrl: pdf.originalFileUrl,
        parsedText: pdf.parsedText,
        summaryText: pdf.summaryText,
        uploadedAt: pdf.uploadedAt,
      }))
    });

  } catch (error) {
    console.error("❌ Get user PDFs error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

