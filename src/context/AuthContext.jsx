import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "blockvote_auth_user";

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);

    try {
      let role = "voter";
      const email = credentials.email.toLowerCase();
      
      if (email.includes("admin")) {
        role = "admin";
      } else if (email.includes("center")) {
        role = "center_operator";
      } else if (email.includes("officer")) {
        role = "home_officer";
      } else if (credentials.role) {
        role = credentials.role;
      }

      const loggedInUser = {
        id: credentials.email || "demo-user",
        name: credentials.name || "Demo User",
        email: credentials.email || "demo@blockvote.local",
        role: role,
        voterId: `VT-${Math.floor(Math.random() * 90000) + 10000}`,
      };

      setUser(loggedInUser);

      return {
        success: true,
        user: loggedInUser,
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (userData) => {
    return login(userData);
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
      {children}
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