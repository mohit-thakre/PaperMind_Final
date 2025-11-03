import { prisma } from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const clerkUser = await currentUser();

    let user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) {
      console.log("🔄 Creating new user in database:", userId);
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses[0].emailAddress,
          name: `${clerkUser.firstName || ""} ${
            clerkUser.lastName || ""
          }`.trim(),
        },
      });
      console.log("✅ User created successfully:", user.id);
    }

    return NextResponse.json({ 
      success: true, 
      user,
      isNewUser: !user.createdAt || (Date.now() - new Date(user.createdAt).getTime()) < 5000 // Check if created within last 5 seconds
    });
  } catch (error) {
    console.error("❌ Get user error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
