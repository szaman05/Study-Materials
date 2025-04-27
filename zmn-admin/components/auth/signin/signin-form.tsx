"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/lib/actions/appwrite/auth";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Define initial state structure matching AuthResponse
const initialState = {
  success: false,
  error: undefined,
  details: undefined,
  redirectTo: undefined,
};

export function SignInForm() {
  const router = useRouter();
  // Use the recommended pattern for forms with useActionState
  const [state, formAction] = useActionState(login, initialState);

  // Handle redirect from server action
  useEffect(() => {
    if (state?.success) {
      // Show success message briefly before redirecting
      const timer = setTimeout(() => {
        if (state.redirectTo) {
          router.push(state.redirectTo);
        } else {
          // Fallback if redirectTo is not provided
          router.push("/dashboard");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [state?.success, state?.redirectTo, router]);

  return (
    <form className="space-y-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

      {/* Display Server Action State */}
      {state?.error && (
        <div role="alert" className="alert alert-error">
          <AlertTriangle className="h-4 w-4" />
          <span>
            {state.error} {state.details ? `(${state.details})` : ""}
          </span>
        </div>
      )}

      {state?.success && (
        <div role="alert" className="alert alert-success">
          <CheckCircle className="h-4 w-4" />
          <span>Login successful! Redirecting to dashboard...</span>
        </div>
      )}

      {/* Email Field */}
      <label className="input input-bordered flex items-center gap-2">
        Email
        <input
          type="email"
          name="email"
          className="grow"
          placeholder="you@example.com"
          required
          aria-label="Email Address"
        />
      </label>

      {/* Password Field */}
      <label className="input input-bordered flex items-center gap-2">
        Password
        <input
          type="password"
          name="password"
          className="grow"
          placeholder="••••••••"
          required
          aria-label="Password"
        />
      </label>

      <div className="text-right">
        <a href="/forgot-password" className="text-sm link link-primary">
          Forgot Password?
        </a>
      </div>

      {/* Use formAction function properly with a button that has type="submit" */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        formAction={formAction}
      >
        Sign In
      </button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/signup" className="link link-primary">
          Sign Up
        </a>
      </p>
    </form>
  );
}
