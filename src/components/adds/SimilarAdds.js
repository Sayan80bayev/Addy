import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { findSimilars } from "../api";
import Adds from "./Adds";
import { useGetSimilarsQuery } from "../../store";

function SimilarAdds() {
  const { id, cat_id, price } = useParams();
  const { data: advertisements = [], isFetching } = useGetSimilarsQuery({
    catId: cat_id,
    price: price,
    addId: id,
  });

  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
}

export default SimilarAdds;
