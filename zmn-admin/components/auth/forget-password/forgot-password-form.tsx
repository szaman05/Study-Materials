"use client";
import { useActionState } from "react";
import { forgotPassword } from "@/lib/actions/appwrite/auth";
import Link from "next/link";

interface AuthResponse {
  success: boolean;
  error?: string;
  details?: string;
}

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState<AuthResponse, FormData>(
    forgotPassword,
    {
      success: false,
    }
  );

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-base-100 rounded-box shadow-lg">
      <form action={formAction} className="space-y-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="admin@example.com"
            className="input input-bordered w-full"
            required
          />
        </div>

        {state?.error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{state.error}</span>
          </div>
        )}

        {state?.success && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">
              Password reset instructions sent to your email
            </span>
          </div>
        )}

        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Send Reset Instructions
          </button>
        </div>

        <div className="text-center">
          <Link
            href="/signin"
            className="link link-hover text-sm text-base-content/80"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
