import baseApi from "../Api/baseApi";

export interface InvestorGrowth {
  labels: string[];
  data: number[];
}

export interface AdminDashboardData {
  total_users: number;
  total_projects: number;
  active_projects: number;
  pending_investments: number;
  pending_evaluations: number;
  total_investments: number;
  investor_growth: InvestorGrowth;
}

export interface AdminDashboardResponse {
  status: string;
  code: number;
  message: string;
  data: AdminDashboardData;
}

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // /admin/dashboard/
    getAdminDashboard: builder.query<AdminDashboardResponse, void>({
      query: () => ({
        url: `/admin/dashboard/`,
        method: "GET",
        }),
        providesTags: ["Dashboard"],
    }),

  }),
});

export const {
  useGetAdminDashboardQuery,
} = dashboardApi;
