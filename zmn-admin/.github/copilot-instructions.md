# ZMN-ADMIN Next.js Workspace - Copilot Instructions

**Objective:** Guide AI code generation for the ZMN-ADMIN Next.js project. Prioritize adherence to the conventions and patterns outlined below.

## 1. Core Technologies & Features

- **Framework:** Next.js 14+ (App Router)
- **UI Library:** DaisyUI 5 with Tailwind CSS 4
- **Icons:** Lucide React
- **Theming:** `next-themes` (Dark/Light mode)
- **Backend:** Appwrite (Authentication, Database, Storage)
- **State Management:** React Hooks (local), React Context (shared), Server Actions (mutations)
- **Focus:** Server-Side Rendering (SSR), using `"use client"` only for interactive components.

## 2. Project Structure

- `/app`: Next.js App Router (Pages, Layouts)
- `/components`: Reusable React Components
  - `/ui`: General UI elements (Button, Card, Input)
  - `/layout`: Page structure (Header, Sidebar)
  - `/providers`: Context providers (Theme, Auth)
  - `/common`: Shared utility components
- `/lib`: Shared logic & utilities
  - `/actions`: Server Actions (especially `/appwrite` for backend interactions)
- `/types`: TypeScript definitions
- `/public`: Static assets
- `/context`: React Context definitions

## 3. Code Conventions

- **Components:**
  - Use **functional components** with TypeScript interfaces for props.
  - Use **named exports**.
  - File naming: **kebab-case** (e.g., `user-profile.tsx`).
  - Group related components in folders with `index.ts` exports.
- **Styling:**
  - Use **DaisyUI 5 component classes** and **Tailwind CSS utility classes**
  - Prefer **semantic DaisyUI color names** (e.g., `btn-primary`, `bg-base-100`) over hardcoded hex/rgb values.
  - Use Tailwind **responsive prefixes** (sm:, md:, lg:) for layouts.
- **State:**
  - Use React Hooks (`useState`, `useEffect`) for local component state.
  - Use React Context for global/shared state.
  - Use **Server Actions** for data fetching and mutations.
- **TypeScript:**
  - Use interfaces for all component props and data structures.
  - Leverage TypeScript for type safety.

## 4. Common Patterns & Snippets

### 4.1 Page Structure (`/app/.../page.tsx`)

```tsx
// Example: app/dashboard/example/page.tsx
import { PageTitle } from "@/components/ui/page-title";
// Import feature-specific components

export default function ExamplePage() {
  return (
    <>
      <PageTitle title="Example Page Title" />
      <div className="grid gap-6">{/* Page content components */}</div>
    </>
  );
}
```

### 4.2 Server Actions (`/lib/actions/**/*.ts`)

```tsx
// Example: lib/actions/example.ts
"use server";

import { createSessionClient } from "@/lib/actions/appwrite/appwrite-server"; // Adjust import as needed
import { revalidatePath } from "next/cache";

// Define return type interface
interface ActionResult {
  success: boolean;
  data?: any; // Replace 'any' with specific type
  error?: string;
}

export async function exampleAction(
  prevState: any,
  formData: FormData
): Promise<ActionResult> {
  try {
    const client = await createSessionClient(); // Or other Appwrite client setup
    // const data = Object.fromEntries(formData); // Process form data
    // ... Appwrite interaction logic ...
    revalidatePath("/dashboard/example"); // Example path revalidation
    return {
      success: true,
      data: {
        /* result */
      },
    };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}
```

### 4.3 Form with Server Action (`"use client"` component)

```tsx
"use client";

import { useActionState } from "react";
import { exampleAction } from "@/lib/actions/example"; // Import the server action

// Define initial state structure matching ActionResult
const initialState = { success: false, error: undefined, data: undefined };

export function ExampleForm() {
  // IMPORTANT: Use useActionState from 'react'
  const [state, formAction] = useActionState(exampleAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {/* Form Fields: Use DaisyUI components like input, select, textarea */}
      <label className="input input-bordered flex items-center gap-2">
        Name
        <input
          type="text"
          name="name"
          className="grow"
          placeholder="Your Name"
          required
        />
      </label>

      {/* Display Server Action State */}
      {state?.error && <p className="text-error">{state.error}</p>}
      {state?.success && <p className="text-success">Action successful!</p>}

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
```

### 4.4 Theme Toggle (`"use client"` component)

```tsx
"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
```

## 5. Technology-Specific Guidelines

### 5.1 DaisyUI 5 Usage

- **Prioritize Component Classes:** Use `btn`, `card`, `input`, `alert`, etc., whenever possible.
- **Color Modifiers:** Apply semantic colors consistently (e.g., `btn-primary`, `alert-error`).
- **Nesting:** Follow DaisyUI documentation for correct component structure (e.g., `card` > `card-body` > `card-title`).
- **Accessibility:** Use appropriate ARIA attributes (e.g., `role`, `aria-label`).
- **Customization:** Use Tailwind utilities for minor adjustments. Use `!` modifier (`bg-red-500!`) only as a last resort for specificity issues.
- **Refer to Docs:** For detailed component API and examples, consult the official [DaisyUI 5 documentation](https://daisyui.com/docs/v5/).

### 5.2 Appwrite Integration

- Use server actions in `/lib/actions/appwrite` for backend operations.
- Utilize `createAdminClient` and `createSessionClient` appropriately based on context.
- Handle authentication flows via Appwrite SDK methods within server actions or dedicated API routes if necessary.
- Store sensitive configuration (API keys, project ID) in `.env.local` (and do not commit).

## 6. Critical Reminders

- **`"use client"` Directive:** Apply **only** when necessary (React Hooks like `useState`, `useEffect`, `useContext`, `useActionState`, or event handlers).
- **Server Components:** Prefer for static UI, data fetching (where applicable without client interaction).
- **`useActionState`:** Import from `"react"`, **not** `react-dom`.
- **Next.js 15 Practices:** Follow evolving best practices for App Router, Server Components, and Actions.
- **Error Handling:** Implement robust error handling in Server Actions and display feedback to the user.
- **Revalidation:** Use `revalidatePath` or `revalidateTag` in Server Actions after mutations to update cached data.
