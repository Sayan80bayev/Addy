// import React, { useState, useEffect } from "react";
// import LoadingIcon from "../../LoadingIcon";
// import Adds from "./Adds";
// import Sorting from "../../Sorting";
// import { useAdvertisementsSorted } from "./hooks";
// export const AdvertisementListSorted = () => {
//   const { adsToDisplay, isFetching, setSortCriteria } =
//     useAdvertisementsSorted();

//   return (
//     <>
//       <Sorting onSort={setSortCriteria} />
//       {isFetching ? <LoadingIcon /> : <Adds advertisements={adsToDisplay} />}
//     </>
//   );
// };
