import React from "react";
import { useNavigate } from "react-router-dom";
import CustomTextArea from "./CustomTextArea";
import ImagesInput from "./ImagesInput";
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
    setImages,
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
        <CustomTextArea formData={formData} handleChange={handleChange} />
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
          name="categoryId"
          className="form-select"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select Category</option> // Added value attribute
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>
      <ImagesInput
        props={{
          handleImageChange,
          handleImageDelete,
          images,
          imageIconPath,
          setImages,
        }}
      />
      <button type="submit">Submit</button>
      <button onClick={() => navigate(-1)} className="scnd">
        Back
      </button>
    </form>
  );
};

export default FormInput;
