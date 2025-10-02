"use client";
import React from "react";
import RegisterForm from "@/components/forms/register-form";

const SignUp = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
        <div>
          <h1 className="text-4xl font-bold mb-4">Welcome to PhotoSharer</h1>
          <p className="text-lg">Share your moments with the world!</p>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-card text-card-foreground transition-colors duration-300">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg bg-background">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Sign Up</h2>
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
