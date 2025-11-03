
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(req){
  try{
    const {userId} =await auth();
    if(!userId){
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }
    const {pdfId} = await req.json();
    if(!pdfId){
      return NextResponse.json({error: "PDF ID is required"}, {status: 400});
    }

    const pdf = await prisma.PDFFile.findFirst({
      where: {
        id: pdfId,
        user: { clerkId: userId },
      },
    });

    if (!pdf) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    return NextResponse.json({pdf});
  }
  catch (error) {
    console.error("Error getting single PDF:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}