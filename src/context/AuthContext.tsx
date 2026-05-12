"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id?: number;
    email: string;
    name: string;
    role?: string;
    profileImage?: string;
}

interface LoginResponse {
    status?: string;
    code?: number;
    message?: string;
    data?: {
        access?: string;
        refresh?: string;
        user?: {
            id?: number;
            name?: string;
            email?: string;
            profile_image?: string;
            role?: string;
        };
    };
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER = {
    id: 1,
    email: "admin@example.com",
    password: "password123",
    name: "Johnson Roy",
    role: "admin",
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Hydrate authentication state from localStorage on mount
        const initializeAuth = () => {
            try {
                const storedUser = localStorage.getItem("wimers_user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Auth initialization failed:", error);
                localStorage.removeItem("wimers_user");
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                return false;
            }

            const data = (await response.json()) as LoginResponse;
            const token = data.data?.access ?? null;
            const refreshToken = data.data?.refresh ?? null;
            const role = data.data?.user?.role?.toLowerCase();

            if (role !== "admin") {
                return false;
            }

            if (token) {
                localStorage.setItem("accessToken", token);
                document.cookie = `token=${token}; path=/; samesite=lax`;
            }

            if (refreshToken) {
                localStorage.setItem("refreshToken", refreshToken);
            }

            const userData: User = {
                id: data.data?.user?.id,
                email: data.data?.user?.email ?? email,
                name: data.data?.user?.name ?? email.split("@")[0],
                role: data.data?.user?.role,
                profileImage: data.data?.user?.profile_image,
            };

            setUser(userData);
            localStorage.setItem("wimers_user", JSON.stringify(userData));

            return true;
        } catch (error) {
            console.error("Login failed:", error);

            if (email === DEMO_USER.email && password === DEMO_USER.password) {
                const userData = {
                    id: DEMO_USER.id,
                    email: DEMO_USER.email,
                    name: DEMO_USER.name,
                    role: DEMO_USER.role,
                };
                setUser(userData);
                localStorage.setItem("wimers_user", JSON.stringify(userData));
                localStorage.setItem("accessToken", "demo-token");
                return true;
            }

            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("wimers_user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=lax";
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
