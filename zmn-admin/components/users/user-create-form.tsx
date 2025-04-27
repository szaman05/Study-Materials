// /Users/sohelzaman/dev/nextjs-leaning/zmn-admin/components/users/user-create-form.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { UserPlusIcon, CheckCircle, AlertCircle } from "lucide-react";
import { createUser } from "@/lib/actions/appwrite/auth";
import type { UserProfile } from "@/types/profiles";

const roleOptions = [
  { value: "admin", label: "Admin", teamId: "admin" },
  { value: "editor", label: "Editor", teamId: "editor" },
  { value: "viewer", label: "Viewer", teamId: "viewer" },
  { value: "user", label: "User", teamId: "user" },
];

// Add onSuccess prop
interface UserCreateFormProps {
    onSuccess: () => void;
}

export function UserCreateForm({ onSuccess }: UserCreateFormProps) { // Destructure onSuccess
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  // Remove formSuccessMessage state, rely on parent notification via onSuccess
  // const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Remove toast states, parent component will handle toasts
  // const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Remove success toast effect

  // Keep error toast effect (or let parent handle all toasts)
  useEffect(() => {
    if (formError) {
      setShowErrorToast(true);
      const timer = setTimeout(() => setShowErrorToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setFormError(null);
    // setFormSuccessMessage(null); // Removed
    setIsSubmitting(true);

    // --- Gather data (same as before) ---
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const fullName = formData.get("name")?.toString() || "";
    const roleValue = formData.get("role")?.toString() || "viewer";
    const phone = formData.get("phone")?.toString() || "";
    const isActive = formData.has("isActive");
    const address = formData.get("address")?.toString() || "";
    const city = formData.get("city")?.toString() || "";
    const country = formData.get("country")?.toString() || "";
    const postalCode = formData.get("postalCode")?.toString() || "";

    const selectedRole = roleOptions.find(r => r.value === roleValue) || roleOptions.find(r => r.value === 'viewer');
    const teamId = selectedRole?.teamId || 'viewer';
    const roleDisplayName = selectedRole?.label || "Viewer";

    const userData: UserProfile & { password?: string } = {
      email: email, password: password, userId: '', fullName: fullName, phone: phone,
      role: roleValue, roleDisplayName: roleDisplayName, teamId: teamId, isActive: isActive,
      address: address, city: city, country: country, postalCode: postalCode,
    };

    // --- Client-side validation (same as before) ---
    if (!userData.email || !userData.password || !userData.fullName || !userData.role || !userData.teamId) {
        setFormError("Client Check: Email, password, name, and role are required.");
        setIsSubmitting(false);
        return;
    }
    if (userData.password.length < 8) {
        setFormError("Client Check: Password must be at least 8 characters long.");
        setIsSubmitting(false);
        return;
    }

    console.log("Form: Preparing to call createUser with data:", JSON.stringify(userData, null, 2));

    try {
      const result = await createUser(userData);
      console.log("Form: Received response from createUser", result);

      if (result.success) {
        // setFormSuccessMessage(result.message || "User created successfully!"); // Removed
        formRef.current?.reset();
        onSuccess(); // Call the success callback passed from parent
      } else {
        const errorMsg = result.error + (result.details ? ` (${result.details})` : '');
        setFormError(errorMsg);
      }

    } catch (error) {
      console.error("Form: Error submitting user creation:", error);
      setFormError(error instanceof Error ? error.message : "An unexpected client-side error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // No outer card needed when inside a modal usually
    <>
      {/* Error Toast specific to the form */}
      {showErrorToast && formError && (
        <div className="toast toast-top toast-center z-[60]"> {/* Ensure higher z-index than modal */}
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{formError}</span>
          </div>
        </div>
      )}

      {/* Form Title inside Modal */}
      <h3 className="font-bold text-lg mb-4">
         <UserPlusIcon className="inline h-5 w-5 mr-2" />
         Create New User
      </h3>

      {/* Form structure remains the same */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"> {/* Add scroll if needed */}
         {/* Full Name */}
         <div className="form-control">
           <label className="label"><span className="label-text">Full Name</span></label>
           <input type="text" name="name" className="input input-bordered" placeholder="Full Name" required disabled={isSubmitting} />
         </div>
         {/* Email */}
         <div className="form-control">
           <label className="label"><span className="label-text">Email</span></label>
           <input type="email" name="email" className="input input-bordered" placeholder="Email" required disabled={isSubmitting} />
         </div>
         {/* Password */}
         <div className="form-control">
           <label className="label"><span className="label-text">Password</span></label>
           <input type="password" name="password" className="input input-bordered" placeholder="Password" required disabled={isSubmitting} minLength={8} />
           <label className="label"><span className="label-text-alt">Minimum 8 characters</span></label>
         </div>
         {/* Phone */}
         <div className="form-control">
           <label className="label"><span className="label-text">Phone (Optional)</span></label>
           <input type="tel" name="phone" className="input input-bordered" placeholder="Phone Number" disabled={isSubmitting} />
         </div>
         {/* Role Selection */}
         <div className="form-control">
           <label className="label"><span className="label-text">Assign Role</span></label>
           <select name="role" className="select select-bordered w-full" defaultValue="viewer" required disabled={isSubmitting}>
             {roleOptions.map((role) => (
               <option key={role.value} value={role.value}>{role.label}</option>
             ))}
           </select>
           <label className="label"><span className="label-text-alt">Assigns user role and team membership.</span></label>
         </div>
         {/* Active Status */}
         <div className="form-control">
           <label className="label cursor-pointer justify-start gap-4">
             <input type="checkbox" name="isActive" className="checkbox checkbox-primary" defaultChecked disabled={isSubmitting} />
             <span className="label-text">Set as Active User</span>
           </label>
         </div>
         {/* Address */}
         <div className="form-control">
           <label className="label"><span className="label-text">Address (Optional)</span></label>
           <textarea name="address" className="textarea textarea-bordered h-16" placeholder="Address" disabled={isSubmitting}></textarea>
         </div>
         {/* City, Country, Postal Code */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="form-control">
             <label className="label"><span className="label-text">City</span></label>
             <input type="text" name="city" className="input input-bordered" placeholder="City" disabled={isSubmitting} />
           </div>
           <div className="form-control">
             <label className="label"><span className="label-text">Country</span></label>
             <input type="text" name="country" className="input input-bordered" placeholder="Country" disabled={isSubmitting} />
           </div>
           <div className="form-control">
             <label className="label"><span className="label-text">Postal Code</span></label>
             <input type="text" name="postalCode" className="input input-bordered" placeholder="Postal Code" disabled={isSubmitting} />
           </div>
         </div>

         {/* Submit Button inside the form */}
         <div className="flex justify-end pt-4">
             {/* Removed Reset button for simplicity in modal */}
             {/* <button type="reset" className="btn btn-ghost" disabled={isSubmitting} onClick={() => setFormError(null)}>Reset</button> */}
             <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                 {isSubmitting && (<span className="loading loading-spinner loading-xs"></span>)}
                 Create User
             </button>
         </div>
      </form>
    </>
  );
}