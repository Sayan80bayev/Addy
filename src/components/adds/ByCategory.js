import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { fetchAdvertisementsByCat } from "../api";
import Adds from "./Adds";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setAdvertisements([]);
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchAdvertisementsByCat(id);
        if (response.data.length === 0) return navigate("/index");
        setAdvertisements(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading && <LoadingIcon />}
      <Adds advertisements={advertisements} />
    </>
  );
}

export default AdvertisementList;
