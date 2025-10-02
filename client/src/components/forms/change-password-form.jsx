"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CommonButton from "@/components/common/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import ComponentErrorBoundary from "../error-boundary";

const fields = [
  {
    name: "currentPassword",
    type: "password",
    label: "Current Password",
    placeholder: "Enter your current password",
  },
  {
    name: "newPassword",
    type: "password",
    label: "New Password",
    placeholder: "Enter your new password",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm New Password",
    placeholder: "Confirm your new password",
  },
];

const changePasswordSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "New password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your new password"),
});

const ChangePasswordForm = ({ onSubmit }) => {
  return (
    <ComponentErrorBoundary>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label
                htmlFor={field.name}
                className="text-base font-semibold text-foreground mb-1"
              >
                {field.label}
              </label>
              <Field name={field.name} id={field.name}>
                {({ field: formikField }) => (
                  <Input
                    {...formikField}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full text-base px-4 py-2 border border-input rounded-lg bg-input/80 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary transition-all duration-200 shadow-sm"
                    autoComplete={field.name}
                  />
                )}
              </Field>
              <ErrorMessage name={field.name}>
                {(msg) => (
                  <div className="text-destructive text-xs font-medium">
                    {msg}
                  </div>
                )}
              </ErrorMessage>
            </div>
          ))}
          <CommonButton
            type="submit"
            className="w-full cursor-pointer mt-6 h-11 text-base font-semibold rounded-lg shadow bg-primary hover:bg-primary/90 transition-colors duration-200"
          >
            Change Password
          </CommonButton>
        </Form>
      </Formik>
    </ComponentErrorBoundary>
  );
};

export default ChangePasswordForm;
