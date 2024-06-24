import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authenticationApi = createApi({
  reducerPath: "authenticationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/auth/",
  }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),
    authenticateUser: build.mutation({
      query: (formData) => ({
        url: "authenticate",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useAuthenticateUserMutation } =
  authenticationApi;
