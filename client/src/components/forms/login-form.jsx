import CommonButton from "@/components/common/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import ComponentErrorBoundary from "../error-boundary";

const fields = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
];

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = ({ onSubmit }) => {
  return (
    <ComponentErrorBoundary>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
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
            Login
          </CommonButton>
          <div className="flex flex-col gap-2 mt-2">
            <span className="text-sm text-muted-foreground">
              Don't have an account?
            </span>
            <Link href="/register">
              <CommonButton variant="outline" className="w-full cursor-pointer">
                Go to Register
              </CommonButton>
            </Link>
          </div>
        </Form>
      </Formik>
    </ComponentErrorBoundary>
  );
};

export default LoginForm;
