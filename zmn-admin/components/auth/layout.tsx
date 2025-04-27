import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  // Removed title and description props as they are likely handled within the form component now
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4 relative">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          ZMN Admin
        </Link>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-md">
        {/* The children (e.g., SignInForm) will provide the title/description */}
        {children}
      </div>
      {/* ThemeToggleFab will be rendered by the root layout */}
    </div>
  );
}
