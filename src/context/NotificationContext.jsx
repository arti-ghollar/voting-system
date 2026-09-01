import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((previous) =>
      previous.filter((notification) => notification.id !== id)
    );
  }, []);

  const notify = useCallback(
    (message, type = "info", duration = 4000) => {
      const id = Date.now() + Math.random();

      setNotifications((previous) => [
        ...previous,
        {
          id,
          message,
          type,
        },
      ]);

      if (duration > 0) {
        window.setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification]
  );

  const success = useCallback((message) => notify(message, "success"), [notify]);
  const error = useCallback((message) => notify(message, "error"), [notify]);
  const warning = useCallback((message) => notify(message, "warning"), [notify]);
  const info = useCallback((message) => notify(message, "info"), [notify]);

  const value = useMemo(
    () => ({
      notifications,
      notify,
      success,
      error,
      warning,
      info,
      removeNotification,
    }),
    [notifications, notify, success, error, warning, info, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "min(360px, calc(100vw - 40px))",
        }}
      >
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              padding: "13px 15px",
              borderRadius: 10,
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
              color: "#111827",
              fontSize: 14,
            }}
          >
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used inside NotificationProvider"
    );
  }

  return context;
};

export default NotificationContext;