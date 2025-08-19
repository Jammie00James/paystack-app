'use client';
import { useState } from "react";
import Script from "next/script";

const items = [
  { id: 1, name: "Book", price: 5000 },
  { id: 2, name: "Headphones", price: 15000 },
  { id: 3, name: "Laptop", price: 250000 },
  { id: 4, name: "Fish", price: 10000 },
];

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (item: {
    id: number;
    name: string;
    price: number;
  }) => {
    const email = prompt("Enter your email:");
    if (!email) return;
    // ✅ Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true)
    const response = await fetch("/api/paystack-init", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, price: item.price }),
    });

    const { authUrl } = await response.json();
    setLoading(false)
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        🛍️ Simple Paystack Shop
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl w-full">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {item.name}
            </h2>
            <p className="text-lg text-gray-600 mb-6">₦{item.price.toLocaleString()}</p>
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-70"
              onClick={() => handlePayment(item)}
              disabled={loading}
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

      {/* Paystack script */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="afterInteractive" />
    </div>
  );
}
