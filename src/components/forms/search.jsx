"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import "./search.css";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NGROK_API}/student/${data.search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="Search">
          <h1 className="text-3xl title">Search Student</h1>
          <div className="Search-Container">
            <Input
              label="Search Student"
              className="Search-Input"
              id="search"
              {...register("search", {
                required: "Search is required",
              })}
            />
            <Button
              size="sm"
              type="submit"
              className="Search-Button"
              variant="gradient"
              disabled={loading}
              
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </form>

      {data && (
        <div className="relative flex bg-white items-center justify-center max-w-[48rem] flex-row mt-[50px] p-6 w-full">
          <div className="info">
            <div className="">
              <fieldset className="border rounded-[5px] border-[rgb(20,23,24)] p-3">
                <legend className="font-bold">Personal Information</legend>
                <p className="info-item font-bold">
                  Name:{" "}
                  <span className="font-semibold">{data.name}</span>
                </p>

                <p className="info-item font-bold">
                  Email:{" "}
                  <span className="font-semibold">{ data.email}</span>
                </p>

                <p className="info-item font-bold">
                  Branch:{" "}
                  <span className="font-semibold">{data.branch}</span>
                </p>
              </fieldset>
            </div>

            <div className="exam">
              <fieldset className="border rounded-[5px] border-[rgb(20,23,24)] p-3">
                <legend className="font-bold">Exam Information</legend>
                <p className="info-item font-bold">
                  Is Exam Attended:
                  <span className="font-semibold">
                    {data.is_exam_attended ? "Yes" : "No"}
                  </span>
                </p>

                {data.is_exam_attended && (
                  <div className="exam-info">
                    <h3 className="font-bold">Exams:</h3>
                    <ul className="sub-list">
                      {data.student_exams.map((exam, index) => (
                        <li key={exam.u_id} className="font-bold list">
                          {exam.exam.name}: {exam.result}
                          {index !== data.student_exams.length - 1 &&
                            ","}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="countries-list">
                  <h3 className="font-bold">Countries:</h3>
                  <ul className="sub-list">
                    {data.student_countries.map((country, index) => (
                      <li
                        key={country.country.country_u_id}
                        className="font-bold list"
                      >
                        {country.country.name}
                        {index !== data.student_countries.length - 1 &&
                          ","}
                      </li>
                    ))}
                  </ul>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SearchForm;
