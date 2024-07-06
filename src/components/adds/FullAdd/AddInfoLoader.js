import React from "react";

export const AddInfoLoader = () => {
  return (
    <div className="children">
      <div className="skeleton skeleton-line" style={{ height: "400px" }}></div>

      <br />
      <div className="skeleton skeleton-line" style={{ width: "50%" }}></div>
      <br />
      <div className="skeleton skeleton-line" style={{ width: "35%" }}></div>
      <br />
      <div className="skeleton skeleton-line" style={{ width: "35%" }}></div>
      <br />
      <div className="skeleton  skeleton-line" style={{ width: "30%" }}></div>
    </div>
  );
};
