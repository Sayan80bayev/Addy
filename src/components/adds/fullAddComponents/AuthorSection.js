import React from "react";
import { Link } from "react-router-dom";
const AuthorSection = ({ props }) => {
  const { add, email, userData, id, handleDelete } = props;
  return (
    <div className="ctn-p-profile">
      <h5>
        <img
          className="rec_icon"
          src={process.env.PUBLIC_URL + "/author-sign-svgrepo-com.png"}
          alt="Add"
        />
        Author:
      </h5>
      <div className="ctn-profile">
        <h6>{add.email}</h6>
        <img
          src={
            userData?.avatar
              ? `data:image/jpeg;base64,${userData.avatar}`
              : "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
          }
          alt="Profile"
        />
      </div>
      {email === add.email && (
        <div className="ctn-actions mb-4 mt-4">
          <Link to={"/edit/" + id} className="btn btn-danger btn-custom">
            <img
              src={process.env.PUBLIC_URL + "/edit-3-svgrepo-com.png"}
              alt="Edit"
              style={{ height: "20px" }}
            />
            Edit
          </Link>
          <button
            className="btn btn-danger btn-custom"
            onClick={() => handleDelete()}
          >
            <img
              src={process.env.PUBLIC_URL + "/delete-clipboard-svgrepo-com.png"}
              alt="Delete"
              style={{ height: "20px" }}
            />
            Delete
          </button>
        </div>
      )}
      {email !== add.email && (
        <button className="mt-4 mb-4 btn btn-danger btn-custom">
          <img
            className="rec_icon"
            src={
              process.env.PUBLIC_URL + "/call-dropped-rounded-svgrepo-com.png"
            }
            alt="Contact"
          />
          Contact with author
        </button>
      )}
    </div>
  );
};

export default AuthorSection;
