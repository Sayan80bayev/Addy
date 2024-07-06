import React from "react";

const OneImage = ({ add, base64ToUrl }) => {
  return (
    <div className="img">
      <img
        className="add_img"
        src={base64ToUrl(add.images[0].imageData)}
        alt="Contact"
      />
    </div>
  );
};

export default OneImage;
