import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../API_KEY";

export const advertisementApi = createApi({
  reducerPath: "advertisementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/api/v1/advertisements`,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Advertisements"],

  endpoints: (build) => ({
    getAdds: build.query({
      query: () => "/getAll",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Advertisements", id })),
              { type: "Advertisements", id: "LIST" },
            ]
          : [{ type: "Advertisements", id: "LIST" }],
    }),

    getById: build.query({
      query: (id) => ({
        url: `/add/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Advertisements", id: result.id },
              { type: "Advertisements", id: "LIST" }, // Add this line
            ]
          : [{ type: "Advertisements", id: "LIST" }],
    }),

    postAdds: build.mutation({
      query: (newAdd) => {
        return {
          url: "/",
          method: "POST",
          body: newAdd,
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),

    updatePost: build.mutation({
      query: ({ updatedAdd, id }) => {
        return {
          url: `/${id}`,
          method: "PUT",
          body: updatedAdd,
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),

    deletePost: build.mutation({
      query: (id) => {
        return {
          url: `/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),

    searchByName: build.query({
      query: (name) => {
        return {
          url: `/search/${name}`,
        };
      },
    }),

    getById: build.query({
      query: (id) => {
        return {
          url: `/add/${id}`,
        };
      },
    }),

    getByCategory: build.query({
      query: (id) => {
        return {
          url: `/category/${id}`,
        };
      },
    }),

    getSimilars: build.query({
      query: (catId, price, id) => {
        return {
          url: `/similars?cat=${catId}&price=${price}&id=${id}`,
        };
      },
    }),
  }),
});

export const {
  useGetAddsQuery,
  usePostAddsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetByIdQuery,
  useGetSimilarsQuery,
  useGetByCategoryQuery,
} = advertisementApi;
