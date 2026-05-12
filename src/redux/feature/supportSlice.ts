import baseApi from "../Api/baseApi";


const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

// /api/v1/support/queries/
    submitSupportMessage: builder.mutation({
      query: (payload: { subject: string; message: string }) => ({
        url: "/support/queries/",   
        method: "POST",
        body: payload,
        }),
         invalidatesTags: ["Support"],
    }),

    allSupportMessages: builder.query({
      query: () => ({
        url: "/support/queries/",
        method: "GET",
      }),
      providesTags: ["Support"],
    }),
  
   
  }),
});

export const {
  useSubmitSupportMessageMutation,
    useAllSupportMessagesQuery,
} = supportApi;
