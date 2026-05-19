// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */
// "use client";

// import Image from "next/image";
// import type { ChangeEvent, ComponentType } from "react";
// import { useEffect, useRef, useState, useCallback } from "react";
// import {
//     Bold,
//     Check,
//     Eye,
//     EyeOff,
//     ImageUp,
//     Info,
//     Italic,
//     Link,
//     List,
//     ListOrdered,
//     Lock,
//     Pencil,
//     Loader2,
//     Shield,
//     Strikethrough,
//     Underline,
//     UserRound,
// } from "lucide-react";
// import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/feature/settingSlice";
// import { toast } from "sonner";
// import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/feature/userSlice";
// import { useChangePasswordMutation } from "@/redux/feature/authSlice";

// type SettingsTab = "personal" | "password" | "about" | "privacy" | "terms";

// type PersonalInfoState = {
//     name: string;
//     phone: string;
//     country: string;
//     currentAddress: string;
//     dateOfBirth: string;
// };

// type PasswordState = {
//     oldPassword: string;
//     newPassword: string;
//     confirmPassword: string;
// };

// type NavItem = {
//     id: SettingsTab;
//     label: string;
//     icon: ComponentType<{ className?: string }>;
// };

// const navItems: NavItem[] = [
//     { id: "personal", label: "Personal Information", icon: UserRound },
//     { id: "password", label: "Change Password", icon: Lock },
//     { id: "about", label: "About Us", icon: Info },
//     { id: "privacy", label: "Privacy Policy", icon: Shield },
//     { id: "terms", label: "Terms of Use", icon: Shield },
// ];

// const defaultPersonalInfo: PersonalInfoState = {
//     name: "Mr. John",
//     phone: "01772968958",
//     country: "Bangladesh",
//     currentAddress: "Dhaka, Bangladesh",
//     dateOfBirth: "2001-02-14",
// };

// const defaultPasswordState: PasswordState = {
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
// };

// const defaultAboutContent = `At Winners Regional Center (WRC), we are committed to connecting global investors with high-quality, secure, and growth-driven investment opportunities. Our platform is designed to simplify the investment process by offering transparent project insights, seamless communication, and reliable support at every stage. With a focus on trust, innovation, and long-term value, we empower investors to make informed decisions while helping projects achieve sustainable success. Our dedicated team ensures a smooth experience through advanced technology, expert evaluation, and continuous monitoring, making WRC a trusted partner in your investment journey.`;

// const defaultPrivacyContent = `<p>Your privacy matters to us. We collect only the information required to provide account access, investor communication, project administration, and support services.</p><p>We do not sell personal data. Access to information is restricted to authorized personnel and protected using operational and technical safeguards.</p><p>We may retain information as required by law, compliance obligations, or legitimate business purposes related to service delivery and record keeping.</p>`;

// const defaultTermsContent = `<p>By using Winners Regional Center, you agree to provide accurate information, protect your account credentials, and use the platform only for lawful investment-related activities.</p><p>We collect and store personal information solely to support onboarding, identity verification, investor communication, and project administration. Your information is managed with confidentiality and operational safeguards.</p><p>Project information, timelines, and performance targets are presented for informational purposes and may change based on regulatory, financial, or market conditions. You should review all relevant documents before making investment decisions.</p>`;

// function cn(...classes: Array<string | false | null | undefined>) {
//     return classes.filter(Boolean).join(" ");
// }

// function extractApiErrorMessage(error: any) {
//     const message = error?.data?.message ?? error?.error?.message ?? error?.message;

//     if (typeof message === "string" && message.trim()) {
//         return message;
//     }

//     if (Array.isArray(message) && message.length > 0) {
//         return message.filter(Boolean).join(" ");
//     }

//     return "Failed to save settings. Please try again.";
// }

// // ─── Rich Text Editor ────────────────────────────────────────────────────────

// type RichTextEditorProps = {
//     value: string;
//     onChange: (value: string) => void;
// };

// function RichTextEditor({ value, onChange }: RichTextEditorProps) {
//     const editorRef = useRef<HTMLDivElement>(null);
//     const isInternalChange = useRef(false);

//     // Sync external value changes into the editor (only when not caused by user input)
//     useEffect(() => {
//         if (editorRef.current && !isInternalChange.current) {
//             editorRef.current.innerHTML = value;
//         }
//         isInternalChange.current = false;
//     }, [value]);

//     const handleInput = useCallback(() => {
//         if (editorRef.current) {
//             isInternalChange.current = true;
//             onChange(editorRef.current.innerHTML);
//         }
//     }, [onChange]);

//     const exec = (command: string, arg?: string) => {
//         document.execCommand(command, false, arg);
//         editorRef.current?.focus();
//         handleInput();
//     };

//     const toolbarButtons = [
//         { icon: Bold, command: "bold", title: "Bold" },
//         { icon: Italic, command: "italic", title: "Italic" },
//         { icon: Underline, command: "underline", title: "Underline" },
//         { icon: Strikethrough, command: "strikeThrough", title: "Strikethrough" },
//         { icon: List, command: "insertUnorderedList", title: "Bullet List" },
//         { icon: ListOrdered, command: "insertOrderedList", title: "Numbered List" },
//     ];

//     const handleLink = () => {
//         const url = prompt("Enter URL:");
//         if (url) exec("createLink", url);
//     };

//     return (
//         <div className="rounded-sm border border-[#D8D8D8] bg-white overflow-hidden">
//             {/* Toolbar */}
//             <div className="flex flex-wrap items-center gap-1 border-b border-[#D8D8D8] bg-[#F5F5F5] px-3 py-2">
//                 {/* Heading select */}
//                 <select
//                     onChange={(e) => exec("formatBlock", e.target.value)}
//                     defaultValue=""
//                     className="rounded border border-[#D8D8D8] bg-white px-2 py-1 text-[13px] text-[#4B4B4B] outline-none cursor-pointer"
//                 >
//                     <option value="">Paragraph</option>
//                     <option value="h1">Heading 1</option>
//                     <option value="h2">Heading 2</option>
//                     <option value="h3">Heading 3</option>
//                 </select>

//                 <div className="mx-1 h-5 w-px bg-[#D8D8D8]" />

//                 {toolbarButtons.map(({ icon: Icon, command, title }) => (
//                     <button
//                         key={command}
//                         type="button"
//                         title={title}
//                         onMouseDown={(e) => {
//                             e.preventDefault(); // prevent blur
//                             exec(command);
//                         }}
//                         className="rounded p-1.5 text-[#4B4B4B] hover:bg-[#E2E2E2] transition-colors"
//                     >
//                         <Icon className="h-4 w-4" />
//                     </button>
//                 ))}

//                 <button
//                     type="button"
//                     title="Insert Link"
//                     onMouseDown={(e) => {
//                         e.preventDefault();
//                         handleLink();
//                     }}
//                     className="rounded p-1.5 text-[#4B4B4B] hover:bg-[#E2E2E2] transition-colors"
//                 >
//                     <Link className="h-4 w-4" />
//                 </button>
//             </div>

//             {/* Editable area */}
//             <div
//                 ref={editorRef}
//                 contentEditable
//                 suppressContentEditableWarning
//                 onInput={handleInput}
//                 className="min-h-[300px] px-4 py-3 text-[16px] text-[#5E5E5E] outline-none prose prose-sm max-w-none"
//                 style={{ lineHeight: "1.7" }}
//             />
//         </div>
//     );
// }

// // ─── Sub-components ──────────────────────────────────────────────────────────

// type MenuButtonProps = {
//     active: boolean;
//     icon: NavItem["icon"];
//     label: string;
//     onClick: () => void;
// };

// function MenuButton({ active, icon: Icon, label, onClick }: MenuButtonProps) {
//     return (
//         <button
//             type="button"
//             onClick={onClick}
//             className={cn(
//                 "flex w-full items-center gap-4 rounded-sm border bg-[#E8E9EC52] px-7 py-5 text-left text-[18px] font-medium text-[#4B4B4B] transition-colors",
//                 active ? "border-primary bg-white" : "border-transparent hover:border-[#E8B4B4]/60"
//             )}
//         >
//             <Icon className="h-5 w-5 shrink-0 text-[#4B4B4B]" />
//             <span>{label}</span>
//         </button>
//     );
// }

// type FieldCardProps = {
//     label: string;
//     value: string;
//     icon: "edit" | "check";
//     onChange: (value: string) => void;
// };

// function FieldCard({ label, value, icon, onChange }: FieldCardProps) {
//     return (
//         <div className="flex items-center gap-4 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5">
//             <div className="min-w-0 flex-1">
//                 <p className="text-[14px] leading-none font-normal text-[#6C6C6C]">{label}</p>
//                 <input
//                     value={value}
//                     onChange={(event) => onChange(event.target.value)}
//                     className="mt-2 w-full border-none bg-transparent p-0 text-[18px] lg:text-[20px] leading-tight font-normal text-[#5A5A5A] outline-none"
//                 />
//             </div>
//             <span className="shrink-0 text-[#4B4B4B]">
//                 {icon === "edit" ? <Pencil className="h-5 w-5" /> : <Check className="h-6 w-6" />}
//             </span>
//         </div>
//     );
// }

// type PasswordFieldProps = {
//     id: keyof PasswordState;
//     label: string;
//     value: string;
//     visible: boolean;
//     onChange: (value: string) => void;
//     onToggle: () => void;
// };

// function PasswordField({ id, label, value, visible, onChange, onToggle }: PasswordFieldProps) {
//     return (
//         <div className="relative bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5">
//             <label htmlFor={id} className="block text-[14px] leading-none font-normal text-[#6C6C6C]">
//                 {label}
//             </label>
//             <input
//                 id={id}
//                 type={visible ? "text" : "password"}
//                 value={value}
//                 onChange={(event) => onChange(event.target.value)}
//                 className="mt-2 w-full border-none bg-transparent p-0 pr-10 text-[18px] lg:text-[20px] leading-tight font-normal text-[#5A5A5A] outline-none"
//             />
//             <button
//                 type="button"
//                 onClick={onToggle}
//                 className="absolute top-1/2 right-4 -translate-y-1/2 text-[#4B4B4B] sm:right-5"
//                 aria-label={visible ? `Hide ${label}` : `Show ${label}`}
//             >
//                 {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//         </div>
//     );
// }

// // ─── Main Page ───────────────────────────────────────────────────────────────

// export default function SettingsPage() {
//     const [activeTab, setActiveTab] = useState<SettingsTab>("personal");
//     const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
//     const [savedPersonalInfo, setSavedPersonalInfo] = useState(defaultPersonalInfo);
//     const [profileImagePreview, setProfileImagePreview] = useState("/image/men.png");
//     const [savedProfileImagePreview, setSavedProfileImagePreview] = useState("/image/men.png");
//     const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
//     const [passwords, setPasswords] = useState(defaultPasswordState);
//     const [savedPasswords, setSavedPasswords] = useState(defaultPasswordState);
//     const [aboutContent, setAboutContent] = useState(defaultAboutContent);
//     const [savedAboutContent, setSavedAboutContent] = useState(defaultAboutContent);
//     const [privacyContent, setPrivacyContent] = useState(defaultPrivacyContent);
//     const [savedPrivacyContent, setSavedPrivacyContent] = useState(defaultPrivacyContent);
//     const [termsContent, setTermsContent] = useState(defaultTermsContent);
//     const [savedTermsContent, setSavedTermsContent] = useState(defaultTermsContent);

//     const { data } = useGetSettingsQuery(undefined);
//     const { data: userProfileData } = useUserProfileQuery(undefined);

//     const [updateSettings, { isLoading: isSavingSettings }] = useUpdateSettingsMutation();
//     const [updateProfile, { isLoading: isSavingProfile }] = useUpdateProfileMutation();
//     const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

//     const [showPasswords, setShowPasswords] = useState<Record<keyof PasswordState, boolean>>({
//         oldPassword: false,
//         newPassword: false,
//         confirmPassword: false,
//     });
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const objectUrlRef = useRef<string | null>(null);

//     useEffect(() => {
//         const settings = data?.data;

//         if (!settings) return;

//         let isMounted = true;

//         queueMicrotask(() => {
//             if (!isMounted) return;

//             const about = settings.about_us || defaultAboutContent;
//             const privacy = settings.legal_privacy_policy || defaultPrivacyContent;
//             const terms = settings.legal_terms_of_use_policy || defaultTermsContent;

//             setAboutContent(about);
//             setSavedAboutContent(about);
//             setPrivacyContent(privacy);
//             setSavedPrivacyContent(privacy);
//             setTermsContent(terms);
//             setSavedTermsContent(terms);
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [data]);

//     useEffect(() => {
//         const profile = userProfileData?.data;

//         if (!profile) return;

//         let isMounted = true;

//         queueMicrotask(() => {
//             if (!isMounted) return;

//             const nextPersonalInfo = {
//                 name: profile.name || defaultPersonalInfo.name,
//                 phone: profile.phone || defaultPersonalInfo.phone,
//                 country: profile.country || defaultPersonalInfo.country,
//                 currentAddress: profile.current_address || defaultPersonalInfo.currentAddress,
//                 dateOfBirth: profile.date_of_birth || defaultPersonalInfo.dateOfBirth,
//             };

//             setPersonalInfo(nextPersonalInfo);
//             setSavedPersonalInfo(nextPersonalInfo);
//             const nextProfileImage = profile.profile_image || "/image/men.png";
//             setProfileImagePreview(nextProfileImage);
//             setSavedProfileImagePreview(nextProfileImage);
//         });

//         return () => {
//             isMounted = false;
//         };
//     }, [userProfileData]);

//     useEffect(() => {
//         return () => {
//             if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
//         };
//     }, []);

//     const handleUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (!file) return;
//         if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
//         const nextUrl = URL.createObjectURL(file);
//         objectUrlRef.current = nextUrl;
//         setProfileImagePreview(nextUrl);
//         setProfileImageFile(file);
//     };

//     const handleCancel = () => {
//         switch (activeTab) {
//             case "personal":
//                 setPersonalInfo(savedPersonalInfo);
//                 setProfileImagePreview(savedProfileImagePreview);
//                 setProfileImageFile(null);
//                 break;
//             case "password": setPasswords(savedPasswords); break;
//             case "about": setAboutContent(savedAboutContent); break;
//             case "privacy": setPrivacyContent(savedPrivacyContent); break;
//             case "terms": setTermsContent(savedTermsContent); break;
//         }
//     };

//     const handleSave = async () => {
//         try {
//             switch (activeTab) {
//                 case "personal": {
//                     const formData = new FormData();
//                     formData.append("name", personalInfo.name);
//                     formData.append("phone", personalInfo.phone);
//                     formData.append("country", personalInfo.country);
//                     formData.append("current_address", personalInfo.currentAddress);
//                     formData.append("date_of_birth", personalInfo.dateOfBirth);

//                     if (profileImageFile) {
//                         formData.append("profile_image", profileImageFile);
//                     }

//                     await updateProfile(formData).unwrap();
//                     setSavedPersonalInfo(personalInfo);
//                     setSavedProfileImagePreview(profileImagePreview);
//                     setProfileImageFile(null);
//                     toast.success("Profile updated successfully");
//                     break;
//                 }
//                 case "password": {
//                     if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
//                         toast.error("Please fill in all password fields");
//                         return;
//                     }

//                     if (passwords.newPassword !== passwords.confirmPassword) {
//                         toast.error("New password confirmation does not match");
//                         return;
//                     }

//                     await changePassword({
//                         old_password: passwords.oldPassword,
//                         new_password: passwords.newPassword,
//                         new_password_confirm: passwords.confirmPassword,
//                     }).unwrap();

//                     setPasswords(defaultPasswordState);
//                     setSavedPasswords(defaultPasswordState);
//                     setShowPasswords({
//                         oldPassword: false,
//                         newPassword: false,
//                         confirmPassword: false,
//                     });
//                     toast.success("Password changed successfully");
//                     break;
//                 }
//                 case "about": {
//                     await updateSettings({ about_us: aboutContent }).unwrap();
//                     setSavedAboutContent(aboutContent);
//                     toast.success("About Us updated successfully");
//                     break;
//                 }
//                 case "privacy": {
//                     await updateSettings({ legal_privacy_policy: privacyContent }).unwrap();
//                     setSavedPrivacyContent(privacyContent);
//                     toast.success("Privacy Policy updated successfully");
//                     break;
//                 }
//                 case "terms": {
//                     await updateSettings({ legal_terms_of_use_policy: termsContent }).unwrap();
//                     setSavedTermsContent(termsContent);
//                     toast.success("Terms of Use updated successfully");
//                     break;
//                 }
//             }
//         } catch (error: any) {
//             toast.error(extractApiErrorMessage(error));
//             console.error(error);
//         }
//     };

//     const isSaving = activeTab === "personal" ? isSavingProfile : activeTab === "password" ? isChangingPassword : isSavingSettings;

//     const renderPanel = () => {
//         if (activeTab === "personal") {
//             return (
//                 <div className="animate-in fade-in duration-500">
//                     <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
//                         Personal Information
//                     </h1>
//                     <div className="mt-8 flex flex-col items-center">
//                         <div className="relative h-[170px] w-[170px] overflow-hidden rounded-full bg-[#ECEDEF] sm:h-[200px] sm:w-[200px]">
//                             <img
//                                 src={profileImagePreview}
//                                 alt="Profile photo"
//                                 className="object-cover"
//                                 sizes="(max-width: 640px) 170px, 200px"
//                             />
//                         </div>
//                         <input
//                             ref={fileInputRef}
//                             type="file"
//                             accept="image/*"
//                             onChange={handleUploadPhoto}
//                             className="hidden"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => fileInputRef.current?.click()}
//                             className="mt-5 inline-flex items-center gap-3 border border-[#D8D8D8] bg-white px-5 py-3 text-[16px] font-medium text-[#1F1F1F] transition-colors hover:bg-[#F8F8F8]"
//                         >
//                             <ImageUp className="h-5 w-5" />
//                             <span>Upload Photo</span>
//                         </button>
//                     </div>
//                     <div className="mt-8 rounded-sm bg-[#E8E9EC52] p-4 sm:p-6">
//                         <div className="space-y-5">
//                             <FieldCard label="Your name" value={personalInfo.name} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, name: v }))} />
//                             <FieldCard label="Phone number" value={personalInfo.phone} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, phone: v }))} />
//                             <FieldCard label="Country" value={personalInfo.country} icon="check" onChange={(v) => setPersonalInfo((c) => ({ ...c, country: v }))} />
//                             <FieldCard label="Current address" value={personalInfo.currentAddress} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, currentAddress: v }))} />
//                             <FieldCard label="Date of birth" value={personalInfo.dateOfBirth} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, dateOfBirth: v }))} />
//                         </div>
//                     </div>
//                 </div>
//             );
//         }

//         if (activeTab === "password") {
//             return (
//                 <div className="animate-in fade-in duration-500">
//                     <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
//                         Change Password
//                     </h1>
//                     <div className="mt-10 rounded-sm bg-[#E8E9EC52] p-4 sm:p-6">
//                         <div className="space-y-4">
//                             <PasswordField id="oldPassword" label="Old password" value={passwords.oldPassword} visible={showPasswords.oldPassword} onChange={(v) => setPasswords((c) => ({ ...c, oldPassword: v }))} onToggle={() => setShowPasswords((c) => ({ ...c, oldPassword: !c.oldPassword }))} />
//                             <PasswordField id="newPassword" label="New password" value={passwords.newPassword} visible={showPasswords.newPassword} onChange={(v) => setPasswords((c) => ({ ...c, newPassword: v }))} onToggle={() => setShowPasswords((c) => ({ ...c, newPassword: !c.newPassword }))} />
//                             <PasswordField id="confirmPassword" label="Confirm new password" value={passwords.confirmPassword} visible={showPasswords.confirmPassword} onChange={(v) => setPasswords((c) => ({ ...c, confirmPassword: v }))} onToggle={() => setShowPasswords((c) => ({ ...c, confirmPassword: !c.confirmPassword }))} />
//                         </div>
//                     </div>
//                 </div>
//             );
//         }

//         if (activeTab === "about") {
//             return (
//                 <div className="animate-in fade-in duration-500">
//                     <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
//                         About Us
//                     </h1>
//                     <div className="mt-8">
//                         <RichTextEditor value={aboutContent} onChange={setAboutContent} />
//                     </div>
//                 </div>
//             );
//         }

//         if (activeTab === "privacy") {
//             return (
//                 <div className="animate-in fade-in duration-500">
//                     <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
//                         Privacy Policy
//                     </h1>
//                     <div className="mt-8">
//                         <RichTextEditor value={privacyContent} onChange={setPrivacyContent} />
//                     </div>
//                 </div>
//             );
//         }

//         return (
//             <div className="animate-in fade-in duration-500">
//                 <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
//                     Terms of Use
//                 </h1>
//                 <div className="mt-8">
//                     <RichTextEditor value={termsContent} onChange={setTermsContent} />
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <section className="grid grid-cols-1 gap-5 xl:grid-cols-[460px_minmax(0,1fr)] mx-auto pb-10">
//             <aside className="rounded-[20px] border border-[#E2E7F1] bg-white p-5 sm:p-6 h-fit sticky ">
//                 <div className="space-y-4">
//                     {navItems.map((item) => (
//                         <MenuButton
//                             key={item.id}
//                             active={activeTab === item.id}
//                             icon={item.icon}
//                             label={item.label}
//                             onClick={() => setActiveTab(item.id)}
//                         />
//                     ))}
//                 </div>
//             </aside>

//             <section className="rounded-[20px] border border-[#E2E7F1] bg-white p-5 sm:p-6 lg:p-7 min-h-[600px] flex flex-col">
//                 <div className="flex-1">
//                     {renderPanel()}
//                 </div>

//                 <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
//                     <button
//                         type="button"
//                         onClick={handleCancel}
//                         className="flex min-h-[58px] items-center justify-center border border-[#D7D7D7] bg-white px-6 py-3 text-[16px] font-bold uppercase text-[#4B4B4B] transition-colors hover:bg-[#F8F8F8]"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleSave}
//                         disabled={isSaving}
//                         className="flex min-h-[58px] items-center justify-center bg-[#C91E1E] px-6 py-3 text-[16px] font-bold uppercase text-white transition-colors hover:bg-[#AD1717] disabled:cursor-not-allowed disabled:opacity-70"
//                     >
//                         {isSaving ? (
//                             <span className="inline-flex items-center gap-2">
//                                 <Loader2 className="h-4 w-4 animate-spin" />
//                                 Saving...
//                             </span>
//                         ) : (
//                             "Save Changes"
//                         )}
//                     </button>
//                 </div>
//             </section>
//         </section>
//     );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import type { ChangeEvent, ComponentType } from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import {
    Check,
    Eye,
    EyeOff,
    ImageUp,
    Info,
    Lock,
    Pencil,
    Loader2,
    Shield,
    UserRound,
} from "lucide-react";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/redux/feature/settingSlice";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserProfileQuery } from "@/redux/feature/userSlice";
import { useChangePasswordMutation } from "@/redux/feature/authSlice";

// ─── Types ────────────────────────────────────────────────────────────────────

type SettingsTab = "personal" | "password" | "about" | "privacy" | "terms";

type PersonalInfoState = {
    name: string;
    phone: string;
    country: string;
    currentAddress: string;
    dateOfBirth: string;
};

type PasswordState = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

type NavItem = {
    id: SettingsTab;
    label: string;
    icon: ComponentType<{ className?: string }>;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
    { id: "personal", label: "Personal Information", icon: UserRound },
    { id: "password", label: "Change Password", icon: Lock },
    { id: "about", label: "About Us", icon: Info },
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "terms", label: "Terms of Use", icon: Shield },
];

const defaultPersonalInfo: PersonalInfoState = {
    name: "Mr. John",
    phone: "01772968958",
    country: "Bangladesh",
    currentAddress: "Dhaka, Bangladesh",
    dateOfBirth: "2001-02-14",
};

const defaultPasswordState: PasswordState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const defaultAboutContent = `<p>At Winners Regional Center (WRC), we are committed to connecting global investors with high-quality, secure, and growth-driven investment opportunities. Our platform is designed to simplify the investment process by offering transparent project insights, seamless communication, and reliable support at every stage.</p>`;

const defaultPrivacyContent = `<p>Your privacy matters to us. We collect only the information required to provide account access, investor communication, project administration, and support services.</p><p>We do not sell personal data. Access to information is restricted to authorized personnel and protected using operational and technical safeguards.</p>`;

const defaultTermsContent = `<p>By using Winners Regional Center, you agree to provide accurate information, protect your account credentials, and use the platform only for lawful investment-related activities.</p><p>We collect and store personal information solely to support onboarding, identity verification, investor communication, and project administration.</p>`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function extractApiErrorMessage(error: any) {
    const message = error?.data?.message ?? error?.error?.message ?? error?.message;
    if (typeof message === "string" && message.trim()) return message;
    if (Array.isArray(message) && message.length > 0) return message.filter(Boolean).join(" ");
    return "Failed to save settings. Please try again.";
}

// ─── Quill Rich Text Editor ───────────────────────────────────────────────────

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

// Quill global styles injected once
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
    min-height: 340px !important;
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
.ql-snow .ql-toolbar button:hover .ql-stroke { stroke: #C91E1E !important; }
.ql-snow.ql-toolbar button:hover .ql-fill,
.ql-snow .ql-toolbar button:hover .ql-fill { fill: #C91E1E !important; }
.ql-snow.ql-toolbar button.ql-active .ql-stroke { stroke: #C91E1E !important; }
.ql-snow.ql-toolbar button.ql-active .ql-fill { fill: #C91E1E !important; }
.ql-snow .ql-picker-label:hover { color: #C91E1E !important; }
.ql-snow .ql-picker.ql-expanded .ql-picker-label { color: #C91E1E !important; }
.ql-snow .ql-picker-options {
    background: #FFFFFF !important;
    border: 1px solid #E0E0E0 !important;
    border-radius: 6px !important;
    box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
}
.ql-snow .ql-picker-item:hover { color: #C91E1E !important; }
.ql-formats { margin-right: 10px !important; }
.ql-editor h1 { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
.ql-editor h2 { font-size: 20px; font-weight: 600; margin-bottom: 6px; }
.ql-editor h3 { font-size: 17px; font-weight: 600; margin-bottom: 4px; }
.ql-editor p { margin-bottom: 10px; }
.ql-editor ul, .ql-editor ol { padding-left: 20px; margin-bottom: 10px; }
.ql-editor blockquote {
    border-left: 3px solid #C91E1E;
    padding-left: 14px;
    color: #666;
    font-style: italic;
    margin: 12px 0;
}
.ql-editor a { color: #C91E1E; text-decoration: underline; }
.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
.ql-snow .ql-color-picker .ql-picker-item:hover { border-color: #C91E1E !important; }
`;

let quillStylesInjected = false;
let quillScriptLoaded = false;

function injectQuillAssets(callback: () => void) {
    // Inject CSS once
    if (!document.getElementById("quill-snow-css")) {
        const link = document.createElement("link");
        link.id = "quill-snow-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css";
        document.head.appendChild(link);
    }
    // Inject custom styles once
    if (!quillStylesInjected) {
        const style = document.createElement("style");
        style.id = "quill-custom-styles";
        style.textContent = QUILL_STYLES;
        document.head.appendChild(style);
        quillStylesInjected = true;
    }
    // Load Quill JS once
    if ((window as any).Quill) {
        callback();
        return;
    }
    if (quillScriptLoaded) {
        // Script loading in progress — wait
        const interval = setInterval(() => {
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
    const editorDivRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const isExternalUpdate = useRef(false);
    const wordCountRef = useRef<HTMLSpanElement>(null);
    const charCountRef = useRef<HTMLSpanElement>(null);

    const updateCounts = useCallback((quill: any) => {
        const text = quill.getText().trim();
        const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
        const chars = Math.max(0, quill.getLength() - 1);
        if (wordCountRef.current) wordCountRef.current.textContent = String(words);
        if (charCountRef.current) charCountRef.current.textContent = String(chars);
    }, []);

    useEffect(() => {
        injectQuillAssets(() => {
            if (!editorDivRef.current || quillRef.current) return;
            const Quill = (window as any).Quill;

            quillRef.current = new Quill(editorDivRef.current, {
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

            // Set initial HTML
            quillRef.current.clipboard.dangerouslyPasteHTML(value || "");

            quillRef.current.on("text-change", () => {
                if (!isExternalUpdate.current) {
                    onChange(quillRef.current.root.innerHTML);
                    updateCounts(quillRef.current);
                }
            });

            updateCounts(quillRef.current);
        });

        return () => {
            // Quill doesn't have a destroy method in v2 — just clear ref
            quillRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sync external value changes (e.g. Cancel button)
    useEffect(() => {
        if (!quillRef.current) return;
        const currentHtml = quillRef.current.root.innerHTML;
        if (currentHtml !== value) {
            isExternalUpdate.current = true;
            quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
            updateCounts(quillRef.current);
            isExternalUpdate.current = false;
        }
    }, [value, updateCounts]);

    return (
        <div className="overflow-hidden rounded-lg border border-[#D8D8D8] bg-white shadow-sm">
            {/* Quill mounts here — toolbar + editor area */}
            <div ref={editorDivRef} />

            {/* Footer: word / char count */}
            <div className="flex items-center justify-end gap-4 border-t border-[#EFEFEF] bg-[#F7F8FA] px-5 py-2.5">
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

// ─── Sub-components ───────────────────────────────────────────────────────────

type MenuButtonProps = {
    active: boolean;
    icon: NavItem["icon"];
    label: string;
    onClick: () => void;
};

function MenuButton({ active, icon: Icon, label, onClick }: MenuButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-4 rounded-sm border bg-[#E8E9EC52] px-7 py-5 text-left text-[18px] font-medium text-[#4B4B4B] transition-colors",
                active ? "border-primary bg-white" : "border-transparent hover:border-[#E8B4B4]/60"
            )}
        >
            <Icon className="h-5 w-5 shrink-0 text-[#4B4B4B]" />
            <span>{label}</span>
        </button>
    );
}

type FieldCardProps = {
    label: string;
    value: string;
    icon: "edit" | "check";
    onChange: (value: string) => void;
};

function FieldCard({ label, value, icon, onChange }: FieldCardProps) {
    return (
        <div className="flex items-center gap-4 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5">
            <div className="min-w-0 flex-1">
                <p className="text-[14px] leading-none font-normal text-[#6C6C6C]">{label}</p>
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="mt-2 w-full border-none bg-transparent p-0 text-[18px] lg:text-[20px] leading-tight font-normal text-[#5A5A5A] outline-none"
                />
            </div>
            <span className="shrink-0 text-[#4B4B4B]">
                {icon === "edit" ? <Pencil className="h-5 w-5" /> : <Check className="h-6 w-6" />}
            </span>
        </div>
    );
}

type PasswordFieldProps = {
    id: keyof PasswordState;
    label: string;
    value: string;
    visible: boolean;
    onChange: (value: string) => void;
    onToggle: () => void;
};

function PasswordField({ id, label, value, visible, onChange, onToggle }: PasswordFieldProps) {
    return (
        <div className="relative bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.04)] sm:px-5">
            <label htmlFor={id} className="block text-[14px] leading-none font-normal text-[#6C6C6C]">
                {label}
            </label>
            <input
                id={id}
                type={visible ? "text" : "password"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 w-full border-none bg-transparent p-0 pr-10 text-[18px] lg:text-[20px] leading-tight font-normal text-[#5A5A5A] outline-none"
            />
            <button
                type="button"
                onClick={onToggle}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-[#4B4B4B] sm:right-5"
                aria-label={visible ? `Hide ${label}` : `Show ${label}`}
            >
                {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>("personal");
    const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);
    const [savedPersonalInfo, setSavedPersonalInfo] = useState(defaultPersonalInfo);
    const [profileImagePreview, setProfileImagePreview] = useState("/image/men.png");
    const [savedProfileImagePreview, setSavedProfileImagePreview] = useState("/image/men.png");
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [passwords, setPasswords] = useState(defaultPasswordState);
    const [savedPasswords, setSavedPasswords] = useState(defaultPasswordState);
    const [aboutContent, setAboutContent] = useState(defaultAboutContent);
    const [savedAboutContent, setSavedAboutContent] = useState(defaultAboutContent);
    const [privacyContent, setPrivacyContent] = useState(defaultPrivacyContent);
    const [savedPrivacyContent, setSavedPrivacyContent] = useState(defaultPrivacyContent);
    const [termsContent, setTermsContent] = useState(defaultTermsContent);
    const [savedTermsContent, setSavedTermsContent] = useState(defaultTermsContent);

    const { data } = useGetSettingsQuery(undefined);
    const { data: userProfileData } = useUserProfileQuery(undefined);

    const [updateSettings, { isLoading: isSavingSettings }] = useUpdateSettingsMutation();
    const [updateProfile, { isLoading: isSavingProfile }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

    const [showPasswords, setShowPasswords] = useState<Record<keyof PasswordState, boolean>>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    // Load settings from API
    useEffect(() => {
        const settings = data?.data;
        if (!settings) return;
        let isMounted = true;
        queueMicrotask(() => {
            if (!isMounted) return;
            const about = settings.about_us || defaultAboutContent;
            const privacy = settings.legal_privacy_policy || defaultPrivacyContent;
            const terms = settings.legal_terms_of_use_policy || defaultTermsContent;
            setAboutContent(about);
            setSavedAboutContent(about);
            setPrivacyContent(privacy);
            setSavedPrivacyContent(privacy);
            setTermsContent(terms);
            setSavedTermsContent(terms);
        });
        return () => { isMounted = false; };
    }, [data]);

    // Load profile from API
    useEffect(() => {
        const profile = userProfileData?.data;
        if (!profile) return;
        let isMounted = true;
        queueMicrotask(() => {
            if (!isMounted) return;
            const nextPersonalInfo = {
                name: profile.name || defaultPersonalInfo.name,
                phone: profile.phone || defaultPersonalInfo.phone,
                country: profile.country || defaultPersonalInfo.country,
                currentAddress: profile.current_address || defaultPersonalInfo.currentAddress,
                dateOfBirth: profile.date_of_birth || defaultPersonalInfo.dateOfBirth,
            };
            setPersonalInfo(nextPersonalInfo);
            setSavedPersonalInfo(nextPersonalInfo);
            const nextProfileImage = profile.profile_image || "/image/men.png";
            setProfileImagePreview(nextProfileImage);
            setSavedProfileImagePreview(nextProfileImage);
        });
        return () => { isMounted = false; };
    }, [userProfileData]);

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        };
    }, []);

    const handleUploadPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        const nextUrl = URL.createObjectURL(file);
        objectUrlRef.current = nextUrl;
        setProfileImagePreview(nextUrl);
        setProfileImageFile(file);
    };

    const handleCancel = () => {
        switch (activeTab) {
            case "personal":
                setPersonalInfo(savedPersonalInfo);
                setProfileImagePreview(savedProfileImagePreview);
                setProfileImageFile(null);
                break;
            case "password": setPasswords(savedPasswords); break;
            case "about": setAboutContent(savedAboutContent); break;
            case "privacy": setPrivacyContent(savedPrivacyContent); break;
            case "terms": setTermsContent(savedTermsContent); break;
        }
    };

    const handleSave = async () => {
        try {
            switch (activeTab) {
                case "personal": {
                    const formData = new FormData();
                    formData.append("name", personalInfo.name);
                    formData.append("phone", personalInfo.phone);
                    formData.append("country", personalInfo.country);
                    formData.append("current_address", personalInfo.currentAddress);
                    formData.append("date_of_birth", personalInfo.dateOfBirth);
                    if (profileImageFile) formData.append("profile_image", profileImageFile);
                    await updateProfile(formData).unwrap();
                    setSavedPersonalInfo(personalInfo);
                    setSavedProfileImagePreview(profileImagePreview);
                    setProfileImageFile(null);
                    toast.success("Profile updated successfully");
                    break;
                }
                case "password": {
                    if (!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword) {
                        toast.error("Please fill in all password fields");
                        return;
                    }
                    if (passwords.newPassword !== passwords.confirmPassword) {
                        toast.error("New password confirmation does not match");
                        return;
                    }
                    await changePassword({
                        old_password: passwords.oldPassword,
                        new_password: passwords.newPassword,
                        new_password_confirm: passwords.confirmPassword,
                    }).unwrap();
                    setPasswords(defaultPasswordState);
                    setSavedPasswords(defaultPasswordState);
                    setShowPasswords({ oldPassword: false, newPassword: false, confirmPassword: false });
                    toast.success("Password changed successfully");
                    break;
                }
                case "about": {
                    await updateSettings({ about_us: aboutContent }).unwrap();
                    setSavedAboutContent(aboutContent);
                    toast.success("About Us updated successfully");
                    break;
                }
                case "privacy": {
                    await updateSettings({ legal_privacy_policy: privacyContent }).unwrap();
                    setSavedPrivacyContent(privacyContent);
                    toast.success("Privacy Policy updated successfully");
                    break;
                }
                case "terms": {
                    await updateSettings({ legal_terms_of_use_policy: termsContent }).unwrap();
                    setSavedTermsContent(termsContent);
                    toast.success("Terms of Use updated successfully");
                    break;
                }
            }
        } catch (error: any) {
            toast.error(extractApiErrorMessage(error));
            console.error(error);
        }
    };

    const isSaving =
        activeTab === "personal"
            ? isSavingProfile
            : activeTab === "password"
                ? isChangingPassword
                : isSavingSettings;

    const renderPanel = () => {
        if (activeTab === "personal") {
            return (
                <div className="animate-in fade-in duration-500">
                    <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                        Personal Information
                    </h1>
                    <div className="mt-8 flex flex-col items-center">
                        <div className="relative h-[170px] w-[170px] overflow-hidden rounded-full bg-[#ECEDEF] sm:h-[200px] sm:w-[200px]">
                            <img
                                src={profileImagePreview}
                                alt="Profile photo"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleUploadPhoto}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-5 inline-flex items-center gap-3 border border-[#D8D8D8] bg-white px-5 py-3 text-[16px] font-medium text-[#1F1F1F] transition-colors hover:bg-[#F8F8F8]"
                        >
                            <ImageUp className="h-5 w-5" />
                            <span>Upload Photo</span>
                        </button>
                    </div>
                    <div className="mt-8 rounded-sm bg-[#E8E9EC52] p-4 sm:p-6">
                        <div className="space-y-5">
                            <FieldCard label="Your name" value={personalInfo.name} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, name: v }))} />
                            <FieldCard label="Phone number" value={personalInfo.phone} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, phone: v }))} />
                            <FieldCard label="Country" value={personalInfo.country} icon="check" onChange={(v) => setPersonalInfo((c) => ({ ...c, country: v }))} />
                            <FieldCard label="Current address" value={personalInfo.currentAddress} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, currentAddress: v }))} />
                            <FieldCard label="Date of birth" value={personalInfo.dateOfBirth} icon="edit" onChange={(v) => setPersonalInfo((c) => ({ ...c, dateOfBirth: v }))} />
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === "password") {
            return (
                <div className="animate-in fade-in duration-500">
                    <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                        Change Password
                    </h1>
                    <div className="mt-10 rounded-sm bg-[#E8E9EC52] p-4 sm:p-6">
                        <div className="space-y-4">
                            <PasswordField id="oldPassword" label="Old password" value={passwords.oldPassword} visible={showPasswords.oldPassword} onChange={(v) => setPasswords((c) => ({ ...c, oldPassword: v }))} onToggle={() => setShowPasswords((c) => ({ ...c, oldPassword: !c.oldPassword }))} />
                            <PasswordField id="newPassword" label="New password" value={passwords.newPassword} visible={showPasswords.newPassword} onChange={(v) => setPasswords((c) => ({ ...c, newPassword: v }))} onToggle={() => setShowPasswords((c) => ({ ...c, newPassword: !c.newPassword }))} />
                            <PasswordField id="confirmPassword" label="Confirm new password" value={passwords.confirmPassword} visible={showPasswords.confirmPassword} onChange={(v) => setPasswords((c) => ({ ...c, confirmPassword: v }))} onToggle={() => setShowPasswords((c) => ({ ...c, confirmPassword: !c.confirmPassword }))} />
                        </div>
                    </div>
                </div>
            );
        }

        const editorConfig: Record<"about" | "privacy" | "terms", { title: string; content: string; setter: (v: string) => void }> = {
            about: { title: "About Us", content: aboutContent, setter: setAboutContent },
            privacy: { title: "Privacy Policy", content: privacyContent, setter: setPrivacyContent },
            terms: { title: "Terms of Use", content: termsContent, setter: setTermsContent },
        };

        const cfg = editorConfig[activeTab as "about" | "privacy" | "terms"];

        return (
            <div className="animate-in fade-in duration-500">
                <h1 className="text-base leading-tight font-medium italic text-secondary sm:text-[20px]">
                    {cfg.title}
                </h1>
                <div className="mt-8">
                    <RichTextEditor
                        value={cfg.content}
                        onChange={cfg.setter}
                        placeholder={`Write your ${cfg.title.toLowerCase()} here...`}
                    />
                </div>
            </div>
        );
    };

    return (
        <section className="mx-auto grid grid-cols-1 gap-5 pb-10 xl:grid-cols-[460px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className="h-fit rounded-[20px] border border-[#E2E7F1] bg-white p-5 sm:p-6 xl:sticky xl:top-6">
                <div className="space-y-4">
                    {navItems.map((item) => (
                        <MenuButton
                            key={item.id}
                            active={activeTab === item.id}
                            icon={item.icon}
                            label={item.label}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </div>
            </aside>

            {/* Content Panel */}
            <section className="flex min-h-[600px] flex-col rounded-[20px] border border-[#E2E7F1] bg-white p-5 sm:p-6 lg:p-7">
                <div className="flex-1">{renderPanel()}</div>

                {/* Action Buttons */}
                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex min-h-[58px] items-center justify-center border border-[#D7D7D7] bg-white px-6 py-3 text-[16px] font-bold uppercase text-[#4B4B4B] transition-colors hover:bg-[#F8F8F8]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex min-h-[58px] items-center justify-center bg-[#C91E1E] px-6 py-3 text-[16px] font-bold uppercase text-white transition-colors hover:bg-[#AD1717] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSaving ? (
                            <span className="inline-flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </section>
        </section>
    );
}