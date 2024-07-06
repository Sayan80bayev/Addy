import React from "react";
import LoadingIcon from "../../LoadingIcon";
import Adds from "./Adds";
import { useSimilarAdvertisements } from "./hooks";

export const SimilarAdds = () => {
  const { advertisements, isFetching } = useSimilarAdvertisements();

  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
};
