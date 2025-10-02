import ComponentErrorBoundary from "@/components/error-boundary";
import ChangePasswordForm from "@/components/forms/change-password-form";

const ChangePassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-[#232326] px-4">
      <ComponentErrorBoundary>
        <div className="w-full  p-8 rounded-2xl shadow-2xl bg-background border border-gray-200 dark:bg-[#232326] dark:border-gray-700 mx-auto">
          <h2 className="text-3xl font-bold text-primary mb-6 dark:text-white text-center">
            Change Password
          </h2>
          <ChangePasswordForm />
        </div>
      </ComponentErrorBoundary>
    </div>
  );
};

export default ChangePassword;
