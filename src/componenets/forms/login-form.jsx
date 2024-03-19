"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MdError } from "react-icons/md";
import TextInput from "../globals/TextInput";
import SelectInput from "../globals/SelectInput";
import Button from "../globals/Button";

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
    console.log(data);
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
        label="Password"
        id="password"
        placeholder="Enter Password"
        register={register}
        required
        error={errors.password}
        errorMessage="Password is required"
      />

      <SelectInput
        label="Role"
        id="role"
        options={[
          
          { value: "Admin", label: "Admin" },
          { value: "Front Desk", label: "Front Desk" },
          { value: "Representative", label: "Representative" },
        ]}
        register={register}
        required
        error={errors.role}
        errorMessage="Role is required"
      />

      <Button type={"submit"}>Login</Button>
    </form>
  );
};

export default LoginForm;
