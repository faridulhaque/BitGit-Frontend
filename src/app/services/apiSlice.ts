import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baserUrl } from "./constant";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baserUrl,
    prepareHeaders: (headers) => {
      const token = process.env.NEXT_PUBLIC_SDK_KEY;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: () => ({}),
});
