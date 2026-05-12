import baseApi from "../Api/baseApi";


const settingSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // /evaluation-requests/
    sendEvaluationRequest: builder.mutation({
      query: (data) => ({
        url: `/evaluation-requests/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Evaluation"],
    }),

    // /user-dashboard/
    getUserDashboard: builder.query({
      query: () => ({
        url: `/user-dashboard/`,
        method: "GET",
      }),
      providesTags: ["Evaluation"],
    }),

    // /investments/
    projectInvestments: builder.mutation({
      query: (data) => ({
        url: `/investments/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Evaluation"],
  }),

  }),
});

export const {
  useSendEvaluationRequestMutation,
  useGetUserDashboardQuery,
  useProjectInvestmentsMutation,
} = settingSlice;
