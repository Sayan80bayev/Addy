import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { findSimilars } from "../api";
import Adds from "./Adds";

function SimilarAdds() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id, cat_id, price } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await findSimilars(cat_id, price, id);
        setAdvertisements(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, cat_id, price]);

  return (
    <>
      {loading && <LoadingIcon />}
      <Adds advertisements={advertisements} />
    </>
  );
}

export default SimilarAdds;
