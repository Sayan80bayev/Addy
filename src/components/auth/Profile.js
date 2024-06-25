import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../../store";

const Profile = () => {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    newPassword: "",
    password: "",
    confirmPassword: "",
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
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      setAvatarUpdated(true);
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    document.getElementById("image-input").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.newPassword);
    console.log(formData.confirmPassword);
    if (formData.newPassword != formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return;
    }

    try {
      const newPasswordToSend = formData.newPassword || null;
      const updatedFormData = {
        ...formData,
        newPassword: newPasswordToSend,
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
      setMessage({ status: "success", value: "Profile updated successfully" });
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <>
      <main>
        <h2 className="mb-3">Profile</h2>
        {message &&
          (message?.status == "success" ? (
            <div
              class="alert alert-warning rounded-md custom-alert-green"
              style={{ padding: "7px", height: "60px" }}
            >
              <div>
                <h6 class="mb-0.5 flex items-center gap-2 text-base uppercase sm:mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 256 256"
                  >
                    <g
                      fill="#00ff00"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M41.9375,8.625c-0.66406,0.02344 -1.27344,0.375 -1.625,0.9375l-18.8125,28.78125l-12.1875,-10.53125c-0.52344,-0.54297 -1.30859,-0.74609 -2.03125,-0.51953c-0.71875,0.22266 -1.25391,0.83203 -1.37891,1.57422c-0.125,0.74609 0.17578,1.49609 0.78516,1.94531l13.9375,12.0625c0.4375,0.37109 1.01563,0.53516 1.58203,0.45313c0.57031,-0.08594 1.07422,-0.41016 1.38672,-0.89062l20.09375,-30.6875c0.42969,-0.62891 0.46484,-1.44141 0.09375,-2.10547c-0.37109,-0.66016 -1.08594,-1.05469 -1.84375,-1.01953z" />
                      </g>
                    </g>
                  </svg>
                  SUCCESS
                </h6>{" "}
                <div class="text-sm leading-normal sm:text-base">
                  <p>{message.value}</p>
                </div>
              </div>
            </div>
          ) : (
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
                  <p>{message.value}</p>
                </div>
              </div>
            </div>
          ))}

        <form className="row row-cols-2 mb-5 " onSubmit={handleSubmit}>
          <div className="avatar-input">
            <input
              type="file"
              id="image-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div
              style={{ display: "flex", height: "100%" }}
              onClick={handleClick}
            >
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
          <div
            className="row p-form"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="card-header mb-2">User info*</div>
            <label>Email* </label>
            <input
              type="text"
              className="form-control"
              value={formData.email}
              disabled
              readOnly
            />
            <label>Name* </label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div className="card-header mt-3 mb-2">Password change*</div>
            <div
              class="alert alert-warning rounded-md custom-alert"
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
                  <p>May be not filled</p>
                </div>
              </div>
            </div>
            <label>New password*</label>
            <input
              type="password"
              className="form-control"
              value={formData.newPassword || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value || null,
                })
              }
            />
            <label>Confirm password*</label>
            <input
              type="password"
              className="form-control"
              value={formData.confirmPassword || ""}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <label>Password*</label>
            <input
              type="password"
              className="form-control"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
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
