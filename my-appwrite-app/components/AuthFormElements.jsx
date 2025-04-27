    // components/AuthFormElements.jsx
    'use client'; // Needed for useFormStatus

    import { useFormStatus } from 'react-dom';

    // Reusable Submit Button that shows loading state
    export function SubmitButton({ text = 'Submit', loadingText = 'Submitting...' }) {
      const { pending } = useFormStatus(); // Hook to check form submission status

      return (
        <button
          type="submit"
          disabled={pending} // Disable button while action is running
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? loadingText : text}
        </button>
      );
    }

    // Reusable Input Field
    export function InputField({ id, name, type = 'text', label, required = false, ...props }) {
       return (
         <div>
           <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
             {label} {required && <span className="text-red-500">*</span>}
           </label>
           <input
             type={type}
             id={id || name}
             name={name}
             required={required}
             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
             {...props} // Pass other props like placeholder, value, onChange etc.
           />
         </div>
       );
    }

    // Reusable Error Message Display
    export function ErrorDisplay({ state }) {
        if (!state || state.success || !state.error) return null;

        return (
             <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" role="alert">
                <p className="font-bold">Error:</p>
                <p>{state.error}</p>
                {state.details && <p className="text-sm mt-1">Details: {state.details}</p>}
            </div>
        );
    }
    