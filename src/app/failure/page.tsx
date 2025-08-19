import Link from "next/link";

export default function Failure() {
  return (
    <div className="p-10 text-red-600 text-center">
      <h1 className="text-2xl font-bold">Payment Failed ❌</h1>
      <p className="mb-6">Please try again or contact support.</p>

      <Link
        href="/"
        className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
