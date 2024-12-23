import React from "react";

const OneImage = ({ add, base64ToUrl }) => {
  return (
    <div className="img">
      <img
        className="add_img"
        src={add.imagesUrl[0]}
        alt="Contact"
      />
    </div>
  );
};

export default OneImage;
