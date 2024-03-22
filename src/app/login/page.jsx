"use client"

import LoginForm from "../../componenets/forms/login-form";
import Logo from "../../../public/sk_logo.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src={Logo} alt="logo" className="login-logo" width={100} height={100} />
    <main className="form">
      <div className="Card">
        <h1 className="form-heading">Login</h1>
        <LoginForm />
      </div>
    </main>
    </>
  );
}
