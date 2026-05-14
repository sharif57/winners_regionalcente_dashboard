import baseApi from "../Api/baseApi";

export interface SupportPaginationParams {
  page?: number;
  page_size?: number;
}

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

// /support/admin/queries/1/reply/
    submitSupportMessage: builder.mutation({
      query: ({ id, message }) => ({
        url: `/support/admin/queries/${id}/reply/`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["Support"],
    }),    

    allSupportMessages: builder.query({
      query: (params: SupportPaginationParams = {}) => ({
        url: "/support/admin/queries/",
        method: "GET",
        params: {
          page: params.page ?? 1,
          page_size: params.page_size ?? 20,
        },
      }),
      providesTags: ["Support"],
    }),
  
   
  }), 
});

export const {
  useSubmitSupportMessageMutation,
    useAllSupportMessagesQuery,
} = supportApi;
