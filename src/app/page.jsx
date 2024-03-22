"use client";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const router = useRouter();

  if (
    localStorage.getItem("token") &&
    localStorage.getItem("role") === "Admin"
  ) {
    router.push("/dashboard");
  } else if (
    localStorage.getItem("token") &&
    localStorage.getItem("role") === "Representative"
  ) {
    router.push("/dashboard/student");
  } else if (
    localStorage.getItem("token") &&
    localStorage.getItem("role") === "Front-Desk"
  ) {
    router.push("/dashboard/student");
  }
};

export default page;
