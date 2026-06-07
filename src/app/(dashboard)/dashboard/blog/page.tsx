// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Image from "next/image";
// import {
//     BriefcaseMedical,
//     CalendarDays,
//     Eye,
//     Loader2,
//     LucideIcon,
//     Pencil,
//     Plus,
//     Trash2,
//     X,
// } from "lucide-react";
// import Pagination from "@/components/dashboard/explore-project/Pagination";
// import { Button } from "@/components/ui/button";
// import {
//     useCreateBlogPostMutation,
//     useDeleteBlogPostMutation,
//     useGetBlogDetailsQuery,
//     useGetBlogListQuery,
//     useUpdateBlogPostMutation,
// } from "@/redux/feature/blogSlice";
// import { cn } from "@/lib/utils";

// const PAGE_SIZE = 6;

// type BlogPost = {
//     id: number;
//     title: string;
//     featured_image: string;
//     content: string;
//     created_at: string;
// };

// type BlogMeta = {
//     count?: number;
//     page?: number;
//     page_size?: number;
//     next?: string | null;
//     previous?: string | null;
//     total_pages?: number;
// };

// type BlogResponseShape = {
//     data?: unknown;
//     meta?: BlogMeta;
// };

// type BlogFormState = {
//     title: string;
//     featured_image: string;
//     featured_image_file: File | null;
//     content: string;
// };

// type ModalMode = "create" | "edit" | null;

// function normalizeBlogPost(record: unknown): BlogPost {
//     const blog = record as Record<string, unknown>;

//     return {
//         id: Number(blog.id ?? 0),
//         title: String(blog.title ?? "Untitled post"),
//         featured_image: String(blog.featured_image ?? blog.featuredImage ?? blog.image ?? "/image/background6.png"),
//         content: String(blog.content ?? ""),
//         created_at: String(blog.created_at ?? blog.createdAt ?? ""),
//     };
// }

// function extractBlogList(payload: unknown): BlogPost[] {
//     if (!payload) {
//         return [];
//     }

//     if (Array.isArray(payload)) {
//         return payload.map(normalizeBlogPost);
//     }

//     if (typeof payload !== "object") {
//         return [];
//     }

//     const response = payload as BlogResponseShape & Record<string, unknown>;
//     const data = response.data;

//     if (Array.isArray(data)) {
//         return data.map(normalizeBlogPost);
//     }

//     if (data && typeof data === "object") {
//         const nested = data as Record<string, unknown>;

//         if (Array.isArray(nested.results)) {
//             return nested.results.map(normalizeBlogPost);
//         }

//         return [normalizeBlogPost(data)];
//     }

//     if (Array.isArray(response.results)) {
//         return response.results.map(normalizeBlogPost);
//     }

//     return [];
// }

// function extractBlogMeta(payload: unknown): BlogMeta {
//     if (!payload || typeof payload !== "object") {
//         return {};
//     }

//     const response = payload as BlogResponseShape & Record<string, unknown>;

//     if (response.meta && typeof response.meta === "object") {
//         return response.meta;
//     }

//     const data = response.data;
//     if (data && typeof data === "object" && !Array.isArray(data)) {
//         const nested = data as Record<string, unknown>;
//         if (nested.meta && typeof nested.meta === "object") {
//             return nested.meta as BlogMeta;
//         }
//     }

//     return {};
// }

// function formatDate(value: string) {
//     if (!value) return "Just now";

//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) return value;

//     return new Intl.DateTimeFormat("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//     }).format(date);
// }

// function stripHtml(html: string) {
//     return html
//         .replace(/<[^>]*>/g, " ")
//         .replace(/&nbsp;/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
// }

// function excerptFromContent(html: string, maxLength = 170) {
//     const text = stripHtml(html);

//     if (text.length <= maxLength) {
//         return text;
//     }

//     return `${text.slice(0, maxLength).trimEnd()}...`;
// }

// function initialFormState(): BlogFormState {
//     return {
//         title: "",
//         featured_image: "",
//         featured_image_file: null,
//         content: "",
//     };
// }

// function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
//     return (
//         <div className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm">
//             <div className="flex items-center gap-3">
//                 <div className="flex size-11 items-center justify-center rounded-xl bg-[#FFF4F1] text-[#EA4335]">
//                     <Icon className="size-5" />
//                 </div>
//                 <div>
//                     <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#98A2B3]">{label}</p>
//                     <p className="mt-1 text-lg font-semibold text-[#101828]">{value}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function isFileLike(value: File | null): value is File {
//     return value instanceof File;
// }

// export default function Blog() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [mode, setMode] = useState<ModalMode>(null);
//     const [viewTargetId, setViewTargetId] = useState<number | null>(null);
//     const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [formState, setFormState] = useState<BlogFormState>(initialFormState());

//     const queryParams = useMemo(
//         () => ({
//             page: currentPage,
//             page_size: PAGE_SIZE,
//         }),
//         [currentPage]
//     );

//     const { data: blogPosts, isLoading: isBlogPostsLoading, isFetching: isBlogPostsFetching } = useGetBlogListQuery(queryParams);
//     const { data: blogDetails, isLoading: isBlogDetailsLoading } = useGetBlogDetailsQuery(viewTargetId ?? 0, {
//         skip: viewTargetId === null,
//     });

//     const [createBlogPost, { isLoading: isCreating }] = useCreateBlogPostMutation();
//     const [updateBlogPost, { isLoading: isUpdating }] = useUpdateBlogPostMutation();
//     const [deleteBlogPost, { isLoading: isDeleting }] = useDeleteBlogPostMutation();

//     const blogs = useMemo(() => extractBlogList(blogPosts), [blogPosts]);
//     const meta = useMemo(() => extractBlogMeta(blogPosts), [blogPosts]);

//     const totalPages = Math.max(1, meta.total_pages ?? Math.ceil((meta.count ?? blogs.length) / PAGE_SIZE));
//     const activePage = Math.min(meta.page ?? currentPage, totalPages);
//     const totalBlogs = meta.count ?? blogs.length;

//     const selectedBlog = useMemo(() => {
//         if (viewTargetId == null) return null;

//         const detailPayload = blogDetails as unknown;
//         const detailList = extractBlogList(detailPayload);
//         const detailCandidate = detailList[0] ?? null;

//         return detailCandidate ?? blogs.find((post) => post.id === viewTargetId) ?? null;
//     }, [blogDetails, blogs, viewTargetId]);

//     const editorTitle = mode === "create" ? "Create blog post" : "Update blog post";
//     const isEditorOpen = mode !== null;
//     const isBusy = isCreating || isUpdating || isDeleting;
//     const previewImageUrl = useMemo(() => {
//         if (isFileLike(formState.featured_image_file)) {
//             return URL.createObjectURL(formState.featured_image_file);
//         }

//         return formState.featured_image || "/image/background6.png";
//     }, [formState.featured_image, formState.featured_image_file]);

//     function openCreateModal() {
//         setMode("create");
//         setEditingId(null);
//         setFormState(initialFormState());
//     }

//     function openEditModal(post: BlogPost) {
//         setMode("edit");
//         setEditingId(post.id);
//         setFormState({
//             title: post.title,
//             featured_image: post.featured_image,
//             featured_image_file: null,
//             content: post.content,
//         });
//     }

//     function closeEditor() {
//         setMode(null);
//         setEditingId(null);
//     }

//     function openViewModal(id: number) {
//         setViewTargetId(id);
//     }

//     function closeViewModal() {
//         setViewTargetId(null);
//     }

//     function openDeleteModal(post: BlogPost) {
//         setDeleteTarget(post);
//     }

//     function closeDeleteModal() {
//         setDeleteTarget(null);
//     }

//     useEffect(() => () => {
//         if (previewImageUrl.startsWith("blob:")) {
//             URL.revokeObjectURL(previewImageUrl);
//         }
//     }, [previewImageUrl]);

//     async function handleSubmit() {
//         try {
//             const payload = new FormData();
//             payload.append("title", formState.title);
//             payload.append("content", formState.content);

//             if (isFileLike(formState.featured_image_file)) {
//                 payload.append("featured_image", formState.featured_image_file);
//             } else if (formState.featured_image) {
//                 payload.append("featured_image", formState.featured_image);
//             }

//             if (mode === "create") {
//                 await createBlogPost(payload).unwrap();
//             } else if (mode === "edit" && editingId !== null) {
//                 await updateBlogPost({ id: editingId, data: payload }).unwrap();
//             }

//             closeEditor();
//         } catch (error) {
//             console.error("Failed to save blog post:", error);
//         }
//     }

//     async function handleDelete() {
//         if (!deleteTarget) return;

//         try {
//             await deleteBlogPost(deleteTarget.id).unwrap();
//             closeDeleteModal();
//         } catch (error) {
//             console.error("Failed to delete blog post:", error);
//         }
//     }

//     const selectedBlogContent = selectedBlog?.content ?? "";

//     return (
//         <div className="mx-auto animate-in fade-in duration-700">
//             <div className="mb-8 overflow-hidden  border border-[#E4E7EC] bg-[linear-gradient(135deg,#0F172A_0%,#1E293B_50%,#EA4335_180%)] text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
//                 <div className="flex flex-col gap-6 px-6 py-6 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
//                     <div className="max-w-3xl space-y-4">
//                         <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
//                             Blog management
//                         </p>
//                         <div className="space-y-3">
//                             <h1 className="text-3xl font-semibold italic leading-tight md:text-4xl lg:text-5xl">Blog posts</h1>
//                             <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-base">
//                                 Create, update, publish, and remove blog content from one place. Each post supports rich HTML content, image previews, and paginated browsing.
//                             </p>
//                         </div>
//                     </div>

//                     <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
//                         <Button
//                             type="button"
//                             onClick={openCreateModal}
//                             className="h-12 rounded-none bg-white px-5 text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A] hover:bg-[#F8FAFC]"
//                         >
//                             <Plus className="mr-2 size-4" />
//                             Create Post
//                         </Button>
//                     </div>
//                 </div>

//                 <div className="grid gap-4 border-t border-white/10 px-6 py-5 md:grid-cols-3 md:px-8 lg:px-10">
//                     <StatCard icon={CalendarDays} label="Current page" value={`Page ${activePage}`} />
//                     <StatCard icon={Eye} label="Visible posts" value={`${blogs.length}`} />
//                     <StatCard icon={BriefcaseMedical} label="Total posts" value={`${totalBlogs}`} />
//                 </div>
//             </div>

//             <div className=" border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-6 lg:p-8">
//                 <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                     <div>
//                         <h2 className="text-xl font-semibold text-[#101828] md:text-2xl">All blog posts</h2>
//                         <p className="mt-1 text-sm text-[#667085]">Browse posts and use the action buttons to preview, edit, or delete content.</p>
//                     </div>
//                     <p className="text-sm text-[#667085]">
//                         Showing {blogs.length} of {totalBlogs}
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//                     {isBlogPostsLoading || isBlogPostsFetching
//                         ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
//                             <div key={`blog-skeleton-${index}`} className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-[#F9FAFB] shadow-sm">
//                                 <div className="h-56 animate-pulse bg-linear-to-br from-[#EEF2F6] to-[#E5E7EB]" />
//                                 <div className="space-y-4 p-5">
//                                     <div className="h-4 w-24 animate-pulse rounded-full bg-[#E5E7EB]" />
//                                     <div className="h-7 w-3/4 animate-pulse rounded-full bg-[#E5E7EB]" />
//                                     <div className="space-y-2">
//                                         <div className="h-3 w-full animate-pulse rounded-full bg-[#E5E7EB]" />
//                                         <div className="h-3 w-5/6 animate-pulse rounded-full bg-[#E5E7EB]" />
//                                         <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#E5E7EB]" />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                         : blogs.length === 0
//                             ? (
//                                 <div className="col-span-full rounded-[24px] border border-dashed border-[#EAECF0] bg-[#FAFAFA] px-6 py-16 text-center">
//                                     <p className="text-lg font-semibold text-[#101828]">No blog posts found</p>
//                                     <p className="mt-2 text-sm text-[#667085]">Create a new post to start publishing content.</p>
//                                     <Button type="button" onClick={openCreateModal} className="mt-6 rounded-none bg-[#EA4335] px-5 text-white hover:bg-[#C63428]">
//                                         <Plus className="mr-2 size-4" />
//                                         Create your first post
//                                     </Button>
//                                 </div>
//                             )
//                             : blogs.map((post) => (
//                                 <article
//                                     key={post.id}
//                                     className="group overflow-hidden  border border-[#EAECF0] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)]"
//                                 >
//                                     <div className="relative h-64 overflow-hidden bg-[#F2F4F7]">
//                                         <Image
//                                             src={post.featured_image || "/image/background6.png"}
//                                             alt={post.title}
//                                             fill
//                                             className="object-cover transition-transform duration-700 group-hover:scale-105"
//                                             unoptimized
//                                         />
//                                         <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
//                                         <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#101828] shadow-sm">
//                                             Blog post
//                                         </div>
//                                         <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
//                                             <CalendarDays className="size-3.5" />
//                                             {formatDate(post.created_at)}
//                                         </div>
//                                     </div>

//                                     <div className="space-y-5 p-5 md:p-6">
//                                         <div className="space-y-3">
//                                             <h3 className="text-xl font-semibold leading-snug text-[#101828] md:text-2xl">{post.title}</h3>
//                                             <p className="text-sm leading-7 text-[#667085]">{excerptFromContent(post.content)}</p>
//                                         </div>

//                                         <div className="rounded-2xl border border-[#EAECF0] bg-[#FCFCFD] px-4 py-3 text-sm text-[#344054]">
//                                             <span className="font-semibold text-[#101828]">Content:</span> {stripHtml(post.content).slice(0, 120) || "No content available."}
//                                         </div>

//                                         <div className="flex flex-col gap-3 sm:flex-row">
//                                             <button
//                                                 type="button"
//                                                 onClick={() => openViewModal(post.id)}
//                                                 className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] px-4 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB]"
//                                             >
//                                                 View
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => openEditModal(post)}
//                                                 className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#B8D4FF] bg-[#F5F9FF] px-4 text-sm font-medium text-[#175CD3] transition-colors hover:bg-[#EAF2FF]"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => openDeleteModal(post)}
//                                                 className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#F1B8B8] bg-[#FFF5F5] px-4 text-sm font-medium text-[#F65353] transition-colors hover:bg-[#FFE9E9]"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </article>
//                             ))}
//                 </div>

//                 <Pagination
//                     currentPage={activePage}
//                     totalPages={totalPages}
//                     onPageChange={setCurrentPage}
//                     disabled={isBlogPostsLoading || isBlogPostsFetching}
//                 />
//             </div>

//             {isEditorOpen ? (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
//                     <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden  border border-[#E4E7EC] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
//                         <div className="flex items-start justify-between gap-4 border-b border-[#EAECF0] px-6 py-5 md:px-8">
//                             <div>
//                                 <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#98A2B3]">Blog editor</p>
//                                 <h3 className="mt-2 text-2xl font-semibold text-[#101828]">{editorTitle}</h3>
//                                 <p className="mt-2 text-sm text-[#667085]">Fill in the fields on the left and preview the rendered result on the right.</p>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={closeEditor}
//                                 className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
//                                 aria-label="Close editor"
//                                 disabled={isBusy}
//                             >
//                                 <X className="size-5" />
//                             </button>
//                         </div>

//                         <div className="grid flex-1 overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
//                             <div className="overflow-y-auto px-6 py-6 md:px-8">
//                                 <div className="grid gap-4">
//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium text-[#344054]">Title</label>
//                                         <input
//                                             value={formState.title}
//                                             onChange={(e) => setFormState((state) => ({ ...state, title: e.target.value }))}
//                                             placeholder="Enter post title"
//                                             className="h-12 w-full rounded-xl border border-[#D0D5DD] px-4 text-sm text-[#101828] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#EA4335]"
//                                         />
//                                     </div>

//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium text-[#344054]">Featured image upload</label>
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => {
//                                                 const file = e.target.files?.[0] ?? null;
//                                                 setFormState((state) => ({
//                                                     ...state,
//                                                     featured_image_file: file,
//                                                     featured_image: file ? state.featured_image : state.featured_image,
//                                                 }));
//                                             }}
//                                             className="block w-full rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-4 py-3 text-sm text-[#101828] outline-none transition-colors file:mr-4 file:rounded-lg file:border-0 file:bg-[#F9FAFB] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#344054] hover:border-[#EA4335]"
//                                         />
//                                         <p className="text-xs leading-5 text-[#667085]">Upload a new image file. If no file is selected, the existing image URL remains in use.</p>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <label className="text-sm font-medium text-[#344054]">Content HTML</label>
//                                         <textarea
//                                             value={formState.content}
//                                             onChange={(e) => setFormState((state) => ({ ...state, content: e.target.value }))}
//                                             placeholder="Paste rich HTML content here"
//                                             className="min-h-80 w-full rounded-xl border border-[#D0D5DD] px-4 py-3 text-sm leading-7 text-[#101828] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#EA4335]"
//                                         />
//                                         <p className="text-xs leading-5 text-[#667085]">The API accepts HTML content, so you can paste formatted blog markup directly.</p>
//                                     </div>
//                                 </div>

//                                 <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//                                     <button
//                                         type="button"
//                                         onClick={closeEditor}
//                                         disabled={isBusy}
//                                         className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D0D5DD] px-5 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
//                                     >
//                                         Cancel
//                                     </button>
//                                     <button
//                                         type="button"
//                                         onClick={handleSubmit}
//                                         disabled={isBusy || !formState.title.trim() || !formState.content.trim()}
//                                         className={cn(
//                                             "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70",
//                                             mode === "create" ? "bg-[#EA4335] hover:bg-[#C63428]" : "bg-[#175CD3] hover:bg-[#1248a7]"
//                                         )}
//                                     >
//                                         {isBusy ? <Loader2 className="size-4 animate-spin" /> : mode === "create" ? <Plus className="size-4" /> : <Pencil className="size-4" />}
//                                         {isBusy ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="border-t border-[#EAECF0] bg-[#F9FAFB] lg:border-l lg:border-t-0">
//                                 <div className="sticky top-0 h-full overflow-y-auto p-6 md:p-8">
//                                     <div className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-white shadow-sm">
//                                         <div className="relative h-64 bg-[#F2F4F7]">
//                                             <Image
//                                                 src={previewImageUrl}
//                                                 alt={formState.title || "Blog preview"}
//                                                 fill
//                                                 className="object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                         <div className="space-y-4 p-5 md:p-6">
//                                             <div>
//                                                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Preview</p>
//                                                 <h4 className="mt-2 text-2xl font-semibold leading-tight text-[#101828]">{formState.title || "Untitled post"}</h4>
//                                                 <p className="mt-2 text-sm text-[#667085]">{formState.content ? excerptFromContent(formState.content, 220) : "Your rendered HTML preview will appear here."}</p>
//                                             </div>

//                                             <div
//                                                 className="prose max-w-none prose-headings:font-semibold prose-p:leading-7 prose-li:leading-7 prose-blockquote:border-l-4 prose-blockquote:border-[#EA4335] prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-2xl prose-img:shadow-sm"
//                                                 dangerouslySetInnerHTML={{ __html: formState.content || "<p>Your blog HTML preview will appear here.</p>" }}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : null}

//             {viewTargetId !== null ? (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
//                     <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden  border border-[#E4E7EC] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
//                         <div className="flex items-start justify-between gap-4 border-b border-[#EAECF0] px-6 py-5 md:px-8">
//                             <div>
//                                 <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#98A2B3]">Blog details</p>
//                                 <h3 className="mt-2 text-2xl font-semibold text-[#101828]">{selectedBlog?.title ?? "Loading post..."}</h3>
//                                 <p className="mt-2 text-sm text-[#667085]">Read the full article and jump straight to edit or delete actions if needed.</p>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={closeViewModal}
//                                 className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
//                                 aria-label="Close blog details"
//                             >
//                                 <X className="size-5" />
//                             </button>
//                         </div>

//                         <div className="overflow-y-auto px-6 py-6 md:px-8">
//                             {isBlogDetailsLoading && !selectedBlog ? (
//                                 <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#D0D5DD] bg-[#F9FAFB] px-4 py-8 text-sm text-[#667085]">
//                                     <Loader2 className="size-4 animate-spin" />
//                                     Loading blog content...
//                                 </div>
//                             ) : selectedBlog ? (
//                                 <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//                                     <div className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-[#F9FAFB]">
//                                         <div className="relative h-72 bg-[#F2F4F7]">
//                                             <Image
//                                                 src={selectedBlog.featured_image || "/image/background6.png"}
//                                                 alt={selectedBlog.title}
//                                                 fill
//                                                 className="object-cover"
//                                                 unoptimized
//                                             />
//                                         </div>
//                                         <div className="space-y-4 p-6">
//                                             <div className="flex flex-wrap items-center gap-3 text-sm text-[#667085]">
//                                                 <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium text-[#344054] shadow-sm">
//                                                     <CalendarDays className="size-3.5" />
//                                                     {formatDate(selectedBlog.created_at)}
//                                                 </span>
//                                                 <span className="inline-flex items-center rounded-full bg-[#FFF4F1] px-3 py-1 font-medium text-[#EA4335]">
//                                                     ID #{selectedBlog.id}
//                                                 </span>
//                                             </div>

//                                             <h4 className="text-2xl font-semibold leading-tight text-[#101828] md:text-3xl">{selectedBlog.title}</h4>
//                                             <p className="text-sm leading-7 text-[#667085]">
//                                                 {excerptFromContent(selectedBlog.content, 260)}
//                                             </p>

//                                             <div className="flex flex-col gap-3 sm:flex-row">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => {
//                                                         openEditModal(selectedBlog);
//                                                         closeViewModal();
//                                                     }}
//                                                     className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1248a7]"
//                                                 >
//                                                     <Pencil className="size-4" />
//                                                     Edit post
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => {
//                                                         openDeleteModal(selectedBlog);
//                                                         closeViewModal();
//                                                     }}
//                                                     className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#F1B8B8] bg-[#FFF5F5] px-4 text-sm font-medium text-[#F65353] transition-colors hover:bg-[#FFE9E9]"
//                                                 >
//                                                     <Trash2 className="size-4" />
//                                                     Delete post
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="rounded-[24px] border border-[#EAECF0] bg-white p-6 shadow-sm">
//                                         <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Rendered content</p>
//                                         <div
//                                             className="prose mt-4 max-w-none prose-headings:font-semibold prose-p:leading-7 prose-li:leading-7 prose-blockquote:border-l-4 prose-blockquote:border-[#EA4335] prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-2xl prose-img:shadow-sm"
//                                             dangerouslySetInnerHTML={{ __html: selectedBlogContent || "<p>No content available.</p>" }}
//                                         />
//                                     </div>
//                                 </div>
//                             ) : null}
//                         </div>
//                     </div>
//                 </div>
//             ) : null}

//             {deleteTarget ? (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
//                     <div className="w-full max-w-md rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
//                         <div className="flex items-start justify-between gap-4">
//                             <div className="space-y-2">
//                                 <div className="flex size-12 items-center justify-center rounded-full bg-[#FFF1F1] text-[#F65353]">
//                                     <Trash2 className="size-6" />
//                                 </div>
//                                 <h2 className="text-xl font-semibold text-[#101828]">Delete blog post</h2>
//                                 <p className="text-sm leading-6 text-[#667085]">
//                                     Are you sure you want to delete <span className="font-semibold text-[#101828]">{deleteTarget.title}</span>? This action cannot be undone.
//                                 </p>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={closeDeleteModal}
//                                 className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
//                                 aria-label="Close delete dialog"
//                                 disabled={isDeleting}
//                             >
//                                 <X className="size-5" />
//                             </button>
//                         </div>

//                         <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//                             <button
//                                 type="button"
//                                 onClick={closeDeleteModal}
//                                 disabled={isDeleting}
//                                 className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D0D5DD] px-5 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={handleDelete}
//                                 disabled={isDeleting}
//                                 className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F65353] px-5 text-sm font-medium text-white transition-colors hover:bg-[#E54848] disabled:cursor-not-allowed disabled:opacity-70"
//                             >
//                                 {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
//                                 {isDeleting ? "Deleting..." : "Delete post"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             ) : null}
//         </div>
//     );
// }

"use client";

import { useEffect, useMemo, useRef, useCallback, useState } from "react";
import Image from "next/image";
import {
    BriefcaseMedical,
    CalendarDays,
    Eye,
    Loader2,
    LucideIcon,
    Pencil,
    Plus,
    Trash2,
    X,
} from "lucide-react";
import Pagination from "@/components/dashboard/explore-project/Pagination";
import { Button } from "@/components/ui/button";
import {
    useCreateBlogPostMutation,
    useDeleteBlogPostMutation,
    useGetBlogDetailsQuery,
    useGetBlogListQuery,
    useUpdateBlogPostMutation,
} from "@/redux/feature/blogSlice";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

// ─── Types ────────────────────────────────────────────────────────────────────

type BlogPost = {
    id: number;
    title: string;
    featured_image: string;
    content: string;
    created_at: string;
};

type BlogMeta = {
    count?: number;
    page?: number;
    page_size?: number;
    next?: string | null;
    previous?: string | null;
    total_pages?: number;
};

type BlogResponseShape = {
    data?: unknown;
    meta?: BlogMeta;
};

type BlogFormState = {
    title: string;
    featured_image: string;
    featured_image_file: File | null;
    content: string;
};

type BlogFormSnapshot = Pick<BlogFormState, "title" | "featured_image" | "content">;

type ModalMode = "create" | "edit" | null;

// ─── Quill Rich Text Editor ───────────────────────────────────────────────────

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

const QUILL_STYLES = `
.ql-toolbar.ql-snow {
    border: none !important;
    border-bottom: 1px solid #E8E8E8 !important;
    background: #F7F8FA;
    padding: 10px 14px !important;
    flex-wrap: wrap;
    gap: 4px;
}
.ql-container.ql-snow {
    border: none !important;
    font-family: inherit;
}
.ql-editor {
    min-block-size: 280px !important;
    max-block-size: 420px !important;
    overflow-y: auto !important;
    font-size: 15px !important;
    line-height: 1.8 !important;
    color: #3A3A3A !important;
    padding: 18px 22px !important;
}
.ql-editor.ql-blank::before {
    color: #BBBBBB !important;
    font-style: normal !important;
    font-size: 14px !important;
}
.ql-snow .ql-stroke { stroke: #6C6C6C; }
.ql-snow .ql-fill { fill: #6C6C6C; }
.ql-snow .ql-picker { color: #6C6C6C; }
.ql-snow.ql-toolbar button:hover .ql-stroke,
.ql-snow .ql-toolbar button:hover .ql-stroke { stroke: #EA4335 !important; }
.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill { fill: #EA4335 !important; }
.ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #EA4335 !important; }
.ql-snow.ql-toolbar button.ql-active .ql-fill { fill: #EA4335 !important; }
.ql-snow .ql-picker-label:hover { color: #EA4335 !important; }
.ql-snow .ql-picker.ql-expanded .ql-picker-label { color: #EA4335 !important; }
.ql-snow .ql-picker-options {
    background: #FFFFFF !important;
    border: 1px solid #E0E0E0 !important;
    border-radius: 6px !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
}
.ql-snow .ql-picker-item:hover { color: #EA4335 !important; }
.ql-formats { margin-right: 10px !important; }
.ql-editor h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
.ql-editor h2 { font-size: 20px; font-weight: 600; margin-bottom: 6px; }
.ql-editor h3 { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
.ql-editor p { margin-bottom: 10px; }
.ql-editor ul, .ql-editor ol { padding-left: 20px; margin-bottom: 10px; }
.ql-editor blockquote {
    border-left: 3px solid #EA4335;
    padding-left: 14px;
    color: #666;
    font-style: italic;
    margin: 12px 0;
}
.ql-editor a { color: #EA4335; text-decoration: underline; }
.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
.ql-snow .ql-color-picker .ql-picker-item:hover { border-color: #EA4335 !important; }
`;

let quillStylesInjected = false;
let quillScriptLoaded = false;

function injectQuillAssets(callback: () => void) {
    if (!document.getElementById("quill-snow-css")) {
        const link = document.createElement("link");
        link.id = "quill-snow-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
        document.head.appendChild(link);
    }
    if (!quillStylesInjected) {
        const style = document.createElement("style");
        style.id = "quill-custom-styles";
        style.textContent = QUILL_STYLES;
        document.head.appendChild(style);
        quillStylesInjected = true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Quill) {
        callback();
        return;
    }
    if (quillScriptLoaded) {
        const interval = setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).Quill) {
                clearInterval(interval);
                callback();
            }
        }, 50);
        return;
    }
    quillScriptLoaded = true;
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js";
    script.onload = callback;
    document.head.appendChild(script);
}

function RichTextEditor({ value, onChange, placeholder = "Start writing here..." }: RichTextEditorProps) {
    // mountRef points to the stable wrapper div that Quill will own
    const mountRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quillRef = useRef<any>(null);
    // Tracks whether THIS instance has already initialised Quill
    const initializedRef = useRef(false);
    const isExternalUpdate = useRef(false);
    const wordCountRef = useRef<HTMLSpanElement>(null);
    const charCountRef = useRef<HTMLSpanElement>(null);
    // Keep a stable ref to latest onChange so the listener never closes over stale props
    const onChangeRef = useRef(onChange);
    useEffect(() => { onChangeRef.current = onChange; });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateCounts = useCallback((quill: any) => {
        const text = quill.getText().trim();
        const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
        const chars = Math.max(0, quill.getLength() - 1);
        if (wordCountRef.current) wordCountRef.current.textContent = String(words);
        if (charCountRef.current) charCountRef.current.textContent = String(chars);
    }, []);

    useEffect(() => {
        // Prevent React Strict Mode double-invoke and any other re-runs
        if (initializedRef.current) return;

        const initQuill = () => {
            if (!mountRef.current) return;
            // Extra safety: if DOM already has Quill markup, don't double-mount
            if (mountRef.current.querySelector(".ql-editor")) return;

            initializedRef.current = true;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Quill = (window as any).Quill;
            quillRef.current = new Quill(mountRef.current, {
                theme: "snow",
                placeholder,
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ align: [] }],
                        ["link", "blockquote"],
                        [{ color: [] }, { background: [] }],
                        ["clean"],
                    ],
                },
            });

            // Set initial content
            quillRef.current.clipboard.dangerouslyPasteHTML(value || "");

            quillRef.current.on("text-change", () => {
                if (!isExternalUpdate.current) {
                    onChangeRef.current(quillRef.current.root.innerHTML);
                    updateCounts(quillRef.current);
                }
            });

            updateCounts(quillRef.current);
        };

        injectQuillAssets(initQuill);

        return () => {
            // On unmount: destroy Quill, wipe the container, reset flags
            quillRef.current = null;
            initializedRef.current = false;
            if (mountRef.current) {
                mountRef.current.innerHTML = "";
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync value changes that come from outside (e.g. edit modal opening with existing content)
    useEffect(() => {
        if (!quillRef.current) return;
        const current = quillRef.current.root.innerHTML;
        if (current === value) return;
        isExternalUpdate.current = true;
        quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
        updateCounts(quillRef.current);
        isExternalUpdate.current = false;
    }, [value, updateCounts]);

    return (
        <div className="overflow-hidden rounded-xl border border-[#D0D5DD] bg-white shadow-sm transition-colors focus-within:border-[#EA4335]">
            {/* Quill mounts into this div and owns it entirely */}
            <div ref={mountRef} />

            {/* Word / char count footer */}
            <div className="flex items-center justify-end gap-4 border-t border-[#EFEFEF] bg-[#F7F8FA] px-5 py-2">
                <span className="text-[12px] text-[#AAAAAA]">
                    <span ref={wordCountRef}>0</span> words
                </span>
                <span className="text-[12px] text-[#DDDDDD]">|</span>
                <span className="text-[12px] text-[#AAAAAA]">
                    <span ref={charCountRef}>0</span> characters
                </span>
            </div>
        </div>
    );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalizeBlogPost(record: unknown): BlogPost {
    const blog = record as Record<string, unknown>;
    return {
        id: Number(blog.id ?? 0),
        title: String(blog.title ?? "Untitled post"),
        featured_image: String(blog.featured_image ?? blog.featuredImage ?? blog.image ?? "/image/background6.png"),
        content: String(blog.content ?? ""),
        created_at: String(blog.created_at ?? blog.createdAt ?? ""),
    };
}

function extractBlogList(payload: unknown): BlogPost[] {
    if (!payload) return [];
    if (Array.isArray(payload)) return payload.map(normalizeBlogPost);
    if (typeof payload !== "object") return [];
    const response = payload as BlogResponseShape & Record<string, unknown>;
    const data = response.data;
    if (Array.isArray(data)) return data.map(normalizeBlogPost);
    if (data && typeof data === "object") {
        const nested = data as Record<string, unknown>;
        if (Array.isArray(nested.results)) return nested.results.map(normalizeBlogPost);
        return [normalizeBlogPost(data)];
    }
    if (Array.isArray(response.results)) return response.results.map(normalizeBlogPost);
    return [];
}

function extractBlogMeta(payload: unknown): BlogMeta {
    if (!payload || typeof payload !== "object") return {};
    const response = payload as BlogResponseShape & Record<string, unknown>;
    if (response.meta && typeof response.meta === "object") return response.meta;
    const data = response.data;
    if (data && typeof data === "object" && !Array.isArray(data)) {
        const nested = data as Record<string, unknown>;
        if (nested.meta && typeof nested.meta === "object") return nested.meta as BlogMeta;
    }
    return {};
}

function formatDate(value: string) {
    if (!value) return "Just now";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function excerptFromContent(html: string, maxLength = 170) {
    const text = stripHtml(html);
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength).trimEnd()}...`;
}

function initialFormState(): BlogFormState {
    return { title: "", featured_image: "", featured_image_file: null, content: "" };
}

function isFileLike(value: File | null): value is File {
    return value instanceof File;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#FFF4F1] text-[#EA4335]">
                    <Icon className="size-5" />
                </div>
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#98A2B3]">{label}</p>
                    <p className="mt-1 text-lg font-semibold text-[#101828]">{value}</p>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Blog() {
    const [currentPage, setCurrentPage] = useState(1);
    const [mode, setMode] = useState<ModalMode>(null);
    const [viewTargetId, setViewTargetId] = useState<number | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingSnapshot, setEditingSnapshot] = useState<BlogFormSnapshot | null>(null);
    const [formState, setFormState] = useState<BlogFormState>(initialFormState());

    const queryParams = useMemo(() => ({ page: currentPage, page_size: PAGE_SIZE }), [currentPage]);

    const { data: blogPosts, isLoading: isBlogPostsLoading, isFetching: isBlogPostsFetching } = useGetBlogListQuery(queryParams);
    const { data: blogDetails, isLoading: isBlogDetailsLoading } = useGetBlogDetailsQuery(viewTargetId ?? 0, {
        skip: viewTargetId === null,
    });

    const [createBlogPost, { isLoading: isCreating }] = useCreateBlogPostMutation();
    const [updateBlogPost, { isLoading: isUpdating }] = useUpdateBlogPostMutation();
    const [deleteBlogPost, { isLoading: isDeleting }] = useDeleteBlogPostMutation();

    const blogs = useMemo(() => extractBlogList(blogPosts), [blogPosts]);
    const meta = useMemo(() => extractBlogMeta(blogPosts), [blogPosts]);

    const totalPages = Math.max(1, meta.total_pages ?? Math.ceil((meta.count ?? blogs.length) / PAGE_SIZE));
    const activePage = Math.min(meta.page ?? currentPage, totalPages);
    const totalBlogs = meta.count ?? blogs.length;

    const selectedBlog = useMemo(() => {
        if (viewTargetId == null) return null;
        const detailPayload = blogDetails as unknown;
        const detailList = extractBlogList(detailPayload);
        const detailCandidate = detailList[0] ?? null;
        return detailCandidate ?? blogs.find((post) => post.id === viewTargetId) ?? null;
    }, [blogDetails, blogs, viewTargetId]);

    const editorTitle = mode === "create" ? "Create blog post" : "Update blog post";
    const isEditorOpen = mode !== null;
    const isBusy = isCreating || isUpdating || isDeleting;

    const previewImageUrl = useMemo(() => {
        if (isFileLike(formState.featured_image_file)) return URL.createObjectURL(formState.featured_image_file);
        return formState.featured_image || "/image/background6.png";
    }, [formState.featured_image, formState.featured_image_file]);

    function openCreateModal() {
        setMode("create");
        setEditingId(null);
        setEditingSnapshot(null);
        setFormState(initialFormState());
    }

    function openEditModal(post: BlogPost) {
        setMode("edit");
        setEditingId(post.id);
        setEditingSnapshot({ title: post.title, featured_image: post.featured_image, content: post.content });
        setFormState({ title: post.title, featured_image: post.featured_image, featured_image_file: null, content: post.content });
    }

    function closeEditor() {
        setMode(null);
        setEditingId(null);
        setEditingSnapshot(null);
    }

    function openViewModal(id: number) { setViewTargetId(id); }
    function closeViewModal() { setViewTargetId(null); }
    function openDeleteModal(post: BlogPost) { setDeleteTarget(post); }
    function closeDeleteModal() { setDeleteTarget(null); }

    useEffect(() => () => {
        if (previewImageUrl.startsWith("blob:")) URL.revokeObjectURL(previewImageUrl);
    }, [previewImageUrl]);

    function buildUpdatePayload() {
        const payload = new FormData();

        if (!editingSnapshot) {
            return payload;
        }

        if (formState.title !== editingSnapshot.title) {
            payload.append("title", formState.title);
        }

        if (formState.content !== editingSnapshot.content) {
            payload.append("content", formState.content);
        }

        if (isFileLike(formState.featured_image_file)) {
            payload.append("featured_image", formState.featured_image_file);
        } else if (formState.featured_image !== editingSnapshot.featured_image) {
            payload.append("featured_image", formState.featured_image);
        }

        return payload;
    }

    async function handleSubmit() {
        try {
            if (mode === "create") {
                const payload = new FormData();
                payload.append("title", formState.title);
                payload.append("content", formState.content);

                if (isFileLike(formState.featured_image_file)) {
                    payload.append("featured_image", formState.featured_image_file);
                } else if (formState.featured_image) {
                    payload.append("featured_image", formState.featured_image);
                }

                await createBlogPost(payload).unwrap();
            } else if (mode === "edit" && editingId !== null) {
                const payload = buildUpdatePayload();

                if (![...payload.keys()].length) {
                    closeEditor();
                    return;
                }

                await updateBlogPost({ id: editingId, data: payload }).unwrap();
            }

            closeEditor();
        } catch (error) {
            console.error("Failed to save blog post:", error);
        }
    }

    async function handleDelete() {
        if (!deleteTarget) return;
        try {
            await deleteBlogPost(deleteTarget.id).unwrap();
            closeDeleteModal();
        } catch (error) {
            console.error("Failed to delete blog post:", error);
        }
    }

    const selectedBlogContent = selectedBlog?.content ?? "";

    return (
        <div className="mx-auto animate-in fade-in duration-700">
            {/* ── Header Banner ── */}
            <div className="mb-8 overflow-hidden border border-[#E4E7EC] bg-[linear-gradient(135deg,#0F172A_0%,#1E293B_50%,#EA4335_180%)] text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                <div className="flex flex-col gap-6 px-6 py-6 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
                    <div className="max-w-3xl space-y-4">
                        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">
                            Blog management
                        </p>
                        <div className="space-y-3">
                            <h1 className="text-3xl font-semibold italic leading-tight md:text-4xl lg:text-5xl">Blog posts</h1>
                            <p className="max-w-2xl text-sm leading-7 text-white/75 md:text-base">
                                Create, update, publish, and remove blog content from one place. Each post supports rich HTML content, image previews, and paginated browsing.
                            </p>
                        </div>
                    </div>
                    <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                        <Button
                            type="button"
                            onClick={openCreateModal}
                            className="h-12 rounded-none bg-white px-5 text-sm font-bold uppercase tracking-[0.2em] text-[#0F172A] hover:bg-[#F8FAFC]"
                        >
                            <Plus className="mr-2 size-4" />
                            Create Post
                        </Button>
                    </div>
                </div>
                <div className="grid gap-4 border-t border-white/10 px-6 py-5 md:grid-cols-3 md:px-8 lg:px-10">
                    <StatCard icon={CalendarDays} label="Current page" value={`Page ${activePage}`} />
                    <StatCard icon={Eye} label="Visible posts" value={`${blogs.length}`} />
                    <StatCard icon={BriefcaseMedical} label="Total posts" value={`${totalBlogs}`} />
                </div>
            </div>

            {/* ── Blog Grid ── */}
            <div className="border border-[#E4E7EC] bg-white p-4 shadow-sm md:p-6 lg:p-8">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#101828] md:text-2xl">All blog posts</h2>
                        <p className="mt-1 text-sm text-[#667085]">Browse posts and use the action buttons to preview, edit, or delete content.</p>
                    </div>
                    <p className="text-sm text-[#667085]">Showing {blogs.length} of {totalBlogs}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {isBlogPostsLoading || isBlogPostsFetching
                        ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                            <div key={`blog-skeleton-${index}`} className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-[#F9FAFB] shadow-sm">
                                <div className="h-56 animate-pulse bg-linear-to-br from-[#EEF2F6] to-[#E5E7EB]" />
                                <div className="space-y-4 p-5">
                                    <div className="h-4 w-24 animate-pulse rounded-full bg-[#E5E7EB]" />
                                    <div className="h-7 w-3/4 animate-pulse rounded-full bg-[#E5E7EB]" />
                                    <div className="space-y-2">
                                        <div className="h-3 w-full animate-pulse rounded-full bg-[#E5E7EB]" />
                                        <div className="h-3 w-5/6 animate-pulse rounded-full bg-[#E5E7EB]" />
                                        <div className="h-3 w-2/3 animate-pulse rounded-full bg-[#E5E7EB]" />
                                    </div>
                                </div>
                            </div>
                        ))
                        : blogs.length === 0
                            ? (
                                <div className="col-span-full rounded-[24px] border border-dashed border-[#EAECF0] bg-[#FAFAFA] px-6 py-16 text-center">
                                    <p className="text-lg font-semibold text-[#101828]">No blog posts found</p>
                                    <p className="mt-2 text-sm text-[#667085]">Create a new post to start publishing content.</p>
                                    <Button type="button" onClick={openCreateModal} className="mt-6 rounded-none bg-[#EA4335] px-5 text-white hover:bg-[#C63428]">
                                        <Plus className="mr-2 size-4" />
                                        Create your first post
                                    </Button>
                                </div>
                            )
                            : blogs.map((post) => (
                                <article
                                    key={post.id}
                                    className="group overflow-hidden border border-[#EAECF0] bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,23,42,0.12)]"
                                >
                                    <div className="relative h-64 overflow-hidden bg-[#F2F4F7]">
                                        <Image
                                            src={post.featured_image || "/image/background6.png"}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />
                                        <div className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#101828] shadow-sm">
                                            Blog post
                                        </div>
                                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                            <CalendarDays className="size-3.5" />
                                            {formatDate(post.created_at)}
                                        </div>
                                    </div>
                                    <div className="space-y-5 p-5 md:p-6">
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-semibold leading-snug text-[#101828] md:text-2xl">{post.title}</h3>
                                            <p className="text-sm leading-7 text-[#667085]">{excerptFromContent(post.content)}</p>
                                        </div>
                                        <div className="rounded-2xl border border-[#EAECF0] bg-[#FCFCFD] px-4 py-3 text-sm text-[#344054]">
                                            <span className="font-semibold text-[#101828]">Content:</span> {stripHtml(post.content).slice(0, 120) || "No content available."}
                                        </div>
                                        <div className="flex flex-col gap-3 sm:flex-row">
                                            <button
                                                type="button"
                                                onClick={() => openViewModal(post.id)}
                                                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#D0D5DD] px-4 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB]"
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openEditModal(post)}
                                                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#B8D4FF] bg-[#F5F9FF] px-4 text-sm font-medium text-[#175CD3] transition-colors hover:bg-[#EAF2FF]"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => openDeleteModal(post)}
                                                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#F1B8B8] bg-[#FFF5F5] px-4 text-sm font-medium text-[#F65353] transition-colors hover:bg-[#FFE9E9]"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                </div>

                <Pagination
                    currentPage={activePage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    disabled={isBlogPostsLoading || isBlogPostsFetching}
                />
            </div>

            {/* ── Create / Edit Modal ── */}
            {isEditorOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
                    <div className="flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[#E4E7EC] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
                        {/* Modal header */}
                        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#EAECF0] px-6 py-5 md:px-8">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#98A2B3]">Blog editor</p>
                                <h3 className="mt-2 text-2xl font-semibold text-[#101828]">{editorTitle}</h3>
                                <p className="mt-2 text-sm text-[#667085]">Fill in the fields on the left and preview the rendered result on the right.</p>
                            </div>
                            <button
                                type="button"
                                onClick={closeEditor}
                                className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
                                aria-label="Close editor"
                                disabled={isBusy}
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
                            {/* ── Left: form ── */}
                            <div className="overflow-y-auto px-6 py-6 md:px-8">
                                <div className="grid gap-5">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#344054]">Title</label>
                                        <input
                                            value={formState.title}
                                            onChange={(e) => setFormState((s) => ({ ...s, title: e.target.value }))}
                                            placeholder="Enter post title"
                                            className="h-12 w-full rounded-xl border border-[#D0D5DD] px-4 text-sm text-[#101828] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#EA4335]"
                                        />
                                    </div>

                                    {/* Featured image upload */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#344054]">Featured image upload</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0] ?? null;
                                                setFormState((s) => ({ ...s, featured_image_file: file }));
                                            }}
                                            className="block w-full rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-4 py-3 text-sm text-[#101828] outline-none transition-colors file:mr-4 file:rounded-lg file:border-0 file:bg-[#F9FAFB] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#344054] hover:border-[#EA4335]"
                                        />
                                        <p className="text-xs leading-5 text-[#667085]">Upload a new image file. If no file is selected, the existing image URL remains in use.</p>
                                    </div>

                                    {/* Rich Text Content */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#344054]">Content</label>
                                        <RichTextEditor
                                            key={`editor-${mode}-${editingId ?? "new"}`}
                                            value={formState.content}
                                            onChange={(html) => setFormState((s) => ({ ...s, content: html }))}
                                            placeholder="Write your blog post content here..."
                                        />
                                        <p className="text-xs leading-5 text-[#667085]">
                                            Use the toolbar to format your content — headings, bold, lists, links, and more.
                                        </p>
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    <button
                                        type="button"
                                        onClick={closeEditor}
                                        disabled={isBusy}
                                        className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D0D5DD] px-5 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isBusy || !formState.title.trim() || !formState.content.trim()}
                                        className={cn(
                                            "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70",
                                            mode === "create" ? "bg-[#EA4335] hover:bg-[#C63428]" : "bg-[#175CD3] hover:bg-[#1248a7]"
                                        )}
                                    >
                                        {isBusy ? <Loader2 className="size-4 animate-spin" /> : mode === "create" ? <Plus className="size-4" /> : <Pencil className="size-4" />}
                                        {isBusy ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
                                    </button>
                                </div>
                            </div>

                            {/* ── Right: preview ── */}
                            <div className="overflow-y-auto border-t border-[#EAECF0] bg-[#F9FAFB] lg:border-l lg:border-t-0">
                                <div className="p-6 md:p-8">
                                    <div className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-white shadow-sm">
                                        <div className="relative h-64 bg-[#F2F4F7]">
                                            <Image
                                                src={previewImageUrl}
                                                alt={formState.title || "Blog preview"}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="space-y-4 p-5 md:p-6">
                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Preview</p>
                                                <h4 className="mt-2 text-2xl font-semibold leading-tight text-[#101828]">{formState.title || "Untitled post"}</h4>
                                                <p className="mt-2 text-sm text-[#667085]">{formState.content ? excerptFromContent(formState.content, 220) : "Your rendered preview will appear here."}</p>
                                            </div>
                                            <div
                                                className="prose max-w-none prose-headings:font-semibold prose-p:leading-7 prose-li:leading-7 prose-blockquote:border-l-4 prose-blockquote:border-[#EA4335] prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-2xl prose-img:shadow-sm"
                                                dangerouslySetInnerHTML={{ __html: formState.content || "<p>Your blog  preview will appear here.</p>" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* ── View Modal ── */}
            {viewTargetId !== null ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
                    <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden border border-[#E4E7EC] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
                        <div className="flex items-start justify-between gap-4 border-b border-[#EAECF0] px-6 py-5 md:px-8">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#98A2B3]">Blog details</p>
                                <h3 className="mt-2 text-2xl font-semibold text-[#101828]">{selectedBlog?.title ?? "Loading post..."}</h3>
                                <p className="mt-2 text-sm text-[#667085]">Read the full article and jump straight to edit or delete actions if needed.</p>
                            </div>
                            <button
                                type="button"
                                onClick={closeViewModal}
                                className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
                                aria-label="Close blog details"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto px-6 py-6 md:px-8">
                            {isBlogDetailsLoading && !selectedBlog ? (
                                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[#D0D5DD] bg-[#F9FAFB] px-4 py-8 text-sm text-[#667085]">
                                    <Loader2 className="size-4 animate-spin" />
                                    Loading blog content...
                                </div>
                            ) : selectedBlog ? (
                                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                                    <div className="overflow-hidden rounded-[24px] border border-[#EAECF0] bg-[#F9FAFB]">
                                        <div className="relative h-72 bg-[#F2F4F7]">
                                            <Image
                                                src={selectedBlog.featured_image || "/image/background6.png"}
                                                alt={selectedBlog.title}
                                                fill
                                                className="object-cover"
                                                unoptimized
                                            />
                                        </div>
                                        <div className="space-y-4 p-6">
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#667085]">
                                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium text-[#344054] shadow-sm">
                                                    <CalendarDays className="size-3.5" />
                                                    {formatDate(selectedBlog.created_at)}
                                                </span>
                                                <span className="inline-flex items-center rounded-full bg-[#FFF4F1] px-3 py-1 font-medium text-[#EA4335]">
                                                    ID #{selectedBlog.id}
                                                </span>
                                            </div>
                                            <h4 className="text-2xl font-semibold leading-tight text-[#101828] md:text-3xl">{selectedBlog.title}</h4>
                                            <p className="text-sm leading-7 text-[#667085]">{excerptFromContent(selectedBlog.content, 260)}</p>
                                            <div className="flex flex-col gap-3 sm:flex-row">
                                                <button
                                                    type="button"
                                                    onClick={() => { openEditModal(selectedBlog); closeViewModal(); }}
                                                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#175CD3] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1248a7]"
                                                >
                                                    <Pencil className="size-4" />
                                                    Edit post
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => { openDeleteModal(selectedBlog); closeViewModal(); }}
                                                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#F1B8B8] bg-[#FFF5F5] px-4 text-sm font-medium text-[#F65353] transition-colors hover:bg-[#FFE9E9]"
                                                >
                                                    <Trash2 className="size-4" />
                                                    Delete post
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="rounded-[24px] border border-[#EAECF0] bg-white p-6 shadow-sm">
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#98A2B3]">Rendered content</p>
                                        <div
                                            className="prose mt-4 max-w-none prose-headings:font-semibold prose-p:leading-7 prose-li:leading-7 prose-blockquote:border-l-4 prose-blockquote:border-[#EA4335] prose-blockquote:pl-4 prose-blockquote:italic prose-img:rounded-2xl prose-img:shadow-sm"
                                            dangerouslySetInnerHTML={{ __html: selectedBlogContent || "<p>No content available.</p>" }}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}

            {/* ── Delete Confirm Modal ── */}
            {deleteTarget ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[24px] border border-[#E4E7EC] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#FFF1F1] text-[#F65353]">
                                    <Trash2 className="size-6" />
                                </div>
                                <h2 className="text-xl font-semibold text-[#101828]">Delete blog post</h2>
                                <p className="text-sm leading-6 text-[#667085]">
                                    Are you sure you want to delete <span className="font-semibold text-[#101828]">{deleteTarget.title}</span>? This action cannot be undone.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                className="rounded-full p-2 text-[#98A2B3] transition-colors hover:bg-[#F2F4F7] hover:text-[#101828]"
                                aria-label="Close delete dialog"
                                disabled={isDeleting}
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={closeDeleteModal}
                                disabled={isDeleting}
                                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D0D5DD] px-5 text-sm font-medium text-[#344054] transition-colors hover:bg-[#F9FAFB] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#F65353] px-5 text-sm font-medium text-white transition-colors hover:bg-[#E54848] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                                {isDeleting ? "Deleting..." : "Delete post"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}