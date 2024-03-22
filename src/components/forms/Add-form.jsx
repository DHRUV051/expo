"use client";
import { useForm } from "react-hook-form";
import TextInput from "../globals/TextInput";
import Button from "../globals/Button";
import axios from "axios";

const AddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NGROK_API}/admin`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response);
      if (response.data.statusCode === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <TextInput
        label="Name"
        id="name"
        placeholder="Enter Name"
        register={register}
        required
        error={errors.name}
        errorMessage="Name is required"
      />

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

      <div className="form-field">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          id="role"
          {...register("role", { required: true })}
          className={`form-input ${
            errors.role ? "input-error custom-select" : ""
          }`}
        >
          <option value="Admin">Admin</option>
          <option value="Front Desk">Front Desk</option>
          <option value="Representative">Representative</option>
        </select>
      </div>

      <Button type={"submit"}>Login</Button>
    </form>
  );
};

export default AddForm;
