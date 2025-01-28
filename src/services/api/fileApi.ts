import { apiSlice } from "../apiSlice";

const fileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendFile: builder.mutation({
      query: (body) => ({
        url: `/file/upload`,
        method: "POST",
        body
      }),
    }),
  }),
});

export const { useSendFileMutation } = fileApi;
