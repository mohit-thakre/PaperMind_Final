import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const { userId } = await auth();
    console.log("Debug - User ID:", userId);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planType, amount, credits } = await req.json();

    if (!planType || !amount || !credits) {
      return NextResponse.json(
        { error: "Missing required fields: planType, amount, credits" },
        { status: 400 }
      );
    }

    // Define valid plans
    const plans = {
      plan_1: { credits: 1, amount: 1 },
      plan_2: { credits: 2, amount: 2 },
      plan_3: { credits: 3, amount: 3 }
    };

    // Validate plan
    if (!plans[planType] || plans[planType].amount !== amount) {
      return NextResponse.json(
        { error: "Invalid plan type or amount" },
        { status: 400 }
      );
    }

    const selectedPlan = plans[planType];
    
    // Get user
    let user = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create Razorpay order
    const options = {
      amount: selectedPlan.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        planType,
        userId: user.id,
        credits: selectedPlan.credits.toString()
      }
    };
    console.log("Debug - Options:", options);
    const order = await new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    }).orders.create(options);
   
    console.log("Debug - Order created:", order);

    // Save purchase record with pending status
    await prisma.purchase.create({
      data: {
        userId: user.id,
        planType: planType,
        amount: selectedPlan.amount,
        credits: selectedPlan.credits,
        razorpayOrderId: order.id,
        status: "pending"
      }
    });

    return NextResponse.json({
      orderId: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      planType,
      credits: selectedPlan.credits
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Purchase plan error:", error);
    return NextResponse.json(
      { error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}