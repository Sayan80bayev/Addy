import React from "react";
const SimilarLoader = () => {
  return (
    <div className="ctn-additional">
      <div className="skeleton skeleton-line" style={{ height: "40px" }}></div>
      <div className="ctn-profile">
        <div className="skeleton skeleton-line" style={{ width: "70%" }}></div>
        <div className="skeleton skeleton-avatar"></div>
      </div>
      <div className="skeleton skeleton-line"></div>
      <br />
      <ul className="similarSectionLoader">
        <li className="recomendation-loader">
          <div className=" skeleton skeleton-line"></div>
        </li>
        <li className="recomendation-loader">
          <div className=" skeleton skeleton-line"></div>
        </li>
        <li className="recomendation-loader">
          <div className=" skeleton skeleton-line"></div>
        </li>
      </ul>
      <div className="skeleton  skeleton-line"></div>
    </div>
  );
};

export default SimilarLoader;
