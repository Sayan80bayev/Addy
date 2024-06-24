import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/public",
  }),
  endpoints: (build) => ({
    searchByName: build.query({
      query: (name) => ({
        url: `search/${name}`,
      }),
    }),
    getByCat: build.query({
      query: (id) => ({
        url: `/cat/${id}`,
      }),
    }),
    getById: build.query({
      query: (id) => ({
        url: `/add/${id}`,
      }),
    }),
    getCategories: build.query({
      query: () => ({
        url: "getCats",
      }),
    }),
    getSimilars: build.query({
      query: ({ catId, price, addId }) => ({
        url: `getSimilars?cat=${catId}&price=${price}&id=${addId}`,
      }),
    }),
    getSortedBy: build.query({
      query: (id) => ({
        url: `/sort/${id}`,
      }),
    }),
  }),
});

export const {
  useGetByIdQuery,
  useGetSimilarsQuery,
  useGetByCatQuery,
  useGetCategoriesQuery,
  useGetSortedByQuery,
  useSearchByNameQuery,
} = mainApi;
