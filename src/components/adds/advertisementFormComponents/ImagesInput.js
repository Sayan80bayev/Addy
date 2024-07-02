import React from "react";

const ImagesInput = ({ props }) => {
  const {
    handleImageChange,
    handleImageDelete,
    images = [],
    imageIconPath,
  } = props;
  return (
    <div className="mb-3">
      <h6>
        <label htmlFor="image">Images*</label>
      </h6>
      <div className="image-selector">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          hidden
        />
        <label htmlFor="image-upload">
          <i className="fas fa-plus"></i>
          <img className="rec_icon" src={imageIconPath} alt="Addy" />
        </label>
        <div className="selected-images">
          {images.map((image, index) => (
            <div
              key={index}
              className="img-ctn"
              onClick={() => handleImageDelete(image)}
            >
              <img
                className="img"
                src={image.src ?? URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
              />
              <div className="delete_overlay">
                <img
                  className="delete_icon"
                  src={process.env.PUBLIC_URL + "/plus-svgrepo-com (1).png"}
                  alt="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagesInput;
