import React from "react";

const PasswordChange = ({ formData, setFormData }) => {
  return (
    <>
      <label>New password*</label>
      <input
        type="password"
        className="form-control"
        value={formData.newPassword || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            newPassword: e.target.value || null,
          })
        }
      />
      <label>Confirm password*</label>
      <input
        type="password"
        className="form-control"
        value={formData.confirmPassword || ""}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      <label>Password*</label>
      <input
        type="password"
        className="form-control"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
    </>
  );
};

export default PasswordChange;
