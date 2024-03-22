"use client";
import {  useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import TextInput from "../globals/TextInput";
import Button from "../globals/Button";
import axios from "axios";
import { useState } from "react";


const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        data
      );
      setLoading(false);
      console.log(response.data.data);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);

      if (localStorage.getItem("role") === "Admin") {
        router.push("/dashboard");
      } else if (localStorage.getItem("role") === "Front-Desk") {
        router.push("/dashboard/student");
      } else if (localStorage.getItem("role") === "Representative") {
        router.push("/dashboard/student");
      }
      
    } catch (error) {
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

      <Button disable={loading} type={"submit"}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
