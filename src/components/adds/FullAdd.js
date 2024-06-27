import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../style/FullAdd.css";
import Footer from "../Footer";
import { jwtDecode } from "jwt-decode";
import { fetchAddById, getUserByEmail } from "../api";
import { findSimilars } from "../api";
import { useLocation } from "react-router-dom";
import { useDeletePostMutation } from "../../store/api/advertismentApi";
import { useGetSimilarsQuery, useGetByIdQuery } from "../../store";
import AlertError from "../feedback/AlertError";
import AlertSuccess from "../feedback/AlertSuccess";
import AddInfo from "./fullAddComponents/AddInfo";
import AdditionaInfo from "./fullAddComponents/AdditionaInfo";
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
      setMessage(location.state);
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
        <AddInfo
          add={add}
          base64ToUrl={base64ToUrl}
          renderCategories={renderCategories}
        />
        <AdditionaInfo
          props={{ userData, add, similars, email, handleDelete, id }}
        />
      </div>
      <Footer />
    </main>
  );
}
