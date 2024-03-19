import LoginForm from "@/componenets/forms/login-form";

export default function Home() {
  return (
    <main className="lg:w-screen form">
      <div className="card Card">
        <h1 className="card-title form-heading">Login</h1>

        <LoginForm />
      </div>
    </main>
  );
}
