import React from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { useGetByCatQuery } from "../../store";
import Adds from "./Adds";

function AdvertisementList() {
  const { id } = useParams();
  const { data: advertisements = [], isFetching } = useGetByCatQuery(id);

  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
}

export default AdvertisementList;
