// components/LoginForm.jsx
'use client'; // This component uses hooks

import { useFormState } from 'react-dom';
import { login } from '@/actions/auth'; // Import the server action
import { SubmitButton, InputField, ErrorDisplay } from './AuthFormElements';
import Link from 'next/link';
// Removed: import { useRouter } from 'next/navigation';
// Removed: import { useEffect } from 'react';

export default function LoginForm() {
  // useFormState still manages the form submission and captures *errors* returned by the action
  const [state, formAction] = useFormState(login, null);
  // The server action 'login' will handle the redirect on success directly.

  // Removed the useEffect hook that previously handled client-side redirection/refresh on success.

  return (
     <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form action={formAction} className="space-y-4">
         <InputField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            required
            placeholder="you@example.com"
        />
        <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            required
            placeholder="********"
        />

        {/* Display error messages if the action returns an error state */}
        <ErrorDisplay state={state} />

        <SubmitButton text="Login" loadingText="Logging In..." />

         <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
            </Link>
        </p>
      </form>
    </div>
  );
}
