import React from "react";
import { useParams } from "react-router-dom";
import LoadingIcon from "../LoadingIcon";
import { useGetByCatQuery } from "../../store";
import Adds from "./Adds";
import NotFound from "../feedback/NotFound";

function AdvertisementList() {
  const { id } = useParams();
  const {
    data: advertisements = [],
    isFetching,
    isError,
  } = useGetByCatQuery(id);
  console.log(isError);
  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
      {(isError || advertisements.length == 0) && !isFetching && <NotFound />}
    </>
  );
}

export default AdvertisementList;
