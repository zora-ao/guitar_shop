import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "../utils/api";

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () =>  void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const {data: user, isLoading} = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          method: 'GET',
          credentials: 'include'
        });
        if (!res.ok) return null;

        const data = await res.json();

        return data.user || data;

      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const logout = async() => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: 'include'
      });
    } catch (error) {
      console.error("Backend logout failed", error);
    } finally {
      queryClient.setQueryData(['authUser'], null);
      queryClient.clear();
    }

  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};