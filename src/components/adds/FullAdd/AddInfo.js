import React, { useState } from "react";
import ImageCarousel from "./ImageCarousel";
import OneImage from "./OneImage";

export const AddInfo = ({ add, renderCategories, base64ToUrl }) => {
  const [showToast, setShowToast] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000); // Auto-hide toast after 3 seconds
      },
      (err) => {
        console.error("Failed to copy link: ", err);
      }
    );
  };

  return (
    <div className="children">
      {add.imagesUrl && add.imagesUrl.length > 1 && (
        <ImageCarousel add={add} base64ToUrl={base64ToUrl} />
      )}
      {add.imagesUrl && add.imagesUrl.length === 1 && (
        <OneImage add={add} base64ToUrl={base64ToUrl} />
      )}
      {add.imagesUrl && add.imagesUrl.length === 0 && (
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
        {add.title}
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

      {/* Copy Link Button */}
      {add.shortUrl && (
        <div className="mt-4">
          <h5
            onClick={() => copyToClipboard(add.shortUrl)}
          >
            {add.shortUrl}
          </h5>
        </div>
      )}

      {/* Bootstrap Dark-Themed Toast */}
      {showToast && (
        <div
          className="toast show position-fixed bottom-0 end-0 m-3 bg-dark text-white"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header bg-dark text-white">
            <strong className="me-auto">Success</strong>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">Link copied to clipboard!</div>
        </div>
      )}
    </div>
  );
};