export const AUTH_LOGOUT_EVENT = "wimers:auth-logout";

export function clearAuthStorage() {
  localStorage.removeItem("wimers_user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax";
}

export function notifyAuthLogout() {
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
}
