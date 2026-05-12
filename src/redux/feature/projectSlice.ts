import baseApi from "../Api/baseApi";

export interface ProjectListParams {
  page?: number;
  page_size?: number;
  status?: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  short_description: string;
  city: string;
  state: string;
  location: string;
  project_start_date: string;
  project_end_date: string;
  is_eb_5_enabled: boolean;
  total_project_value: string;
  minimum_investment: string;
  roi: string;
  job_impact: string;
  business_plan: string;
  financial_report: string;
  legal_document: string;
  agreement: string;
  banner: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectListMeta {
  count: number;
  page: number;
  page_size: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
}

export interface ProjectListResponse {
  status: string;
  code: number;
  message: string;
  data: ProjectItem[];
  errors: unknown;
  meta: ProjectListMeta;
}

export interface ProjectDetailsResponse {
  status: string;
  code: number;
  message: string;
  data: ProjectItem;
  errors: unknown;
}

export interface NotificationApiItem {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface NotificationListParams {
  page?: number;
  page_size?: number;
}

export interface NotificationListResponse {
  status: string;
  code: number;
  message: string;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: NotificationApiItem[];
  };
  errors: unknown;
}

const projectSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    projectList: builder.query<ProjectListResponse, ProjectListParams | void>({
      query: (params) => ({
        url: `/projects/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Project"],
    }),

    // /projects/4842/
    projectDetails: builder.query<ProjectDetailsResponse, number>({
      query: (id) => ({
        url: `/projects/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Project", id }],
    }),

    // /projects/my_projects/
    myProjects: builder.query<ProjectListResponse, ProjectListParams | void>({
      query: (params) => ({
        url: `/projects/my_projects/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Project"],
    }),

    // /notification/my/
    notificationList: builder.query<NotificationListResponse, NotificationListParams | void>({
      query: (params) => ({
        url: `/notification/my/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Notification"],
    }),

  }),
});

export const {
  useProjectListQuery,
  useProjectDetailsQuery,
  useMyProjectsQuery,
  useNotificationListQuery,
} = projectSlice;
