import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function verifyTransaction(reference: string) {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    });
    return response.json();
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/failure`);
    }

    const verify = await verifyTransaction(reference);

    if (verify.data.status === "success") {
        // Send email
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Paystack Demo" <${process.env.EMAIL_USER}>`,
            to: verify.data.customer.email,
            subject: "Payment Confirmation",
            text: `Payment for ₦${verify.data.amount / 100} was successful. Ref: ${reference}`,
        });

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/success`);
    }

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/failure`);
}
