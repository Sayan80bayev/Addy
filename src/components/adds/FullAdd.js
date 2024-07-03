import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  useDeletePostMutation,
  useGetSimilarsQuery,
  useGetByIdQuery,
  useGetUserQuery,
} from "../../store";
import AlertError from "../feedback/AlertError";
import AlertSuccess from "../feedback/AlertSuccess";
import AddInfo from "./fullAddComponents/AddInfo";
import AdditionaInfo from "./fullAddComponents/AdditionaInfo";
import NotFound from "../feedback/NotFound";
import SimilarLoader from "./fullAddComponents/SimilarLoader";
import AddInfoLoader from "./fullAddComponents/AddInfoLoader";
import Footer from "../Footer";
import "../style/FullAdd.css";

export default function FullAdd() {
  const [deletePost] = useDeletePostMutation();
  const location = useLocation();
  const { id } = useParams();
  const similarParams = location.state?.similarParams;
  const {
    data: fullAdd,
    error: addError,
    isFetching: addFetching,
    isSuccess: addSuccess,
  } = useGetByIdQuery(id);

  const {
    data: similars,
    error: similarsError,
    isLoading: similarsLoading,
    isFetching: similarsFetching,
    isSuccess: similarSuccess,
    isUninitialized: similarUninitialized,
  } = useGetSimilarsQuery(similarParams, {
    skip: !similarParams,
  });

  const token = localStorage.getItem("authToken") ?? "";
  const email = jwtDecode(token).sub;
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const {
    data: userData,
    isFetching: userFetching,
    isSuccess: userSuccess,
    isError: userError,
  } = useGetUserQuery(email);

  useEffect(() => {
    if (message) {
      const newState = { ...location.state };
      delete newState.message;
      delete newState.status;
      window.history.replaceState(newState, "");
    }
  }, [message, location.state]);

  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;

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

  const isPageFetched = addSuccess && similarSuccess && userSuccess;
  const isPageFound = !addError && !similarsError && !userError;

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
          isPageFetched && !similarsFetching ? (
            <>
              <AddInfo
                add={fullAdd}
                base64ToUrl={base64ToUrl}
                renderCategories={renderCategories}
              />
              <AdditionaInfo
                props={{
                  userData,
                  add: fullAdd,
                  similars,
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
}
