// components/ProfileForm.jsx
'use client';

import { useActionState } from 'react';
import { updateProfile } from '@/actions/profile'; // Import the update action
import { SubmitButton, InputField, ErrorDisplay } from './AuthFormElements';
import { useState, useEffect } from 'react';

// This form needs the initial profile data to pre-fill the fields
export default function ProfileForm({ initialProfile }) {
  // Initialize form state with the update action
  const [state, formAction] = useActionState(updateProfile, null);

  // Local state to manage input values, initialized from props
  const [username, setUsername] = useState(initialProfile?.username || '');
  const [bio, setBio] = useState(initialProfile?.bio || '');

  // Effect to update local state if the server action returns updated profile data
  useEffect(() => {
    if (state?.success && state?.updatedProfile) {
      setUsername(state.updatedProfile.username);
      setBio(state.updatedProfile.bio || '');
      // Optionally show a success message that fades out
      // console.log("Profile updated successfully via state update!");
    }
  }, [state]); // Depend on the action state

  return (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h3>
      <form action={formAction} className="space-y-4">
        {/* Note: We control the input values with local state */}
        <InputField
          id="username"
          name="username" // Must match formData.get() in action
          label="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update local state on change
          placeholder="Your display name"
        />
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio" // Must match formData.get() in action
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Tell us a little about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)} // Update local state
          />
        </div>

        {/* Display errors from the update action */}
        <ErrorDisplay state={state} />

        {/* Display success message */}
        {state?.success && !state.error && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            <p>{state.message || 'Profile updated successfully!'}</p>
          </div>
        )}

        <SubmitButton text="Update Profile" loadingText="Updating..." />
      </form>
    </div>
  );
}

