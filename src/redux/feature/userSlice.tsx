"use client";

import baseApi from "../Api/baseApi";

export interface AppUser {
  id: string | number;
  created_at?: string;
  updated_at?: string;
  name: string;
  password?: string;
  email: string;
  phone?: string | null;
  role?: string;
  image?: string;
  profile_image?: string;
  gender?: string;
  google_id?: string;
  facebook_id?: string;
  apple_id?: string;
  online?: boolean;
  is_deleted?: boolean;
  is_verified?: boolean;
  document?: string;
  auth_is_reset_password?: boolean;
  auth_one_time_code?: string | number | null;
  auth_expire_at?: string | null;
  current_address?: string;
  country?: string;
  date_of_birth?: string | null;
  is_email_verified?: boolean;
  is_active?: boolean;
  is_staff?: boolean;
  projects?: ApiUserProject[];
}

export interface ApiUserProject {
  id: number;
  name: string;
  banner: string;
  status: string;
  investment_amount: number;
  start_date: string;
  end_date: string;
}

export interface UserListItem {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  country: string;
  is_active: boolean;
  created_at: string;
}

export interface SingleUserResponse {
  status: string;
  code: number;
  message: string;
  data: AppUser;
}

export interface UsersMeta {
  count: number;
  page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
}

export interface AllUsersResponse {
  status: string;
  code: number;
  message: string;
  data: UserListItem[];
  errors: unknown;
  meta: UsersMeta;
}

export interface AllUsersQueryParams {
  search?: string;
  status?: boolean;
  role?: string;
  page?: number;
  page_size?: number;
}

export interface IncomeRecentTransaction {
  id: string;
  type: string;
  amount: string;
  category: string;
  notes: string;
  date: string;
  image: string;
  document: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface IncomeGrowthVsPreviousMonth {
  percentage: number;
  income: number;
}

export interface IncomeReportData {
  total_income: number;
  average_monthly_income: number;
  growth_vs_previous_month: IncomeGrowthVsPreviousMonth;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface IncomeReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: IncomeReportData;
}

export interface ExpenseGrowthVsPreviousMonth {
  percentage: number;
  expense: number;
}

export interface ExpenseReportData {
  total_expense: number;
  average_monthly_expense: number;
  growth_vs_previous_month: ExpenseGrowthVsPreviousMonth;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface ExpenseReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: ExpenseReportData;
}

export interface UserIncomeOverviewQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export interface UserExpenseOverviewQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export interface GlobalOverviewUser {
  name: string;
  email: string;
  image: string;
}

export interface GlobalMonthlyData {
  month: number;
  income: number;
  expense: number;
}

export interface GlobalFinancialOverviewData {
  total_revenue: number;
  total_expense: number;
  total_income: number;
  zakat_expense: number;
  monthly_data: GlobalMonthlyData[];
  recent_transactions: IncomeRecentTransaction[];
  meta?: UsersMeta;
}

export interface GlobalFinancialOverviewResponse {
  success: boolean;
  message: string;
  meta?: UsersMeta;
  data: GlobalFinancialOverviewData;
}

export interface ProfitLossYearlyMonthlyData {
  month: number;
  income: number;
  expense: number;
}

export interface ProfitLossCategoryWiseExpense {
  [key: string]: number;
}

export interface ProfitLossReportData {
  total_revenue: number;
  total_expense: number;
  total_income: number;
  net_profit_percentage: number;
  yearly_monthly_data: ProfitLossYearlyMonthlyData[];
  category_wise_expense: ProfitLossCategoryWiseExpense;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface ProfitLossReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: ProfitLossReportData;
}

export interface ProfitLossQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile/",
        method: "PATCH",
        body: data,
        // Don't set Content-Type so browser adds multipart/form-data boundary for FormData
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

    // /auth/users/
    allUsers: builder.query<AllUsersResponse, AllUsersQueryParams>({
      query: (params) => ({
        url: "/auth/users/",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),

    // /auth/users/9/
    singleUser: builder.query<SingleUserResponse, string>({
      query: (id) => ({
        url: `/auth/users/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // DELETE
    // /api/v1/auth/users/{id}/

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation, useAllUsersQuery, useSingleUserQuery, useDeleteUserMutation } = userApi;
