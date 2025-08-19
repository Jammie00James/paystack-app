import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, price } = await req.json();

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: price * 100, // Paystack expects kobo
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/paystack-callback`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 400 });
    }

    return NextResponse.json({ authUrl: data.data.authorization_url });
  } catch (error) {
    console.error("Paystack Init Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
