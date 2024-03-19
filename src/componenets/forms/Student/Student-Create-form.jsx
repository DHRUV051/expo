"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "@/componenets/globals/TextInput";
import Button from "@/componenets/globals/Button";
import SelectInput from "@/componenets/globals/SelectInput";

const countries = [
  { id: 1, name: "USA" },
  { id: 2, name: "Canada" },
  { id: 3, name: "Australia" },
  { id: 4, name: "UK" },
  { id: 5, name: "Europe" },
];

const exams = [
  { name: "IELTS", label: "IELTS" },
  { name: "TOFEL", label: "TOFEL" },
  { name: "GRE", label: "GRE" },
  { name: "DUOLINGO", label: "DUOLINGO" },
];

const StudentCreateform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedCountries, setSelectedCountries] = useState([
    { USA: false },
    { Canada: false },
    { Australia: false },
    { UK: false },
    { Europe: false },
  ]);

  const [isExamAttended, setIsExamAttended] = useState(false);

  const [selectedExams, setSelectedExams] = useState([]);

  const handleCheckboxChange = (e, index, name) => {
    let data = [...selectedCountries];
    data[index][name] = e.target.checked;
    setSelectedCountries(data);
  };

  const handleExamCheckboxChange = (examName, isChecked) => {
    setSelectedExams((prevSelectedExams) =>
      isChecked
        ? [...prevSelectedExams, examName]
        : prevSelectedExams.filter((name) => name !== examName)
    );
  };

  const handleExamAttendanceChange = (e) => {
    setIsExamAttended(e.target.checked);
  };

  const onSubmit = (data) => {
    data.selectedCountries = selectedCountries;

    console.log("data", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-[32px] ">
      <div className="">
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
          id="email"
          label="Email Address"
          placeholder="Enter Email"
          register={register}
          required
          error={errors.email}
          errorMessage="Email is required"
        />
      </div>

      <TextInput
        id="address"
        label="Address"
        placeholder="Enter Address"
        register={register}
        required
        error={errors.address}
        errorMessage="Address is required"
      />

      <TextInput
        id="phonenumber"
        label="Phone Number"
        placeholder="Enter Phone Number"
        register={register}
        required
        error={errors.phonenumber}
        errorMessage="Phone is required"
      />

      <SelectInput
        label="Branch"
        id="branch"
        options={[
          { value: "Anand", label: "Anand" },
          { value: "Baroda", label: "Baroda" },
          { value: "Nadiad", label: "Nadiad" },
          { value: "Surat", label: "Surat" },

        ]}
        register={register}
        required
        error={errors.role}
        errorMessage="Role is required"
      />

      <div className="form-field">
        <label className="form-label">Country Selection</label>
        <div className="form-sub-field">
          {countries.map((country, index) => (
            <div key={country.id} className="flex items-center mt-[10px]">
              <input
                type="checkbox"
                id={country.name}
                value={country.name}
                onChange={(e) => handleCheckboxChange(e, index, country.name)}
                {...register}
                className="checkbox-icon"
              />
              <label htmlFor={country.name} className="checkbox-label">
                {country.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-field flex">
        <label className="form-label checkbox-label-student mt-[4px]">
          Is Exam Attended?
        </label>
        <input
          type="checkbox"
          id="examAttended"
          className="checkbox-icon"
          onChange={handleExamAttendanceChange}
        />
      </div>

      {isExamAttended && (
        <div className="form-field">
          <label className="form-label">Select Exams</label>
          <div className="form-sub-field">
            {exams.map(({ name, label }) => (
              <div key={name} className="flex">
                <input
                  type="checkbox"
                  id={name}
                  className="checkbox-icon"
                  onChange={(e) =>
                    handleExamCheckboxChange(name, e.target.checked)
                  }
                />
                <label htmlFor={name} className="checkbox-label">
                  {label}
                </label>
              </div>
            ))}
          </div>
          {exams.map(({ name, label }) => (
            <div key={name} className="form-field mt-4">
              {selectedExams.includes(name) && (
                <TextInput
                  id={`${name}Score`}
                  label={`Overall Score for ${label}`}
                  placeholder="Enter Overall Score"
                  register={register}
                  required
                  error={errors[`${name}Score`]}
                  errorMessage={`Overall Score for ${label} is required`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <Button type={"submit"}>Submit</Button>
    </form>
  );
};

export default StudentCreateform;
