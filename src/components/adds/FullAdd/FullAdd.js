import React from "react";
import { useParams } from "react-router-dom";

import AlertError from "../../feedback/AlertError";
import AlertSuccess from "../../feedback/AlertSuccess";
import { AddInfoLoader } from ".";
import { AddInfo, AdditionalInfo, SimilarLoader } from ".";
import NotFound from "../../feedback/NotFound";
import Footer from "../../Footer";
import "../../style/FullAdd.css";
import { useFullAdd } from "./hooks";


export const FullAdd = () => {
  const { id } = useParams();
  const {
    fullAdd,
    // similars,
    handleDelete,
    isPageFetched,
    isPageFound,
    message,
    email,
    // similarsFetching,
    userData,
  } = useFullAdd(id);

  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;

  const renderCategories = (category) => {
    return (
      <div style={{ display: "flex", gap: "15px" }}>
        {category.parent && renderCategories(category.parent)}
        <p className="category mt-2" key={category.categoryId}>
          {category.categoryName}
        </p>
      </div>
    );
  };

  console.log(message);
  

  return (
    <main>
      {message &&
        (message.status === "success" ? (
          <AlertSuccess message={message.message} />
        ) : (
          <AlertError message={message.message} />
        ))}
      <div className="ctn-full mb-4">
        {isPageFound ? (
          isPageFetched ? (
            <>
              <AddInfo
                add={fullAdd}
                base64ToUrl={base64ToUrl}
                renderCategories={renderCategories}
              />
              <AdditionalInfo
                props={{
                  userData,
                  add: fullAdd,
                  // similars,
                  email,
                  handleDelete,
                  id,
                }}
              />
            </>
          ) : (
            <>
              <AddInfoLoader />
              <SimilarLoader />
            </>
          )
        ) : (
          <NotFound />
        )}
      </div>
      <Footer />
    </main>
  );
};
