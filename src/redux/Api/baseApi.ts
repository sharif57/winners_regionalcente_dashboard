import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { clearAuthStorage, notifyAuthLogout } from "@/lib/auth-storage";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // baseUrl: "https://enitiative.org/api",
  prepareHeaders: (headers) => {
    if (typeof window === "undefined") {
      return headers;
    }

    const token = localStorage.getItem("accessToken");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAutoLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (typeof window !== "undefined" && result.error?.status === 401) {
    clearAuthStorage();
    notifyAuthLogout();

    const isOnAuthRoute = window.location.pathname.startsWith("/auth/login");

    if (!isOnAuthRoute) {
      window.location.href = "/auth/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAutoLogout,
  tagTypes: [
    "User",
    "Evaluation",
    "Project",
    'Setting',
    'Notification',
    'Support',
    'Dashboard',
    'SupportQuery',
    'Blog',

  ],
  endpoints: () => ({}),
});

export default baseApi;
