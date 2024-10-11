import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../API_KEY";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_KEY}/api/v1/user`,
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
        url: "/?email=" + email,
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
      query: (id) => ({
        url: "?email=" + id,
        method: "DELETE",
      }),
      invalidateTags: ["User"],
    }),

    updateUser: build.mutation({
      query: (formData) => ({
        url: "/",
        method: "PUT",
        body: formData,
      }),
      invalidateTags: ["User"],
    }),

    updateAvatar: build.mutation({
      query: (avatar) => ({
        url: "/avatar",
        method: "PUT",
        body: avatar,
      }),
      invalidateTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
} = profileApi;
