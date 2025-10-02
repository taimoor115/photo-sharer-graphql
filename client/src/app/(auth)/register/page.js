"use client";
import RegisterForm from "@/components/forms/register-form";

const SignUp = () => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-[#f8fafc] text-primary-foreground transition-colors duration-300 dark:bg-[#18181b] dark:text-white">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to PhotoSharer</h1>
          <p className="text-lg">Share your moments with the world!</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white text-foreground transition-colors duration-300 dark:bg-[#232326] dark:text-white">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-background border border-gray-200 dark:bg-[#232326] dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2 dark:text-white">
              Sign Up
            </h2>
          </div>
          <RegisterForm
            onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
