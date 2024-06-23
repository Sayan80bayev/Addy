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
          url: "api/v1/public/postAdd",
          method: "POST",
          body: newAdd,
        };
      },
      invalidatesTags: [{ type: "Advertisements", id: "LIST" }],
    }),
  }),
});

export const { useGetAddsQuery } = advertisementApi;
