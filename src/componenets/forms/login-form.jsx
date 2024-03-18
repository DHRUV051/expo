"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-[15px] md:space-y-[32px]"
    >
      <div className="relative">
        <label
          htmlFor="name"
          className="text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2"
        >
          Name
        </label>
        <input
          type="text"
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors.name ? "border-red-500" : ""
          }`}
          id="name"
          placeholder="Enter Name"
          {...register("name", {
            required: "Name is required",
            maxLength: {
              value: 50,
              message: "Name cannot exceed 50 characters",
            },
          })}
        />
        {errors.name && (
          <span className="text-red-500 text-[12px] leading-[18px] mt-1">
            {errors.name.message}
          </span>
        )}
        {errors.name && (
          <MdError className="text-red-500 absolute right-2 top-[53%] transform -translate-y-1/2" />
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="email"
          className="text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2"
        >
          Email address
        </label>
        <input
          type="email"
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors.email ? "border-red-500" : ""
          }`}
          id="email"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-[12px] leading-[18px] mt-1">
            {errors.email.message}
          </span>
        )}
        {errors.email && (
          <MdError className="text-red-500 absolute right-2 top-[53%] transform -translate-y-1/2" />
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors.password ? "border-red-500" : ""
          }`}
          id="password"
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-[12px] leading-[18px] mt-1">
            {errors.password.message}
          </span>
        )}
        {errors.password && (
          <MdError className="text-red-500 absolute right-2 top-[53%] transform -translate-y-1/2" />
        )}
      </div>

      <div className="relative">
        <label
          htmlFor="role"
          className="text-[rgb(102,102,102)] text-[12px] leading-[18px] font-semibold mb-2"
        >
          Role
        </label>
        <select
          id="role"
          className={`w-full p-2 border-[2px] border-input rounded-[8px] placeholder:text-[16px] placeholder:leading-[20px] ${
            errors.role ? "border-red-500 custom-select" : ""
          }`}
          {...register("role", { required: "Role is required" })}
        >
          <option value="" disabled selected>
            Select Role
          </option>
          <option value="Admin">Admin</option>
          <option value="Front Desk">Front Desk</option>
          <option value="Representative">Representative</option>
        </select>
        {errors.role && (
          <span className="text-red-500 text-[12px] leading-[18px] mt-1">
            {errors.role.message}
          </span>
        )}
        {errors.role && (
          <MdError className="text-red-500 absolute right-2 top-[53%] transform -translate-y-1/2" />
        )}
      </div>

      <button
        type="submit"
        className="bg-[rgb(0,0,0)] text-white rounded-[8px] py-2 px-4 hover:bg-[rgb(30,30,30)] transition duration-300"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
