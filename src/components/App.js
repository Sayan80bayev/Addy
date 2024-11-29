import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import { FullAdd } from "./adds/FullAdd";
import {
  AdvertisementListByName,
  AdvertisementListByCat,
  AdvertisementListSorted,
  SimilarAdds,
} from "./adds/AddList";
import Home from "./Home";
import { AdvertisementForm } from "./adds/AddForm";
import Template from "./Template";
import CategoryControll from "./admin/CategoryControll";
import Profile from "./auth/Profile";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      element: <Template />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/newAdd",
          element: <AdvertisementForm isEditing={false} />,
        },
        {
          path: "/catControll",
          element: <CategoryControll />,
        },
        {
          path: "/edit/:id",
          element: <AdvertisementForm isEditing={true} />,
        },
        {
          path: "/view/:id",
          element: <FullAdd />,
        },
        {
          path: "/index",
          element: <Home />,
          children: [
            // {
            //   path: "/index",
            //   element: <AdvertisementListSorted />,
            // },
            {
              path: "/index/cat/:id",
              element: <AdvertisementListByCat />,
            },
            {
              path: "/index/search/:name",
              element: <AdvertisementListByName />,
            },
            // {
            //   path: "/index/similars/:id/:cat_id/:price",
            //   element: <SimilarAdds />,
            // },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}
