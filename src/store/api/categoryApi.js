import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reduserPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
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
        url: "/api/v1/public/getCats",
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
        url: "/api/cat/add",
        body: category,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    addCategoryWithParent: build.mutation({
      query: (category, parentId) => ({
        url: `/${parentId}/subcategories`,
        body: category,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
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
