import React from "react";
import ImageCarousel from "./ImageCarousel";
import OneImage from "./OneImage";
const AddInfo = ({ add, renderCategories, base64ToUrl }) => {
  return (
    <div className="children">
      {add.images && add.images.length > 1 && (
        <ImageCarousel add={add} base64ToUrl={base64ToUrl} />
      )}
      {add.images && add.images.length == 1 && (
        <OneImage add={add} base64ToUrl={base64ToUrl} />
      )}
      {add.images && add.images.length === 0 && (
        <div className="img">
          <img
            className="add_img"
            src={process.env.PUBLIC_URL + "/empty.jpg"}
            alt="Contact"
          />
        </div>
      )}
      <h1
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {add.title}{" "}
      </h1>
      <h2 className="price">{add.price}</h2>
      <h6>
        <img
          className="rec_icon"
          src={process.env.PUBLIC_URL + "/description-svgrepo-com.png"}
          alt="Add"
        />
        Description:
      </h6>
      <p>{add.description}</p>
      <h6>
        <img
          className="rec_icon"
          src={process.env.PUBLIC_URL + "/category-svgrepo-com.png"}
          alt="Add"
        />
        Categories:
      </h6>
      {add.category && renderCategories(add.category)}
    </div>
  );
};

export default AddInfo;
