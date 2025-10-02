"use client";
import VerifyOtpForm from "@/components/forms/verify-otp-form";

const VerifyOtp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-0 bg-white text-foreground transition-colors duration-300 dark:bg-[#232326] dark:text-white">
      <VerifyOtpForm
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
        onResend={() => alert("OTP resent!")}
      />
    </div>
  );
};

export default VerifyOtp;
