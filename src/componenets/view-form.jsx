import React from "react";
import "./ViewForm.css"
import "@styles-page/view-employee.module.css"

const ViewForm = ({ rowData }) => {
  const { name, email, role } = rowData;

  return (
    <div className="info">
      <div>
        <fieldset className="field">
          <legend className="leagend-name">Personal Information</legend>
          <p className="info-item">
            <span className="field-name">Name:</span>
            <span className="field-value">{name}</span>
          </p>

          <p className="info-item">
            <span className="field-name">Email:</span>{" "}
            <span className="field-value">{email}</span>
          </p>

          <p className="info-item">
            <span className="field-name">Role:</span>{" "}
            <span className="field-value">{role}</span>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default ViewForm;
