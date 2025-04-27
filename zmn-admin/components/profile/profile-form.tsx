"use client";

import {
  useState,
  useActionState,
  useEffect,
  useRef,
  useTransition,
} from "react"; // Import useTransition
import {
  User,
  Phone,
  MapPin,
  Globe,
  Hash,
  Building,
  UploadCloud,
  X,
  CheckCircle,
  AlertCircle,
  Pencil,
  Save,
} from "lucide-react";
import { updateProfile } from "@/lib/actions/appwrite/profile";
import type { UserProfile, ProfileResponse } from "@/types/profiles";

interface ProfileFormProps {
  initialProfile: UserProfile;
}

// Helper component to display a field in view mode (keep as is)
function DisplayField({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-base-content/70">{label}</label>
      <p className="text-sm font-medium break-words">
        {value || <span className="italic opacity-60">Not set</span>}
      </p>
    </div>
  );
}

export function ProfileForm({ initialProfile }: ProfileFormProps) {
  // Use useTransition along with useActionState
  const [isOptimisticPending, startTransition] = useTransition();
  const [state, formAction, isPending] = useActionState<
    ProfileResponse | undefined,
    UserProfile
  >(updateProfile, undefined);

  const [formData, setFormData] = useState<UserProfile>(initialProfile);
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const isAnyEditing = isEditingPersonal || isEditingAddress;

  // Reset form data and exit *all* edit modes on successful update
  useEffect(() => {
    if (state?.success && !isPending) {
      setIsEditingPersonal(false); // Exit personal edit mode
      setIsEditingAddress(false); // Exit address edit mode
      setShowSuccessToast(true);
      const timer = setTimeout(() => setShowSuccessToast(false), 3000);
      return () => clearTimeout(timer);
    }
    if (state?.error && !isPending) {
      // Keep editing modes on error
      setShowErrorToast(true);
      const timer = setTimeout(() => setShowErrorToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state, isPending]);

  // Update local state if the initial profile changes, only if not editing
  useEffect(() => {
    if (!isAnyEditing) {
      setFormData(initialProfile);
    }
  }, [initialProfile, isAnyEditing]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cancel resets both sections
  const handleCancel = () => {
    setFormData(initialProfile); // Reset changes
    setIsEditingPersonal(false); // Exit personal edit mode
    setIsEditingAddress(false); // Exit address edit mode
  };

  // Submit saves the entire form data within a transition
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataToSubmit = {
      ...formData,
      email: initialProfile.email,
      role: initialProfile.role,
      roleDisplayName: initialProfile.roleDisplayName,
    };
    // Wrap the action call in startTransition
    startTransition(() => {
      formAction(dataToSubmit);
    });
  };

  // Combine pending states for disabling buttons
  const combinedIsPending = isPending || isOptimisticPending;

  return (
    <>
      {/* Toast Notifications */}
      {showSuccessToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <CheckCircle size={20} />
            <span>{state?.message || "Profile updated successfully!"}</span>
          </div>
        </div>
      )}
      {showErrorToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{state?.error || "Failed to update profile."}</span>
            {state?.details && (
              <span className="text-xs opacity-80">({state.details})</span>
            )}
          </div>
        </div>
      )}

      {/* Form wraps both cards and the action buttons */}
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {" "}
        {/* Add space between cards */}
        {/* Personal Details Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              {" "}
              {/* Add margin bottom */}
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User size={20} /> Personal Details
              </h2>
              {!isEditingPersonal &&
                !isEditingAddress && ( // Show edit only if NO section is being edited
                  <button
                    type="button"
                    onClick={() => setIsEditingPersonal(true)}
                    className="btn btn-ghost btn-sm text-primary gap-1"
                    disabled={combinedIsPending} // Disable if submitting
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                )}
            </div>
            {!isEditingPersonal && ( // Show description only in view mode
              <p className="text-sm text-base-content/70 -mt-4 mb-4">
                {" "}
                {/* Adjust margins */}
                Your personal information details.
              </p>
            )}

            {/* Conditional Rendering: View or Edit Personal Details */}
            {isEditingPersonal ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name Input */}
                <label className="form-control w-full sm:col-span-2">
                  <div className="label pt-0">
                    <span className="label-text">Full Name</span>
                  </div>
                  <label className="input input-bordered input-sm flex items-center gap-2">
                    <User size={16} opacity={0.5} />
                    <input
                      type="text"
                      name="fullName"
                      className="grow bg-transparent"
                      placeholder="Your full name"
                      value={formData.fullName || ""}
                      onChange={handleInputChange}
                      required
                      disabled={combinedIsPending} // Disable input during submission
                    />
                  </label>
                </label>
                {/* Phone Input */}
                <label className="form-control w-full sm:col-span-2">
                  <div className="label pt-0">
                    <span className="label-text">Phone</span>
                  </div>
                  <label className="input input-bordered input-sm flex items-center gap-2">
                    <Phone size={16} opacity={0.5} />
                    <input
                      type="tel"
                      name="phone"
                      className="grow bg-transparent"
                      placeholder="Your phone number"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      disabled={combinedIsPending} // Disable input during submission
                    />
                  </label>
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <DisplayField label="Full Name" value={formData.fullName} />
                <DisplayField label="Phone" value={formData.phone} />
              </div>
            )}
          </div>
        </div>
        {/* Address Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <div className="flex justify-between items-center mb-4">
              {" "}
              {/* Add margin bottom */}
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={20} /> Address
              </h2>
              {!isEditingPersonal &&
                !isEditingAddress && ( // Show edit only if NO section is being edited
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(true)}
                    className="btn btn-ghost btn-sm text-primary gap-1"
                    disabled={combinedIsPending} // Disable if submitting
                  >
                    <Pencil size={14} />
                    Edit
                  </button>
                )}
            </div>
            {!isEditingAddress && ( // Show description only in view mode
              <p className="text-sm text-base-content/70 -mt-4 mb-4">
                {" "}
                {/* Adjust margins */}
                Your contact address.
              </p>
            )}

            {/* Conditional Rendering: View or Edit Address */}
            {isEditingAddress ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Address Input */}
                <label className="form-control w-full sm:col-span-2">
                  <div className="label pt-0">
                    <span className="label-text">Address</span>
                  </div>
                  <textarea
                    name="address"
                    className="textarea textarea-bordered textarea-sm h-20"
                    placeholder="Street address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    disabled={combinedIsPending} // Disable input during submission
                  ></textarea>
                </label>
                {/* City Input */}
                <label className="form-control w-full">
                  <div className="label pt-0">
                    <span className="label-text">City</span>
                  </div>
                  <label className="input input-bordered input-sm flex items-center gap-2">
                    <Building size={16} opacity={0.5} />
                    <input
                      type="text"
                      name="city"
                      className="grow bg-transparent"
                      placeholder="City"
                      value={formData.city || ""}
                      onChange={handleInputChange}
                      disabled={combinedIsPending} // Disable input during submission
                    />
                  </label>
                </label>
                {/* Postal Code Input */}
                <label className="form-control w-full">
                  <div className="label pt-0">
                    <span className="label-text">Postal Code</span>
                  </div>
                  <label className="input input-bordered input-sm flex items-center gap-2">
                    <Hash size={16} opacity={0.5} />
                    <input
                      type="text"
                      name="postalCode"
                      className="grow bg-transparent"
                      placeholder="Postal Code"
                      value={formData.postalCode || ""}
                      onChange={handleInputChange}
                      disabled={combinedIsPending} // Disable input during submission
                    />
                  </label>
                </label>
                {/* Country Input */}
                <label className="form-control w-full sm:col-span-2">
                  <div className="label pt-0">
                    <span className="label-text">Country</span>
                  </div>
                  <label className="input input-bordered input-sm flex items-center gap-2">
                    <Globe size={16} opacity={0.5} />
                    <input
                      type="text"
                      name="country"
                      className="grow bg-transparent"
                      placeholder="Country"
                      value={formData.country || ""}
                      onChange={handleInputChange}
                      disabled={combinedIsPending} // Disable input during submission
                    />
                  </label>
                </label>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <DisplayField label="Address" value={formData.address} />
                <DisplayField label="City" value={formData.city} />
                <DisplayField label="Postal Code" value={formData.postalCode} />
                <DisplayField label="Country" value={formData.country} />
              </div>
            )}
          </div>
        </div>
        {/* Action Buttons - Show only if any section is being edited */}
        {isAnyEditing && (
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-ghost btn-sm"
              disabled={combinedIsPending} // Use combined pending state
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={combinedIsPending} // Use combined pending state
            >
              {combinedIsPending ? ( // Use combined pending state
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <Save size={16} />
              )}
              {combinedIsPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </>
  );
}
