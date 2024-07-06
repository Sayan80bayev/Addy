import React from "react";
import LoadingIcon from "../../LoadingIcon";
import Adds from "./Adds";
import NotFound from "../../feedback/NotFound";
import { useAdvertisementsByCat } from "./hooks";
export const AdvertisementListByCat = () => {
  const { advertisements, isFetching, isError } = useAdvertisementsByCat();

  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
      {(isError || advertisements.length === 0) && !isFetching && <NotFound />}
    </>
  );
};
