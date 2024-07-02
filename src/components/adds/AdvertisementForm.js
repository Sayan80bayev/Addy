import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../style/AddForms.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import {
  usePostAddsMutation,
  useUpdatePostMutation,
} from "../../store/api/advertismentApi";
import { useDispatch } from "react-redux";
import FormInput from "./advertisementFormComponents/FormInput";
import { useGetCatsQuery } from "../../store/api/categoryApi";
import { useGetByIdQuery } from "../../store/api/advertismentApi";
import AlertError from "../feedback/AlertError";
import {
  validateFormChanges,
  validateImages,
} from "./advertisementFormComponents/formHelpers";
import LoadingIcon from "../LoadingIcon";
function AdvertisementForm({ isEditing }) {
  const { id } = useParams();

  const navigate = useNavigate();
  const [postAdds] = usePostAddsMutation();
  const [updateAdd, { isLoading: isAddUpdating }] = useUpdatePostMutation();
  const { data: categories = [] } = useGetCatsQuery();
  const {
    data: adResponse = {
      title: "",
      description: "",
      price: "",
      category_id: "",
    },
    isLoading: isAdLoading,
    isFetching: isAdFetching,
  } = useGetByIdQuery(id, { skip: !isEditing });
  //note: emai field is for checking that ad's owner editinhg not someone else
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);
  const [isFormChanged, setFormChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const setToFormData = () => {
    if (!adResponse) return;

    const formDataFromObject = {
      title: adResponse.title || "",
      description: adResponse.description || "",
      price: adResponse.price ? adResponse.price.toString() : "",
      category_id: adResponse.category?.category_id
        ? adResponse.category.category_id.toString()
        : "",
    };
    setFormData(formDataFromObject);

    const decodedFiles = adResponse.images.map((imageData) => {
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
    setEmail(adResponse.email);
  };
  useEffect(() => {
    if (errorMessage) window.scrollTo(0, 0);
  }, [errorMessage]);
  useEffect(() => {
    if (isEditing && !isAdLoading && adResponse) {
      setToFormData();
    }
  }, [isEditing, isAdLoading, adResponse]);

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
    const filteredImages = validateImages(files);

    if (filteredImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...filteredImages]);
    } else {
      setErrorMessage(
        "Invalid image format. Please select JPEG or PNG images."
      );
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
    const requiredFields = ["title", "description", "price", "category_id"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);
    if (
      !validateFormChanges(
        isFormChanged,
        isEditing,
        emptyFields,
        setErrorMessage
      )
    ) {
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
      if (response.error) throw response.error;
      console.log(response);
      if (isEditing && !response.error && response.data.status === "SUCCESS") {
        navigate(`/view/${id}`, {
          state: {
            status: "success",
            message: "Advertisement saved successfully",
          },
        });
      } else if (!response.error) {
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
      {errorMessage && <AlertError message={errorMessage} />}
      {isAddUpdating ? (
        <LoadingIcon />
      ) : (
        <div className="mb-5" style={{ display: "flex" }}>
          <div style={{ width: "80%" }}>
            <h2>{isEditing ? "Edit" : "Add New"} Advertisement</h2>
            <br />
            <br />
            {isAdFetching && formData ? (
              <LoadingIcon />
            ) : (
              <FormInput
                props={{
                  formData,
                  handleSubmit,
                  categories,
                  handleChange,
                  handleImageChange,
                  handleImageDelete,
                  images,
                }}
              />
            )}
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}

export default AdvertisementForm;
