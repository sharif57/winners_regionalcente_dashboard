import baseApi from "../Api/baseApi";

export interface SettingsData {
  id: number;
  about_us: string;
  legal_privacy_policy: string;
  legal_terms_of_use_policy: string;
  contact_email: string;
  contact_phone: string;
  office_address: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
  youtube_url: string;
  tiktok_url: string;
}

export interface SettingsResponse {
  status: string;
  code: number;
  message: string;
  data: SettingsData;
}

const settingSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // /business-setting/
    businessSetting: builder.query({
      query: () => ({
        url: `/business-setting/`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

    // /notifications/
    allNotifications: builder.query({
      query: (params: { page?: number } = {}) => ({
        url: `/notifications/`,
        method: "GET",
        params: {
          page: params.page ?? 1,
        },
      }),
      providesTags: ["Setting"],
    }),

    // /setting/ - Get settings (About Us, Terms, Contact, Social Media)
    getSettings: builder.query<SettingsResponse, void>({
      query: () => ({
        url: `/business-setting/`,
        method: "GET",
      }),
      providesTags: ["Setting"],
    }),

  }),
});

export const {
  useBusinessSettingQuery,
  useAllNotificationsQuery,
  useGetSettingsQuery,
} = settingSlice;
