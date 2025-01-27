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

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/update/${data.id}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: ["user"],
    }),

    fetchUser: builder.query({
      query: () => ({
        url: `/user`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useFetchUserQuery,
} = authApi;
