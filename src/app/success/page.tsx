import Link from "next/link";

export default function Success() {
    return (
        <div className="p-10 text-green-600 text-center">
            <h1 className="text-2xl font-bold">Payment Successful 🎉</h1>
            <p>Check your email for confirmation.</p>



            <Link
                href="/"
                className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
                Go Home
            </Link>
        </div>
    );
}
