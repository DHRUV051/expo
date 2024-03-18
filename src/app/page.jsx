import LoginForm from "@/componenets/forms/login-form";

export default function Home() {
  return (
    <main className="lg:w-screen lg:h-screen w-full h-full  flex flex-col items-center justify-center p-3">
      <div className="card w-full md:w-1/2 h-full p-[30px] shadow-md">
        <h1 className="card-title text-center">Login</h1>

        <LoginForm />
      </div>
    </main>
  );
}
