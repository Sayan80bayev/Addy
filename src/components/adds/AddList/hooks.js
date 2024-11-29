import { useParams } from "react-router-dom";
import {
  // useGetByCatQuery,
  // useSearchByNameQuery,
  useGetAddsQuery,
  useGetSimilarsQuery,
} from "../../../store";

export const useAdvertisementsByCat = () => {
  // const { id } = useParams();
  // const {
  //   data: advertisements = [],
  //   isFetching,
  //   isError,
  // } = useGetByCatQuery(id);
  // return { advertisements, isFetching, isError };
};

export const useAdvertisementsByName = () => {
  // const { name } = useParams();
  // const { data: advertisements, isFetching } = useSearchByNameQuery(name);
  // return { advertisements, isFetching };
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
