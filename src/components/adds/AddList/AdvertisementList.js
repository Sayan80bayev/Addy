import React, { useState, useEffect } from "react";
import LoadingIcon from "../../LoadingIcon";
import Adds from "./Adds";
import { useAdvertisements } from "./hooks";

export const AdvertisementList = () => {

  
  const { advertisements, isFetching } =
    useAdvertisements();

  
  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
};