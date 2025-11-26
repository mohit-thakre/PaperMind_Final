import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Get purchase record
    const purchase = await prisma.purchase.findUnique({
      where: { razorpayOrderId: razorpay_order_id }
    });

    if (!purchase) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Check if already completed
    if (purchase.status === "completed") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
        credits: (await prisma.user.findUnique({ where: { id: purchase.userId } })).credits
      });
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    // Verify purchase belongs to user
    if (purchase.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    // Update purchase and add credits in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update purchase status
      await tx.purchase.update({
        where: { id: purchase.id },
        data: {
          status: "completed",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          completedAt: new Date()
        }
      });

      // Add credits to user
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          credits: { increment: purchase.credits }
        }
      });

      return updatedUser;
    });

    return NextResponse.json({
      success: true,
      message: `Successfully added ${purchase.credits} credit${purchase.credits > 1 ? 's' : ''}!`,
      credits: result.credits
    });

  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}