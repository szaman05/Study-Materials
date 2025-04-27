    // components/SignupForm.jsx
    'use client'; // This component uses hooks

    import { useFormState } from 'react-dom';
    import { signup } from '@/actions/auth'; // Import the server action
    import { SubmitButton, InputField, ErrorDisplay } from './AuthFormElements'; // Import helpers
    import Link from 'next/link';

    export default function SignupForm() {
      // useFormState hook manages form state and action results
      // signup: the server action to call
      // null: the initial state
      const [state, formAction] = useFormState(signup, null);
      // Note: Redirection now happens within the server action on success

      return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
          <form action={formAction} className="space-y-4">
            <InputField
                id="name"
                name="name"
                label="Full Name"
                required
                placeholder="John Doe"
            />
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
                label="Password (min. 8 characters)"
                required
                minLength={8} // Basic client-side validation
                placeholder="********"
            />

            {/* Display error messages from the server action state */}
            <ErrorDisplay state={state} />

            <SubmitButton text="Sign Up" loadingText="Signing Up..." />

             <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                </Link>
            </p>
          </form>
        </div>
      );
    }
    