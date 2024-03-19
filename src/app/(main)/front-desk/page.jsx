"use client";
import { useState, useEffect } from "react";
import StudentCreateform from "@/componenets/forms/Student/Student-Create-form";
import LoadingPage from "@/componenets/globals/loading-page";

export default function StudentForm() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="w-full h-full flex flex-col items-center justify-center p-[10px] md:p-[50px]">
      {loading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="card w-full p-[10px] lg:w-[60%] h-full md:p-[30px] shadow-md">
          <h1 className="card-title text-center">Student Registration</h1>
          <StudentCreateform />
        </div>
      )}
    </main>
  );
}
