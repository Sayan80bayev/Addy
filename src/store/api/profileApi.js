import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/user",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],

  endpoints: (build) => ({
    getUser: build.query({
      query: (email) => ({
        url: "get/getUser?email=" + email,
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "User", id: result.id },
              { type: "User", id: "OBJECT" },
            ]
          : [{ type: "User", id: "OBJECT" }],
    }),

    deleteUser: build.mutation({
      query: (email) => ({
        url: "/delete?email=" + email,
        method: "DELETE",
      }),
      invalidateTags: ["User"],
    }),
    updateUser: build.mutation({
      query: (formData) => ({
        url: "/update",
        method: "PUT",
        body: formData,
      }),
      invalidateTags: ["User"],
    }),
  }),
});

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } =
  profileApi;
