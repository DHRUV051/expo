import React from "react";
import "./ViewForm.css"

const ViewForm = ({ rowData }) => {
  const { name, email, role } = rowData;

  return (
    <div className="info">
      <div>
        <fieldset className="border rounded-[5px] border-black p-3">
          <legend className="font-bold">Personal Information</legend>
          <p className="info-item">
            <span className="font-bold">Name:</span>{" "}
            <span className="font-semibold">{name}</span>
          </p>

          <p className="info-item">
            <span className="font-bold">Email:</span>{" "}
            <span className="font-semibold">{email}</span>
          </p>

          <p className="info-item">
            <span className="font-bold">Role:</span>{" "}
            <span className="font-semibold">{role}</span>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default ViewForm;
