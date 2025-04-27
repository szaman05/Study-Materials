import { SignUpForm } from "@/components/auth/signup/signup-form";
import Link from "next/link";
import { ThemeToggleFab } from "@/components/common/theme-toggle-fab"; // Import the FAB

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Column: Illustration */}
      <div className="flex-1 hidden lg:flex items-center justify-center p-10 bg-gradient-to-br from-primary via-secondary to-accent relative overflow-hidden">
        {/* Illustration */}

        {/* Optional: Subtle background elements if needed */}
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-focus/20 rounded-full translate-x-1/4 translate-y-1/4 blur-2xl"></div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 bg-base-100 text-base-content relative">
        {/* Centered Logo */}
        <div className="w-full max-w-md mb-8">
          <Link
            href="/"
            className="text-3xl font-bold text-primary block text-center"
          >
            ZMN Admin
          </Link>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          {/* Directly use SignInForm, no AuthLayout needed here */}

          <SignUpForm />
        </div>
      </div>

      {/* Theme Toggle FAB */}
      <ThemeToggleFab />
    </div>
  );
}
