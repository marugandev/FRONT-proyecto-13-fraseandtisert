import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {
  saveAuthToLocalStorage,
  clearAuthFromLocalStorage,
  getTokenFromLocalStorage,
  getUserIdFromLocalStorage
} from "../../utils/authLocalStorage";
import { registerApi } from "../../api/auth/registerApi";
import { loginApi } from "../../api/auth/loginApi";
import { getUserById } from "../../api/user/getUserById";

import type { RegisterReq } from "../../types/auth/register";
import type { LoginReq } from "../../types/auth/login";
import type { User } from "../../types/auth/user";
import useModal from "../Modal/useModal";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const userId = getUserIdFromLocalStorage();
      const token = getTokenFromLocalStorage();

      if (!userId || !token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const res = await getUserById(userId, token);
        if (res.status === "success" && res.data) {
          setUser(res.data);
        } else {
          clearAuthFromLocalStorage();
          openModal(
            "info",
            "No se pudo cargar el usuario. Por favor inicia sesión de nuevo",
            "error"
          );
        }
      } catch {
        clearAuthFromLocalStorage();
        openModal(
          "info",
          "Error al verificar la sesión. Por favor inicia sesión de nuevo.",
          "error"
        );
      } finally {
        setIsAuthLoading(false);
      }
    };

    loadUserFromStorage();
  }, [openModal]);

  const registerUser = async (data: RegisterReq) => {
    const res = await registerApi(data);
    if (res.status === "success" && res.data) {
      const { user: userFromApi, token } = res.data;
      const userWithRole: User = {
        ...userFromApi,
        role: userFromApi.role as "user" | "admin"
      };
      setUser(userWithRole);
      saveAuthToLocalStorage(userWithRole._id, token);
    } else {
      throw new Error(res.message || "Error al registrarse");
    }
  };

  const loginUser = async (data: LoginReq) => {
    const res = await loginApi(data);
    if (res.status === "success" && res.data) {
      const { user: userFromApi, token } = res.data;
      const userWithRole: User = {
        ...userFromApi,
        role: userFromApi.role as "user" | "admin"
      };
      setUser(userWithRole);
      saveAuthToLocalStorage(userWithRole._id, token);
    } else {
      throw new Error(res.message || "Error al iniciar sesión");
    }
  };

  const logoutUser = () => {
    setUser(null);
    clearAuthFromLocalStorage();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        isAuthLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
