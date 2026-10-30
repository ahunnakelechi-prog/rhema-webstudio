import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get("verif-hash");

    if (!signature) {
      return NextResponse.json({ status: "missing signature" }, { status: 400 });
    }

    const expectedHash = crypto
      .createHmac("sha256", process.env.FLUTTERWAVE_SECRET_KEY || "")
      .update(JSON.stringify(body))
      .digest("hex");

    if (signature !== expectedHash) {
      return NextResponse.json({ status: "invalid signature" }, { status: 401 });
    }

    const paymentStatus = body?.data?.status;
    const txRef = body?.data?.tx_ref;

    if (paymentStatus === "successful") {
      console.log("Successful payment confirmed:", txRef);
      // You can save this to a database here.
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
