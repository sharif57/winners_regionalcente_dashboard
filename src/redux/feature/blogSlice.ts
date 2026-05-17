import baseApi from "../Api/baseApi";


const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // /blogposts/
    getBlogList: builder.query({
      query: (params) => ({
        url: `/blogposts/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Blog"],
    }),

    // /blogposts/1/
    getBlogDetails: builder.query({
      query: (id) => ({
        url: `/blogposts/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),

    // /blogposts/
    createBlogPost: builder.mutation({
      query: (data) => ({
        url: `/blogposts/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    // /blogposts/1/
    updateBlogPost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogposts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),

    // /blogposts/1/
    deleteBlogPost: builder.mutation({
      query: (id) => ({
        url: `/blogposts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),

  }),
});

export const {
  useGetBlogListQuery,
  useGetBlogDetailsQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation
} = blogApi;
