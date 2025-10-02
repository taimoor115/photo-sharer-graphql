"use client";
import LoginForm from "@/components/forms/login-form";

const Login = () => {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-background border border-gray-200 dark:bg-[#232326] dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2 dark:text-white">
          Login
        </h2>
      </div>
      <LoginForm
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      />
    </div>
  );
};

export default Login;
