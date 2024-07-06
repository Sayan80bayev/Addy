import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetByCatQuery,
  useSearchByNameQuery,
  useGetAddsQuery,
  useGetSortedByQuery,
  useGetSimilarsQuery,
} from "../../../store";

export const useAdvertisementsByCat = () => {
  const { id } = useParams();
  const {
    data: advertisements = [],
    isFetching,
    isError,
  } = useGetByCatQuery(id);
  return { advertisements, isFetching, isError };
};

export const useAdvertisementsByName = () => {
  const { name } = useParams();
  const { data: advertisements, isFetching } = useSearchByNameQuery(name);
  return { advertisements, isFetching };
};

export const useAdvertisementsSorted = () => {
  const [sortCriteria, setSortCriteria] = useState(null);
  const { data: advertisements = [], isFetching: isFetchingAdds } =
    useGetAddsQuery();
  const {
    data: sortedAdvertisements = [],
    isFetching: isFetchingSorted,
    refetch: refetchSorted,
  } = useGetSortedByQuery(sortCriteria, { skip: sortCriteria === null });

  useEffect(() => {
    if (sortCriteria !== null) {
      refetchSorted();
    }
  }, [sortCriteria, refetchSorted]);

  const isFetching = sortCriteria !== null ? isFetchingSorted : isFetchingAdds;
  const adsToDisplay =
    sortCriteria !== null ? sortedAdvertisements : advertisements;

  return { adsToDisplay, isFetching, setSortCriteria };
};

export const useSimilarAdvertisements = () => {
  const { id, cat_id, price } = useParams();
  const { data: advertisements = [], isFetching } = useGetSimilarsQuery({
    catId: cat_id,
    price: price,
    addId: id,
  });
  return { advertisements, isFetching };
};
