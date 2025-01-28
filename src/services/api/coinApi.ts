import { apiSlice } from "../apiSlice";

const coinApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCoin: builder.mutation({
      query: (body) => ({
        url: `/coin/create`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCoinMutation } = coinApi;
