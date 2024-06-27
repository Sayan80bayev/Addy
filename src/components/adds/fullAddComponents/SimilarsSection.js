import React from "react";
import { simplifyTimestamp } from "../utils";
import { Link } from "react-router-dom";

const SimilarsSection = ({ similars, add }) => {
  return (
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
          <ul className="similarInfo">
            <br />
            <li>
              <Link to={"/view/" + ad.id} style={{ fontWeight: "bold" }}>
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
            src={process.env.PUBLIC_URL + "/arrow-down-svgrepo-com (1).png "}
            alt="See more"
          />
          See more like this
        </Link>
      )}
    </>
  );
};

export default SimilarsSection;
