"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const Page = () => {
  const router = useRouter();
  const routerRef = useRef(router); // Use a ref for router

  useEffect(() => {
    const redirectToDashboard = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token) {
        switch (role) {
          case "Admin":
            routerRef.current.push("/dashboard");
            break;
          case "Representative":
          case "Front-Desk":
            routerRef.current.push("/dashboard/student");
            break;
          default:
            break;
        }
      }
    };

    redirectToDashboard();
  }, []); // No dependency array since we're using a ref

  return null;
};

export default Page;
