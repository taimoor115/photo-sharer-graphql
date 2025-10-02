import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";

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
  { name: "name", type: "text", label: "Name", placeholder: "Enter your name" },
];

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Min 6 chars").required("Required"),
  name: Yup.string().required("Required"),
});

const RegisterForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ email: "", password: "", name: "" }}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    <Form className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium" htmlFor={field.name}>
            {field.label}
          </label>
          <Field
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-ring bg-input text-foreground"
            type={field.type}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
          />
          <ErrorMessage
            name={field.name}
            component="div"
            className="text-destructive text-sm mt-1"
          />
        </div>
      ))}
      <Button type="submit" className="w-full mt-4">
        Create Account
      </Button>
    </Form>
  </Formik>
);

export default RegisterForm;
