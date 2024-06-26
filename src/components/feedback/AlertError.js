import React from "react";
import AlertIcon from "../icons/AlertIcon";
const AlertError = ({ message }) => {
  return (
    <div
      className="alert alert-warning rounded-md custom-alert-red"
      style={{ padding: "7px", height: "60px" }}
    >
      <div>
        <h6 className="mb-0.5 flex items-center gap-2 text-base uppercase sm:mb-2">
          <AlertIcon /> ALERT
        </h6>{" "}
        <div className="text-sm leading-normal sm:text-base">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertError;
