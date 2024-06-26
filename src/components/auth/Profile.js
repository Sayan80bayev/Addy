import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../../store";
import {
  imageChangeHelper,
  validateNewPasswordHelper,
  prepareFormDataHelper,
} from "./profileHelpers";
import AlerSuccess from "../feedback/AlerSuccess";
import AlertError from "../feedback/AlertError";
import AlertWarning from "../feedback/AlertWarning";
import PasswordChange from "./profileComponents/PasswordChange";
import AvatarInput from "./profileComponents/AvatarInput";
import UserInfo from "./profileComponents/UserInfo";

const Profile = () => {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    newPassword: null,
    password: null,
    confirmPassword: null,
  });

  const token = localStorage.getItem("authToken");
  const email = jwtDecode(token).sub;
  const [message, setMessage] = useState("");
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const { data: user = { avatar: "" } } = useGetUserQuery(email);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      return navigate("/login", {
        state: { status: "error", message: "First you need to login!" },
      });
    }
    setFormData(user);
    setImageUrl(user.avatar);
  }, [token, user]);

  const handleImageChange = (event) => {
    imageChangeHelper({ event, setImageUrl, setAvatarUpdated });
  };

  const handleClick = () => {
    document.getElementById("image-input").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { newPassword, password, confirmPassword } = formData;

    if (
      !validateNewPasswordHelper({ formData, setMessage }) &&
      (newPassword || password || confirmPassword)
    )
      return;
    try {
      const updatedFormData = {
        ...formData,
        newPassword: newPassword,
      };
      const formDataToSend = new FormData();
      const userDataBlob = new Blob([JSON.stringify(updatedFormData)], {
        type: "application/json",
      });

      formDataToSend.append("user", userDataBlob);
      if (imageUrl && avatarUpdated) {
        const blob = await fetch(imageUrl).then((res) => res.blob());
        formDataToSend.append("avatar", blob, "avatar.png");
      } else {
        formDataToSend.append("avatar", new Blob());
      }
      const response = await updateUser(formDataToSend);

      if (response.error && response.status !== 200) {
        setMessage({ status: "error", value: response.error.data });
      } else {
        setMessage({
          status: "success",
          value: "Profile updated successfully",
        });
      }
    } catch (error) {
      console.log(error.message);
      setMessage({ value: "Error updating profile" });
    }
  };

  return (
    <>
      <main>
        <h2 className="mb-3">Profile</h2>
        {message &&
          (message?.status == "success" ? (
            <AlerSuccess message={message.value} />
          ) : (
            <AlertError message={message.value} />
          ))}

        <form className="row row-cols-2 mb-5 " onSubmit={handleSubmit}>
          <AvatarInput
            handleClick={handleClick}
            handleImageChange={handleImageChange}
            avatarUpdated={avatarUpdated}
            imageUrl={imageUrl}
          />
          <div
            className="row p-form"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <UserInfo formData={formData} setFormData={setFormData} />
            <div className="card-header mt-3 mb-2">Password change*</div>
            <AlertWarning message={"May be not filled"} />
            <PasswordChange formData={formData} setFormData={setFormData} />
            <button type="submit" className="">
              Submit
            </button>
          </div>
        </form>
        <Footer />
      </main>
    </>
  );
};

export default Profile;
