import React from "react";

const UserInfo = ({ formData, setFormData }) => {
  return (
    <div>
      <div className="card-header mb-2">User info*</div>
      <label>Email* </label>
      <input
        type="text"
        className="form-control"
        value={formData.email}
        disabled
        readOnly
      />
      <label>Name* </label>
      <input
        type="text"
        className="form-control"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>
  );
};

export default UserInfo;
