import React from "react";
import { useNavigate } from "react-router-dom";
const FormInput = ({ props }) => {
  const navigate = useNavigate();
  const {
    formData,
    categories,
    handleSubmit,
    handleChange,
    handleImageChange,
    images = [],
    handleImageDelete,
  } = props;

  const imageIconPath = process.env.PUBLIC_URL + "/plus-svgrepo-com.png";
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <h6>
          <label htmlFor="title">Title*</label>
        </h6>
        <input
          className="form-input"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          placeholder="Toyota Camry 50"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <h6>
          <label htmlFor="description">Description*</label>
        </h6>
        <textarea
          className="form-input"
          id="description"
          name="description"
          value={formData.description}
          placeholder="Think about description"
          onChange={handleChange}
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            resize: "none",
            height: "200px",
          }}
        />
      </div>
      <div className="mb-3">
        <h6>
          <label htmlFor="price">Price*</label>
        </h6>
        <input
          type="number"
          className="form-input"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <h6>
          <label htmlFor="category">Category*</label>
        </h6>
        <select
          name="category_id"
          className="form-select"
          value={formData.category_id}
          onChange={handleChange}
        >
          <option value="">Select Category</option> // Added value attribute
          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
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
      <button type="submit">Submit</button>
      <button onClick={() => navigate(-1)} className="scnd">
        Back
      </button>
    </form>
  );
};

export default FormInput;
