import { jwtDecode } from "jwt-decode";
import {
  useDeletePostMutation,
  useGetSimilarsQuery,
  useGetByIdQuery,
  useGetUserQuery,
} from "../../../store";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useFullAdd = (id) => {
  const [deletePost] = useDeletePostMutation();
  const location = useLocation();
  const [similarParams, setSimilarParams] = useState(
    location.state?.similarParams
  );
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
  const [addAuthor, setAddAuthor] = useState(location.state?.email);
  const navigate = useNavigate();
  const [message, setMessage] = useState(location.state?.message);

  const {
    data: userData,
    isFetching: userFetching,
    isSuccess: userSuccess,
    isError: userError,
  } = useGetUserQuery(addAuthor);

  useEffect(() => {
    if (message) {
      const newState = { ...location.state };
      delete newState.message;
      delete newState.status;
      window.history.replaceState(newState, "");
    }
  }, [message, location.state]);
  useEffect(() => {
    if (fullAdd) {
      setSimilarParams({
        addId: fullAdd.id,
        catId: fullAdd.category.category_id,
        price: fullAdd.price,
      });
      setAddAuthor(fullAdd.email);
    }
  }, [fullAdd]);
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

  return {
    fullAdd,
    similars,
    isPageFetched,
    isPageFound,
    handleDelete,
    message,
    email,
    similarsFetching,
    userData,
  };
};
