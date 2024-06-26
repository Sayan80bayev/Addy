import React from "react";
import SuccessIcon from "../icons/SuccesIcon";
const AlerSuccess = ({ message }) => {
  return (
    <div
      class="alert alert-warning rounded-md custom-alert-green"
      style={{ padding: "7px", height: "60px" }}
    >
      <div>
        <h6 class="mb-0.5 flex items-center gap-2 text-base uppercase sm:mb-2">
          <SuccessIcon />
          SUCCESS
        </h6>{" "}
        <div class="text-sm leading-normal sm:text-base">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlerSuccess;
