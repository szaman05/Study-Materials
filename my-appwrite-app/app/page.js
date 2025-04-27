// app/page.js (Server Component)
import Link from "next/link";
import { getCurrentUser } from "@/actions/auth";

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="text-center mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to MyAppwriteApp!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        This is a demo application showcasing Next.js Server Actions with
        Appwrite for authentication and profile management.
      </p>
      {user ? (
        <p className="text-md text-gray-700">
          You are logged in as{" "}
          <span className="font-semibold">{user.name}</span>. Visit your{" "}
          <Link
            href="/profile"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Profile
          </Link>
          .
        </p>
      ) : (
        <p className="text-md text-gray-700">
          Please{" "}
          <Link
            href="/login"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Login
          </Link>{" "}
          or{" "}
          <Link
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Sign Up
          </Link>{" "}
          to continue.
        </p>
      )}
    </div>
  );
}
