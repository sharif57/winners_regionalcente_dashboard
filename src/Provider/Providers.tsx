"use client";

import { useEffect } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { getTokenExpiryMs } from "@/lib/jwt";
import { clearAuthStorage, notifyAuthLogout } from "@/lib/auth-storage";

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return;
    }

    const logout = () => {
      clearAuthStorage();
      notifyAuthLogout();

      const isOnAuthRoute = window.location.pathname.startsWith("/auth");

      if (!isOnAuthRoute) {
        router.replace("/auth/login");
        router.refresh();
      }
    };

    const expiryMs = getTokenExpiryMs(token);

    if (expiryMs === null) {
      return;
    }

    const remainingMs = expiryMs - Date.now();

    if (remainingMs <= 0) {
      logout();
      return;
    }

    const timerId = window.setTimeout(logout, remainingMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [pathname, router]);

  return (
    <Provider store={store}>
      <Toaster
        position="top-right"
        richColors
        closeButton
        theme="light"
      />
      {children}
    </Provider>
  );
}
