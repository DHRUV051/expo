"use client";
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

  const onSubmit = async (data) => {
    // const Response = await axios.post("http://localhost:3000/api/user",data);
    if (data.role === "Admin") {
      router.push("/admin");
    } else if (data.role === "Front Desk") {
      router.push("/front-desk");
    } else if (data.role === "Representative") {
      router.push("/representative");
    }
  };
 
  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="form-container"
  >
    <div className="form-field">
      <label
        htmlFor="name"
        className="login-label"
      >
        Name
      </label>
      <input
        type="text"
        className={` login-input ${errors.name ? "input-error" : ""}`}
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
        <span className="error-message">
          {errors.name.message}
        </span>
      )}
      {errors.name && (
        <MdError className="error-icon" />
      )}
    </div>

    <div className="form-field">
      <label
        htmlFor="email"
        className="login-label"
      >
        Email address
      </label>
      <input
        type="email"
        className={`login-input  ${
          errors.email ? "input-error" : ""
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
        <span className="error-message">
          {errors.email.message}
        </span>
      )}
      {errors.email && (
        <MdError className="error-icon" />
      )}
    </div>

    <div className="form-field">
      <label
        htmlFor="password"
        className="login-label"
      >
        Password
      </label>
      <input
        type="password"
        className={`login-input ${
          errors.password ? "input-error" : ""
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
        <span className="error-message">
          {errors.password.message}
        </span>
      )}
      {errors.password && (
        <MdError className="error-icon" />
      )}
    </div>

    <div className="form-field">
      <label
        htmlFor="role"
        className="login-label"
      >
        Role
      </label>
      <select
        id="role"
        className={`login-input ${
          errors.role ? "input-error custom-select" : ""
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
        <span className="error-message">
          {errors.role.message}
        </span>
      )}
      {errors.role && (
        <MdError className="error-icon" />
      )}
    </div>

    <button
      type="submit"
      className="custom-button"
    >
      Log In
    </button>
  </form>
  );
};

export default LoginForm;