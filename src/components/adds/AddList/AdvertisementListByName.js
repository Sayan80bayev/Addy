import LoadingIcon from "../../LoadingIcon";
import Adds from "./Adds";
import { useAdvertisementsByName } from "./hooks";
export const AdvertisementListByName = () => {
  const { advertisements, isFetching } = useAdvertisementsByName();

  return (
    <>
      {isFetching ? <LoadingIcon /> : <Adds advertisements={advertisements} />}
    </>
  );
};
