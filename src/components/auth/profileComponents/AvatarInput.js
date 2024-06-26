import React from "react";

const AvatarInput = ({
  handleImageChange,
  handleClick,
  imageUrl,
  avatarUpdated,
}) => {
  return (
    <div className="avatar-input">
      <input
        type="file"
        id="image-input"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div style={{ display: "flex", height: "100%" }} onClick={handleClick}>
        <img
          className="current-avatar"
          src={
            imageUrl
              ? avatarUpdated
                ? imageUrl
                : `data:image/jpeg;base64,${imageUrl}`
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="Click to select image"
        />
        <img
          src={process.env.PUBLIC_URL + "/edit-3-svgrepo-com.png"}
          alt="Edit"
          style={{ height: "20px", width: "20px" }}
        />
      </div>
    </div>
  );
};

export default AvatarInput;
