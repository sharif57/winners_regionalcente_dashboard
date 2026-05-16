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
    createProjectInvestment: builder.mutation({
      query: (data) => ({
        url: `/investments/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Evaluation"],
  }),
  // /admin/user-agreements/
    userAgreements: builder.query({
      query: (params) => ({
        url: `/admin/user-agreements/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Evaluation"],
    }),

    // /admin/agreement-steps/<<id>>/review/
    reviewAgreementStep: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/agreement-steps/${id}/review/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Evaluation"],
    }),

    // /admin/user-agreements/1/
    agreementDetails: builder.query({
      query: (id) => ({
        url: `/admin/user-agreements/${id}/`,
        method: "GET",
      }),
      providesTags: ["Evaluation"],
  }),

//   PATCH
// /api/v1/admin/user-agreements/step/{id}/review/
  UserAgreementStepReview: builder.mutation({
    query: ({ id, data }) => ({
      url: `/admin/user-agreements/step/${id}/review/`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["Evaluation"],
  }),

  // /admin/agreement-forms/
    agreementForms: builder.query({
      query: (params) => ({
        url: `/admin/agreement-forms/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Evaluation"],
  }),

  createAgreementForm: builder.mutation({
    query: (data) => ({
      url: `/admin/agreement-forms/`,
      method: "POST",
      body: data,
      formData: true,
    }),
    invalidatesTags: ["Evaluation"],
  }),

  updateAgreementForm: builder.mutation({
    query: ({ id, data }) => ({
      url: `/admin/agreement-forms/${id}/`,
      method: "PATCH",
      body: data,
      formData: true,
    }),
    invalidatesTags: ["Evaluation"],
  }),

  deleteAgreementForm: builder.mutation({
    query: (id) => ({
      url: `/admin/agreement-forms/${id}/`,
      method: "DELETE",
    }),
    invalidatesTags: ["Evaluation"],
  }),

  // /evaluation-requests/
  getEvaluationRequestsList: builder.query({
    query: (params) => ({
      url: `/evaluation-requests/`,
      method: "GET",
      params: params ?? undefined,
    }),
    providesTags: ["Evaluation"],
  }),

  // /evaluation-requests/<<id>>/
  approvedEvaluationRequest: builder.mutation({
    query: ({ id, data }) => ({
      url: `/evaluation-requests/${id}/`,
      method: "PATCH",
      body: data,
    }),
    invalidatesTags: ["Evaluation"],
  }),

  

  }),
});

export const {
  useSendEvaluationRequestMutation,
  useGetUserDashboardQuery,
  useCreateProjectInvestmentMutation,
  useUserAgreementsQuery,
  useReviewAgreementStepMutation,
  useAgreementDetailsQuery,
  useUserAgreementStepReviewMutation,
  useAgreementFormsQuery,
  useCreateAgreementFormMutation,
  useUpdateAgreementFormMutation,
  useDeleteAgreementFormMutation,
  useGetEvaluationRequestsListQuery,
  useApprovedEvaluationRequestMutation,
} = settingSlice;
