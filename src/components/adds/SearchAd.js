import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Adds from "./Adds";
import LoadingIcon from "../LoadingIcon";
import { useSearchByNameQuery } from "../../store";

function AdvertisementList() {
  const { name } = useParams();
  const { data: advertisements, isFetching } = useSearchByNameQuery(name);

  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
}

export default AdvertisementList;
