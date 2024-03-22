import React from "react";
import "./StudentView.css"; // Import CSS file for styling

const StudentView = ({ studentData }) => {
  console.log('studentData', studentData);
  return (
    <div className="student-info">
      <div className="">
        <fieldset className="border rounded-[5px] border-[rgb(20,23,24)] p-3">
          <legend className="font-bold">Personal Information</legend>
          <p className="info-item font-bold">
            Name: <span className="font-semibold">{studentData.name}</span>
          </p>

          <p className="info-item font-bold">
            Email: <span className="font-semibold">{studentData.email}</span>
          </p>

          <p className="info-item font-bold">
            Branch: <span className="font-semibold">{studentData.branch}</span>
          </p>
        </fieldset>
      </div>

      <div className="exam">
        <fieldset className="border rounded-[5px] border-[rgb(20,23,24)] p-3">
          <legend className="font-bold">Exam Information</legend>
          <p className="info-item font-bold">
            Is Exam Attended:
            <span className="font-semibold">
              {studentData.is_exam_attended ? "Yes" : "No"}
            </span>
          </p>

          {studentData.is_exam_attended && (
            <div className="exam-info">
              <h3 className="font-bold">Exams:</h3>
              <ul className="sub-list">
                {studentData.student_exams.map((exam, index) => (
                  <li key={exam.u_id} className="font-bold list">
                    {exam.exam.name}: {exam.result}
                    {index !== studentData.student_exams.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="countries-list">
            <h3 className="font-bold">Countries:</h3>
            <ul className="sub-list">
              {studentData.student_countries.map((country, index) => (
                <li key={country.country.country_u_id} className="font-bold list">
                  {country.country.name}
                  {index !== studentData.student_countries.length - 1 && ","}
                </li>
              ))}
            </ul>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default StudentView;
