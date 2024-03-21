"use client";
import StudentCreateform from "@/componenets/forms/Student/Student-Create-form";
import { useEffect, useState } from "react";
import Loading from "@/componenets/globals/loading-page";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <main className="lg:w-screen form-Student">
        <div className="Card-Student">
          <h1 className="form-heading">Student Registration</h1>

          <StudentCreateform suppressHydrationWarning />
        </div>
      </main>
    </>
  );
}
