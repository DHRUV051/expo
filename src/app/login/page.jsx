"use client"
import LoginForm from "@/componenets/forms/login-form";

export default function Home() {
  return (
    <main className="lg:w-screen form">
      <div className="Card">
        <h1 className="form-heading">Login</h1>

        <LoginForm />
      </div>
    </main>
  );
}
