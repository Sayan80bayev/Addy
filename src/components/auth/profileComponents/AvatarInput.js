import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "react-modal";

const AvatarInput = ({
  handleImageChange,
  handleClick,
  imageUrl,
  avatarUpdated,
}) => {
  const [cropping, setCropping] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(imageUrl);
  const cropperRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setCropping(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = () => {
    const cropper = cropperRef.current.cropper;
    const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
    setCroppedImage(croppedDataUrl);
    setSelectedImage(croppedDataUrl);
    setCropping(false);
    handleImageChange(croppedDataUrl);
  };

  // Modal styles
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div className="avatar-input">
      <input
        type="file"
        id="image-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div
        style={{ display: "flex", height: "100%" }}
        onClick={() => document.getElementById("image-input").click()}
      >
        <img
          className="current-avatar"
          src={
            croppedImage ||
            (imageUrl && avatarUpdated
              ? imageUrl
              : `data:image/jpeg;base64,${imageUrl}`) ||
            "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="Click to select image"
        />
        <img
          src={process.env.PUBLIC_URL + "/edit-3-svgrepo-com.png"}
          alt="Edit"
          style={{ height: "20px", width: "20px" }}
        />
      </div>

      <Modal
        isOpen={cropping}
        onRequestClose={() => setCropping(false)}
        style={customStyles}
        contentLabel="Crop Image Modal"
      >
        <Cropper
          src={selectedImage}
          style={{ height: 400, width: "100%" }}
          aspectRatio={1} // Enforce a square aspect ratio for avatars
          viewMode={2} // Show a grid overlay for easier cropping
          ref={cropperRef}
        />
        <button onClick={handleCrop}>Crop Image</button>
      </Modal>
    </div>
  );
};

export default AvatarInput;
