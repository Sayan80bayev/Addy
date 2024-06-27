import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../style/AddForms.css";
import Footer from "../Footer";
import { fetchCategories, fetchAddById } from "../api";
import { jwtDecode } from "jwt-decode";
import {
  usePostAddsMutation,
  useUpdatePostMutation,
} from "../../store/api/advertismentApi";
import { useDispatch } from "react-redux";
function AdvertisementForm({ isEditing }) {
  const [isFormChanged, setFormChanged] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [postAdds] = usePostAddsMutation();
  const [updateAdd] = useUpdatePostMutation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const navigate = useNavigate();
  // Note: Fetching data for editing
  const fetchData = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      if (isEditing) {
        const adResponse = await fetchAddById(id);
        const formDataFromObject = {
          title: adResponse.data.title || "",
          description: adResponse.data.description || "",
          price: adResponse.data.price.toString() || "",
          category_id: adResponse.data.category.category_id.toString() || "",
        };
        setFormData(formDataFromObject);

        //Note  Decode images from base64 and set them
        const decodedFiles = adResponse.data.images.map((imageData) => {
          const byteCharacters = atob(imageData.imageData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          const file = new File([byteArray], imageData.fileName, {
            type: "image/png",
          });

          return file;
        });
        setImages(decodedFiles);

        //Note Set email for editing
        setEmail(adResponse.data.email);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormChanged(true);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormChanged(true);
    const files = Array.from(e.target.files);
    const validImageExtensions = [".jpg", ".jpeg", ".png"];

    const filteredImages = files.filter((file) => {
      if (!file.type || file.type === "") {
        file.type = "image/png"; // Note Default to PNG if type is empty
      }

      const extension = file.name.toLowerCase().slice(-4);
      return (
        validImageExtensions.includes(extension) &&
        file.type.startsWith("image/")
      );
    });

    if (filteredImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...filteredImages]);
    } else {
      console.error("Invalid image format. Please select JPEG or PNG images.");
    }
  };

  const handleImageDelete = (deletedImage) => {
    setFormChanged(true);
    const filteredImages = images.filter((image) => image !== deletedImage);
    setImages(filteredImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormChanged) {
      setErrorMessage("No changes made to the form.");
      return;
    }

    const requiredFields = ["title", "description", "price", "category_id"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      setErrorMessage(`Please fill out all required fields`);
      return;
    }

    const formDataToSend = new FormData();

    const advertisementData = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      category: {
        category_id: formData.category_id,
      },
    };
    const advertisementBlob = new Blob([JSON.stringify(advertisementData)], {
      type: "application/json",
    });
    formDataToSend.append("advertisement", advertisementBlob);
    for (const image of images) {
      formDataToSend.append("files", image);
    }

    try {
      let response;
      if (isEditing) {
        response = await updateAdd({ updatedAdd: formDataToSend, id });
      } else {
        response = await postAdds(formDataToSend);
      }
      console.log("Advertisement saved successfully:", response);
      if (isEditing) {
        navigate(`/view/${id}`, {
          state: {
            status: "success",
            message: "Advertisement saved successfully",
          },
        });
      } else {
        navigate("/index", {
          state: {
            status: "success",
            message: "Advertisement saved successfully",
          },
        });
      }
    } catch (error) {
      console.error("Failed to save advertisement:", error);
      setErrorMessage("Failed to save advertisement");
    }
  };

  const imageIconPath = process.env.PUBLIC_URL + "/plus-svgrepo-com.png";
  if (!localStorage.getItem("authToken")) {
    return navigate("/login", {
      state: { status: "error", message: "First you need to login!" },
    });
  } else if (
    isEditing &&
    email &&
    email != jwtDecode(localStorage.getItem("authToken")).sub
  ) {
    return navigate("/index", {
      state: { status: "error", message: "No access!" },
    });
  }
  return (
    <main>
      {errorMessage && (
        <div
          class="alert alert-warning rounded-md custom-alert-red"
          style={{ padding: "7px", height: "60px" }}
        >
          <div>
            <h6 class="mb-0.5 flex items-center gap-2 text-base uppercase sm:mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                class="text-lg sm:text-2xl iconify iconify--uis"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m22.7 17.5l-8.1-14c-.8-1.4-2.7-1.9-4.1-1.1c-.5.3-.9.7-1.1 1.1l-8.1 14c-.8 1.4-.3 3.3 1.1 4.1c.5.3 1 .4 1.5.4H20c1.7 0 3-1.4 3-3c.1-.6-.1-1.1-.3-1.5M12 18c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1m1-5c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1z"
                ></path>
              </svg>{" "}
              ALERT
            </h6>{" "}
            <div class="text-sm leading-normal sm:text-base">
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-5" style={{ display: "flex" }}>
        <div style={{ width: "60%" }}>
          <h2>{isEditing ? "Edit" : "Add New"} Advertisement</h2>
          <br />
          <br />
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
                <option value="">Select Category</option> // Added value
                attribute
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
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
                          src={
                            process.env.PUBLIC_URL + "/plus-svgrepo-com (1).png"
                          }
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
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default AdvertisementForm;
