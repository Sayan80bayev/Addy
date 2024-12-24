import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../API_KEY";

export const categoryApi = createApi({

  reduserPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/api/v1/categories`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Categories"],

  endpoints: (build) => ({
    getCats: build.query({
      query: () => ({
        url: "",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Categories", id })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),
    addCategory: build.mutation({
      query: (category) => ({
        url: "",
        body: category,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    addCategoryWithParent: build.mutation({
      query: (category) => ({
        url: `/subcategory`,
        body: category,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});
export const {
  useGetCatsQuery,
  useAddCategoryMutation,
  useAddCategoryWithParentMutation,
  useDeleteAddMutation,
} = categoryApi;
