    // components/Navbar.jsx
    import Link from 'next/link';
    import { getCurrentUser, logout } from '@/actions/auth'; // Import actions

    // This Navbar is a Server Component by default
    export default async function Navbar() {
      // Fetch the current user directly in the Server Component
      const user = await getCurrentUser();

      return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo/Brand Name */}
            <Link href="/" className="text-xl font-bold hover:text-gray-300">
              MyAppwriteApp
            </Link>

            {/* Navigation Links */}
            <div className="space-x-4 flex items-center">
              <Link href="/" className="hover:text-gray-300">Home</Link>

              {user ? (
                // Show if user is logged in
                <>
                  <Link href="/profile" className="hover:text-gray-300">
                    Profile ({user.name}) {/* Display user's name */}
                  </Link>
                  {/* Logout Button - uses a form to call the server action */}
                  <form action={logout}>
                    <button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                // Show if user is logged out
                <>
                  <Link href="/login" className="hover:text-gray-300">Login</Link>
                  <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      );
    }
    