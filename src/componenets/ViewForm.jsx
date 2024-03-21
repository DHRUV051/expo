import React from "react";

const ViewForm = ({ rowData }) => {
  const { name, email, role } = rowData;

  return (
    <>
      <div className="form-container">
        <div className="form-field">
          <label className="form-label">Name:</label>
          <p>{name}</p>
        </div>
        <div className="form-field">
          <label className="form-label">Email:</label>
          <p>{email}</p>
        </div>
        <div className="form-field">
          <label className="form-label">Role:</label>
          <p>{role}</p>
        </div>
      </div>
    </>
  );
};

export default ViewForm;
