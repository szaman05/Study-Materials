// app/login/page.js (Server Component to render the Client Component form)
import LoginForm from "@/components/LoginForm";
import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Optional: Redirect logged-in users away from login page
  const user = await getCurrentUser();
  if (user) {
    redirect("/profile"); // Or wherever logged-in users should go
  }

  return (
    <div>
      {/* LoginForm is a Client Component */}
      <LoginForm />
    </div>
  );
}
