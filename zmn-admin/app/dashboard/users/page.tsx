import { PageTitle } from "@/components/ui/page-title";
import { UserCreateForm } from "@/components/users/user-create-form";

export default function UsersPage() {
  return (
    <>
      <PageTitle title="User Management" />
      <div className="grid gap-6">
        <UserCreateForm />
      </div>
    </>
  );
}
