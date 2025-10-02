import CommonButton from "@/components/common/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "OTP must be 6 digits")
    .required("OTP is required"),
});

const VerifyOtpForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ otp: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl bg-background border border-gray-200 dark:bg-[#232326] dark:border-gray-700 space-y-6 mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary mb-2 dark:text-white">
              Verify OTP
            </h2>
            <p className="text-muted-foreground text-sm">
              Enter the 6-digit code sent to your email.
            </p>
          </div>
          <div>
            <label className="block text-base font-semibold mb-2">
              One-Time Password
            </label>
            <InputOTP
              maxLength={6}
              value={values.otp}
              onChange={(val) => setFieldValue("otp", val)}
            >
              <InputOTPGroup>
                <InputOTPSlot
                  index={0}
                  className="w-12 h-12  text-2xl font-bold rounded-lg border border-input bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                />
                <InputOTPSlot
                  index={1}
                  className="w-12 h-12 text-2xl font-bold rounded-lg border border-input bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                />
                <InputOTPSlot
                  index={2}
                  className="w-12 h-12 text-2xl font-bold rounded-lg border border-input bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                />
                <InputOTPSlot
                  index={3}
                  className="w-12 h-12 text-2xl font-bold rounded-lg border border-input bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                />
                <InputOTPSlot
                  index={4}
                  className="w-12 h-12 text-2xl font-bold rounded-lg border border-input bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                />
                <InputOTPSlot
                  index={5}
                  className="w-12 h-12 text-2xl font-bold rounded-lg border border-input bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                />
              </InputOTPGroup>
            </InputOTP>
            <ErrorMessage name="otp">
              {(msg) => (
                <div className="text-destructive text-xs font-medium mt-2">
                  {msg}
                </div>
              )}
            </ErrorMessage>
            <div className="text-muted-foreground text-sm mt-2">
              Please enter the one-time password sent to your email.
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <CommonButton
              type="submit"
              className="w-full h-11 text-base font-semibold rounded-lg shadow bg-primary hover:bg-primary/90 transition-colors duration-200 px-4"
              disabled={values.otp.length !== 6}
            >
              Verify
            </CommonButton>
            <button
              type="button"
              className="w-full h-11 text-base font-semibold rounded-lg shadow bg-muted text-primary hover:bg-muted/80 transition-colors duration-200 px-4"
              onClick={() => {
                // Add resend OTP logic here
              }}
            >
              Resend OTP
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default VerifyOtpForm;
