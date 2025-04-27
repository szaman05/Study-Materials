// app/signup/page.js (Server Component to render the Client Component form)
import SignupForm from "@/components/SignupForm";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  // Optional: Redirect logged-in users away from signup page
  const user = await getCurrentUser();
  if (user) {
    redirect("/profile"); // Or wherever logged-in users should go
  }

  return (
    <div>
      {/* SignupForm is a Client Component, handles its own state */}
      <SignupForm />
    </div>
  );
}
