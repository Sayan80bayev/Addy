import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import "../style/FullAdd.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { getUserByEmail } from "../api";
import { useDeletePostMutation } from "../../store/api/advertismentApi";
import {
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

export default function FullAdd() {
  const [deletePost] = useDeletePostMutation();
  const location = useLocation();
  const { id } = useParams();
  const {
    data: add,
    error: addError,
    isFetching: addFetching,
    isSuccess: addSuccess,
  } = useGetByIdQuery(id);

  const [similarParams, setSimilarParams] = useState({});
  const {
    data: similars,
    error: similarsError,
    isLoading: similarsLoading,
    isFetching: similarsFetching,
    isSuccess: similarSuccess,
    isUninitialized: simillarUnitialized,
  } = useGetSimilarsQuery(similarParams, {
    skip: !similarParams.catId, // Ensure proper skipping logic
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

  // Update similarParams only when add changes
  const isPageFetched = addSuccess && similarSuccess && userSuccess;
  const isPageFound = !addError && !similarsError && !userError;

  useEffect(() => {
    // return () => {
    if (add && add.category && add.price && add.id) {
      console.log(addSuccess);
      setSimilarParams({
        catId: add.category.category_id,
        price: add.price,
        addId: add.id,
      });
    }
    setMessage(location.state);
    // };
  }, [addSuccess]);

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
        (message?.status === "success" ? (
          <AlertSuccess message={message.message} />
        ) : (
          <AlertError message={message.message} />
        ))}
      {window.history.replaceState({}, "")}
      <div className="ctn-full mb-4">
        {isPageFound ? (
          isPageFetched ? (
            <>
              <AddInfo
                add={add}
                base64ToUrl={base64ToUrl}
                renderCategories={renderCategories}
              />
              <AdditionaInfo
                props={{ userData, add, similars, email, handleDelete, id }}
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
