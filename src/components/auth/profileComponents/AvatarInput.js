import React, { useState, useRef } from "react";
import { Cropper, CircleStencil } from "react-advanced-cropper";
import Modal from "react-modal";
import ReactModal from "react-modal";
ReactModal.defaultStyles.overlay.backgroundColor = "rgba(54, 54, 50, 0.75)";

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
    e.target.value = null;
  };

  const handleCrop = async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const croppedImageData = await cropper.getCanvas()?.toDataURL();
      if (croppedImageData) {
        setCroppedImage(croppedImageData);
        handleImageChange(croppedImageData);
      }
    }
    setCropping(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(40, 40, 40)",
      border: "none",
      // width: "50%",
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
        // onRequestClose={() => setCropping(false)}
        style={customStyles}
        contentLabel="Crop Image Modal"
      >
        {selectedImage && (
          <Cropper
            ref={cropperRef}
            src={selectedImage}
            aspectRatio={1} // Enforce a square aspect ratio
            stencilComponent={CircleStencil} // Use CircleStencil for circular crop
            style={{ height: 400, width: "100%" }}
            overlayClassName="Overlay"
          />
        )}
        <div className="ctn-actions mb-4 mt-4">
          <button
            onClick={handleCrop}
            className="mr-3 btn btn-danger btn-custom"
          >
            Crop Image
          </button>
          <button
            onClick={() => setCropping(false)}
            className="btn btn-danger btn-custom"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarInput;
