import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, amount, packageName } = body;

    if (!email || !name || !amount || !packageName) {
      return NextResponse.json(
        { success: false, message: "Missing required payment details." },
        { status: 400 }
      );
    }

    const txRef = `rhema-${Date.now()}`;

    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: txRef,
        amount: Number(amount),
        currency: "NGN",
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
        customer: {
          email,
          phonenumber: "00000000000",
          name,
        },
        customizations: {
          title: "Rhema Webstudio",
          description: `Payment for ${packageName}`,
          logo: "https://yourdomain.com/logo.png",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      success: true,
      link: response.data.data.link,
    });
  } catch (error) {
    console.error("Flutterwave payment creation failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create payment. Please try again later.",
      },
      { status: 500 }
    );
  }
}
