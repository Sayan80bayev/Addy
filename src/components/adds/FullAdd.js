import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../style/FullAdd.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { fetchAddById, getUserByEmail } from "../api";
import { Carousel } from "react-bootstrap";
import { findSimilars } from "../api";
import { simplifyTimestamp } from "./utils";
import { useLocation } from "react-router-dom";
import { useDeletePostMutation } from "../../store/api/advertismentApi";
import axios from "axios";
import { useGetByIdQuery, useGetSimilarsQuery } from "../../store";

export default function FullAdd() {
  const [deletePost] = useDeletePostMutation();
  const location = useLocation();
  const { id } = useParams();
  const [similarParams, setSimilarParams] = useState(null);

  const {
    data: add,
    error: addError,
    isLoading: addLoading,
  } = useGetByIdQuery(id);

  const {
    data: similars,
    error: similarsError,
    isLoading: similarsLoading,
  } = useGetSimilarsQuery(similarParams, {
    skip: !similarParams, // Пропуск запроса, если нет параметров
  });
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("authToken") ?? "";
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAddById(id);
        const userData = await getUserByEmail(result.data.email);
        // setAdd(result.data);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching add:", error);
      }
    };

    fetchData();
  }, [id, token, add]);
  useEffect(() => {
    if (add && add.category && add.price && add.id) {
      setSimilarParams({
        catId: add.category.category_id,
        price: add.price,
        addId: add.id,
      });
    }
  }, [add]);
  useEffect(() => {
    try {
      const data = jwtDecode(token).sub ?? null;
      setEmail(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const handleDelete = async () => {
    try {
      const result = await deletePost(id);
      return navigate("/index", {
        state: { status: "success", message: "Successfully deleted" },
      });
    } catch (error) {
      return navigate("/index", {
        state: { status: "error", message: "Couldn't deleted" },
      });
    }
  };
  if (addLoading) {
    return <div>Loading</div>;
  }
  const renderCategories = (category) => {
    return (
      <div style={{ display: "flex", gap: "15px" }}>
        {category.parent && renderCategories(category.parent)}
        <p className="category mt-2" key={category.category_id}>
          {category.category_name}
        </p>
      </div>
    );
  };
  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;
  return (
    <main>
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
                <p>{message.message}</p>
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
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      {window.history.replaceState({}, "")}

      <div className="ctn-full mb-4">
        <div className="children">
          {add.images && add.images.length > 1 && (
            <Carousel className="mb-3">
              {add.images.map((imageObj, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={base64ToUrl(imageObj.imageData)}
                    alt={`Slide ${index}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
          {add.images && add.images.length == 1 && (
            <div className="img">
              <img
                className="add_img"
                src={base64ToUrl(add.images[0].imageData)}
                alt="Contact"
              />
            </div>
          )}
          {add.images && add.images.length === 0 && (
            <div className="img">
              <img
                className="add_img"
                src={process.env.PUBLIC_URL + "/empty.jpg"}
                alt="Contact"
              />
            </div>
          )}
          <h1
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {add.title}{" "}
          </h1>
          <h2 className="price">{add.price}</h2>
          <h6>
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/description-svgrepo-com.png"}
              alt="Add"
            />
            Description:
          </h6>
          <p>{add.description}</p>
          <h6>
            <img
              className="rec_icon"
              src={process.env.PUBLIC_URL + "/category-svgrepo-com.png"}
              alt="Add"
            />
            Categories:
          </h6>
          {add.category && renderCategories(add.category)}
        </div>
        <div className="ctn-additional">
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
                    src={
                      process.env.PUBLIC_URL +
                      "/delete-clipboard-svgrepo-com.png"
                    }
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
                    process.env.PUBLIC_URL +
                    "/call-dropped-rounded-svgrepo-com.png"
                  }
                  alt="Contact"
                />
                Contact with author
              </button>
            )}
          </div>
          {similars != null && similars.length > 0 && (
            <>
              <h4>
                <img
                  className="rec_icon"
                  src={process.env.PUBLIC_URL + "/bulb-on-svgrepo-com.png"}
                  alt="Recommendation"
                />
                More like this:{" "}
              </h4>
              {similars.slice(0, 3).map((ad, i) => (
                <div className="ctn-recomendations" key={i}>
                  {ad.images.length > 0 ? (
                    <img
                      className="rec_img"
                      src={`data:image/jpeg;base64,${ad.images[0].imageData}`}
                      alt={`First Image`}
                    />
                  ) : (
                    <img
                      className="rec_img"
                      src={process.env.PUBLIC_URL + "/empty.jpg"}
                      alt={ad.title}
                    />
                  )}
                  <ul>
                    <br />
                    <li>
                      <Link
                        to={"/view/" + ad.id}
                        style={{ fontWeight: "bold" }}
                      >
                        {ad.title}
                      </Link>
                    </li>
                    <li>
                      <p className="price" style={{ fontWeight: "bold" }}>
                        {ad.price}
                      </p>
                    </li>
                    <li>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <small>{simplifyTimestamp(ad.date)}</small>
                      </p>{" "}
                    </li>
                  </ul>
                </div>
              ))}
              <br />
              {similars.length > 3 && (
                <Link
                  to={`/index/similars/${add.id}/${add.category.category_id}/${add.price}`}
                  className="btn btn-danger btn-custom"
                >
                  <img
                    className="rec_icon"
                    src={
                      process.env.PUBLIC_URL +
                      "/arrow-down-svgrepo-com (1).png "
                    }
                    alt="See more"
                  />
                  See more like this
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
