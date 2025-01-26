import { apiSlice } from "../apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: "POST",
        body,
      }),
    }),

    createUser: builder.mutation({
      query: (body) => ({
        url: `/user/create`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useCreateUserMutation } = authApi;
