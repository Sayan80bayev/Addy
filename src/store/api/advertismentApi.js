import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const advertisementApi = createApi({
  reducerPath: "advertisementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
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
      query: () => "/api/v1/public/getAdds",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Advertisements", id })),
              { type: "Advertisements", id: "LIST" },
            ]
          : [{ type: "Advertisements", id: "LIST" }],
    }),

    postAdds: build.mutation({
      query: (newAdd) => {
        return {
          url: "/api/secured/create",
          method: "POST",
          body: newAdd,
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),

    updatePost: build.mutation({
      query: ({ updatedAdd, id }) => {
        return {
          url: `api/secured/edit/${id}`,
          method: "PUT",
          body: updatedAdd,
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),
    deletePost: build.mutation({
      query: (id) => {
        return {
          url: `api/secured/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAddsQuery,
  usePostAddsMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = advertisementApi;
