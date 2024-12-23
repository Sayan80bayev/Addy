import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddForms.css";
import Footer from "../../Footer";
import {
  usePostAddsMutation,
  useUpdatePostMutation,
} from "../../../store/api/advertismentApi";
import FormInput from "./FormInput";
import { useGetCatsQuery } from "../../../store/api/categoryApi";
import { useGetByIdQuery } from "../../../store/api/advertismentApi";
import AlertError from "../../feedback/AlertError";
import { validateFormChanges, validateImages } from "./formHelpers";
import LoadingIcon from "../../LoadingIcon";

export const AdvertisementForm = ({ isEditing }) => {
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
      categoryId: "",
    },
    isLoading: isAdLoading,
  } = useGetByIdQuery(id, { skip: !isEditing });

  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]); // Unified list for files and URLs
  const [isFormChanged, setFormChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const setToFormData = async () => {
    if (!adResponse) return;

    const formDataFromObject = {
      title: adResponse.title || "",
      description: adResponse.description || "",
      price: adResponse.price ? adResponse.price.toString() : "",
      categoryId: adResponse.category?.categoryId
        ? adResponse.category.categoryId.toString()
        : "",
    };
    setFormData(formDataFromObject);

    // Download images from URLs and create blobs
    const downloadImagesAsBlobs = async (urls) => {
      const blobPromises = urls.map(async (url) => {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          return blob;
        } catch (error) {
          console.error(`Failed to fetch image from URL: ${url}`, error);
          return null;
        }
      });

      const blobs = await Promise.all(blobPromises);
      return blobs.filter((blob) => blob !== null); // Filter out any failed downloads
    };

    const downloadedImages = await downloadImagesAsBlobs(adResponse.imagesUrl || []);
    setImages(downloadedImages); // Set the downloaded blobs to images
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
    const files = Array.from(e.target.files);
    const filteredImages = validateImages(files);

    if (filteredImages.length > 0) {
      setImages((prevImages) => [...prevImages, ...filteredImages]);
      setFormChanged(true);
    } else {
      setErrorMessage("Invalid image format. Please select JPEG or PNG images.");
    }
    e.target.value = null;
  };

  const handleImageAdd = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      if (!images.some((img) => img.size === blob.size)) {
        setImages((prevImages) => [...prevImages, blob]);
        setFormChanged(true);
      } else {
        setErrorMessage("Duplicate URL detected.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch image from the provided URL.");
    }
  };

  const handleImageDelete = (deletedImage) => {
    setImages((prevImages) => prevImages.filter((img) => img !== deletedImage));
    setFormChanged(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = ["title", "description", "price", "categoryId"];
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
      categoryId: formData.categoryId,
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

      navigate(isEditing ? `/view/${id}` : "/index", {
        state: {
          status: "success",
          message: "Advertisement saved successfully",
        },
      });
    } catch (error) {
      setErrorMessage("Failed to save advertisement");
    }
  };

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
            <FormInput
              props={{
                formData,
                handleSubmit,
                categories,
                handleChange,
                handleImageChange,
                handleImageAdd,
                handleImageDelete,
                images,
              }}
            />
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
};