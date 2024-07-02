import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../style/FullAdd.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
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
  const baseAdds = useSelector(
    (state) => state.advertisementApi.queries["getAdds(undefined)"]?.data || []
  );
  const baseAdd = baseAdds.find((ad) => ad.id == id);
  console.log(baseAdd);
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
    isUninitialized: simillarUnitialized,
  } = useGetSimilarsQuery(
    {
      addId: baseAdd.id,
      catId: baseAdd.category.category_id,
      price: baseAdd.price,
    },
    {
      skip: !baseAdd.id,
      refetchOnMountOrArgChange: true,
    }
  );
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
  useEffect(() => {
    if (message) {
      const newState = { ...location.state };
      delete newState.message;
      delete newState.status;
      window.history.replaceState(newState, "");
    }
    console.log(location.state);
  }, [message, location.state]);
  const base64ToUrl = (base64) => `data:image/jpeg;base64,${base64}`;

  const isPageFetched = addSuccess && similarSuccess && userSuccess;
  const isPageFound = !addError && !similarsError && !userError;

  return (
    <main>
      {message &&
        (message?.status === "success" ? (
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
