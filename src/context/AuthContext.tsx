import React, { createContext, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, logoutUser } from "../api/auth";
import type { AuthContextType, User } from "../types/auth";




const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const {data: user, isLoading} = useQuery<User | null>({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const logout = async() => {
    try {
      await logoutUser();
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