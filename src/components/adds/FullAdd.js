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
import { useGetSimilarsQuery } from "../../store";
import { useGetByIdQuery } from "../../store/api/advertismentApi";
import AlertError from "../feedback/AlertError";
import AlertSuccess from "../feedback/AlertSuccess";

export default function FullAdd() {
  const [deletePost] = useDeletePostMutation();
  const location = useLocation();
  const { id } = useParams();
  const [similarParams, setSimilarParams] = useState(null);

  const {
    data: add = { images: [], title: "" },
    error: addError,
    isLoading: addLoading,
  } = useGetByIdQuery(id);

  const {
    data: similars,
    error: similarsError,
    isLoading: similarsLoading,
  } = useGetSimilarsQuery(similarParams, {
    skip: !similarParams,
  });

  const [email, setEmail] = useState("");
  const token = localStorage.getItem("authToken") ?? "";
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (add && add.email) {
      const fetchData = async () => {
        try {
          const userData = await getUserByEmail(add.email);
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [add]);

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
      await deletePost(id).unwrap();
      navigate("/index", {
        state: { status: "success", message: "Successfully deleted" },
      });
    } catch (error) {
      navigate("/index", {
        state: { status: "error", message: "Couldn't delete" },
      });
    }
  };

  if (addLoading) {
    return <div>Loading...</div>;
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
  if (addLoading) {
    return <div>Loading</div>;
  }

  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;
  return (
    <main>
      {message &&
        (message?.status == "success" ? (
          <AlertSuccess message={message.message} />
        ) : (
          <AlertError message={message.message} />
        ))}
      {window.history.replaceState({}, "")}

      <div className="ctn-full mb-4">
        <div className="children">
          {add?.images && add?.images.length > 1 && (
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
          {add?.images && add?.images.length == 1 && (
            <div className="img">
              <img
                className="add_img"
                src={base64ToUrl(add.images[0].imageData)}
                alt="Contact"
              />
            </div>
          )}
          {add?.images && add?.images.length === 0 && (
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
