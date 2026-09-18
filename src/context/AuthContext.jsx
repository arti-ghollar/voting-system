import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.getMe();
        if (res.success) {
          setUser(res.user);
        }
      } catch (error) {
        console.error("Auth init error:", error);
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await api.login(credentials);
      if (res.success) {
        setUser(res.user);
      }
      return res;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Network error" };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.register(userData);
      if (res.success) {
        setUser(res.user);
      }
      return res;
    } catch (error) {
      console.error(error);
      return { success: false, message: "Network error" };
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      logout,
      register,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export default AuthContext;