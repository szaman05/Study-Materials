import { AuthLayout } from "@/components/auth/layout";
import { ForgotPasswordForm } from "@/components/auth/forget-password/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your email to receive a password reset link"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
