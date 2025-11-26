import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

 if(user?.credits<=0){
  return NextResponse.json({error:"credit not available"},{status:401})
 }
  
  
    const { base64Pdf, fileName } = await req.json();

    const result = await cloudinary.uploader.upload(
      `data:application/pdf;base64,${base64Pdf}`,
      {
        resource_type: "auto",
        folder: "pdf_uploads",
        public_id: `user_${userId}_${Date.now()}`, 
      }
    );

    const pdfFile = await prisma.PDFFile.create({
      data: {
        userId: user.id,
        fileName: fileName || `PDF_${Date.now()}`,
        originalFileUrl: result.url,
      },
    });

    const UpdateCredit = await prisma.user.update({
      where:{
        id:user.id
      },
      data:{credits : {decrement : 1}}
    })

    return NextResponse.json({ 
      url: result.url,
      pdfId: pdfFile.id,
      message: "PDF uploaded and mapped to user successfully",
      credits : UpdateCredit?.credits
    }, { status: 200 });
  } catch (error) {
    console.error("❌ Upload PDF error:", error);
    return NextResponse.json( 
      { error: "Failed to upload PDF" },
      { status: 500 }
    );
  }
}
