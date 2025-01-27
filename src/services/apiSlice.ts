import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baserUrl } from "./constant";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baserUrl,
    prepareHeaders: (headers, {}) => {
      const token = localStorage.getItem("token");
      const clientId = process.env.NEXT_PUBLIC_CLIENT_API_KEY;
      if (token && clientId) {
        headers.set("authorization", token);
        headers.set(
          "x-api-key",
          process.env.NEXT_PUBLIC_CLIENT_API_KEY as string
        );
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: () => ({}),
});
