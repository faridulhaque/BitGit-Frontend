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

    getCoins: builder.query({
      query: () => ({
        url: `/coin/many?page=${1}&count=${8}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateCoinMutation, useGetCoinsQuery } = coinApi;
