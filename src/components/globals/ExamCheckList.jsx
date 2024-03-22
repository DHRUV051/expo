import React, { useState } from "react";
import Checkbox from "./CheckBox";

const ExamCheckboxList = () => {
  const [isExamAttended, setIsExamAttended] = useState(false);
  const [selectedExams, setSelectedExams] = useState([]);

  const exams = ["IELTS", "GRE", "TOFEL", "DUOLingo"];

  const handleExamAttendanceChange = (e) => {
    setIsExamAttended(e.target.checked);
    if (!e.target.checked) {
      // Reset selected exams if exam attendance is unchecked
      setSelectedExams([]);
    }
  };

  const handleCheckboxChange = (exam, isChecked) => {
    if (isChecked) {
      setSelectedExams([...selectedExams, exam]);
    } else {
      setSelectedExams(selectedExams.filter((selectedExam) => selectedExam !== exam));
    }
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={handleExamAttendanceChange}
            checked={isExamAttended}
          />
          Is Exam Attended?
        </label>
      </div>
      {isExamAttended && (
        <div>
          {exams.map((exam) => (
            <Checkbox
              key={exam}
              id={exam}
              label={exam}
              checked={selectedExams.includes(exam)}
              onChange={(e) => handleCheckboxChange(exam, e.target.checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamCheckboxList;
