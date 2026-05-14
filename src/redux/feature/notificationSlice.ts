import baseApi from "../Api/baseApi";



const projectSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // /notification/my/
    notificationList: builder.query({
        query: (params) => ({
            url: `/notification/my/`,
            method: "GET",
            params: params ?? undefined,
        }),
        providesTags: ["Notification"],
    }),

    // /notification/send/
    sendNotification: builder.mutation({
        query: (data) => ({
            url: `/notification/send/`,
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["Notification"],
    }),

    // /support-queries/?ordering=-updated_at
    supportQueries: builder.query({
        query: (params) => ({
            url: `/support/admin/queries/`,
            method: "GET",
            params: { ...params, ordering: "-created_at" },
        }),
        providesTags: ["SupportQuery"],
    }),

  }),
});

export const {
    useNotificationListQuery,
    useSendNotificationMutation,
    useSupportQueriesQuery,
} = projectSlice;
