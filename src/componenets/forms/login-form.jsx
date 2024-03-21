"use client";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../globals/TextInput";
import Button from "../globals/Button";
import axios from "axios";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();


  const onSubmit = async (data) => {
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_NGROK_API}/login`, data);
      console.log( response.data.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      
  if(localStorage.getItem("role")) {
    router.push("/admin");
  }else if( localStorage.getItem("role")) {
    router.push("/front-desk");
  }else if(localStorage.getItem("role")) {
    router.push("/representative");
  }
    }
    catch(error){
      console.error(error);
    }
   
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
    
      <TextInput
        label="Email address"
        id="email"
        placeholder="Enter Email"
        register={register}
        required
        error={errors.email}
        errorMessage="Email is required"
      />

      <TextInput
        type="password"
        label="Password"
        id="password"
        placeholder="Enter Password"
        register={register}
        required
        error={errors.password}
        errorMessage="Password is required"
      />

      
      <Button type={"submit"}>Login</Button>
    </form>
  );
};

export default LoginForm;
