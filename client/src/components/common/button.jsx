"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const CommonButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CommonButton;
