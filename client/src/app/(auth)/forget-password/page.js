"use client";
import ForgetPasswordForm from "@/components/forms/forget-password-form";

const ForgetPassword = () => {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-background border border-gray-200 dark:bg-[#232326] dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2 dark:text-white">
          Forgot Password
        </h2>
      </div>
      <ForgetPasswordForm
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      />
    </div>
  );
};

export default ForgetPassword;
