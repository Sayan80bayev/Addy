// Sorting.js
import React, { useState } from "react";

export default function Sorting({ onSort }) {
  const [formData, setFormData] = useState("date");

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData(value);
    onSort(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="sort mb-4">
      <select value={formData} onChange={handleChange}>
        <option value="99">Select sorting</option>
        <option value="1" key="1">
          Date
        </option>
        <option value="2" key="2">
          Price
        </option>
      </select>
    </form>
  );
}
