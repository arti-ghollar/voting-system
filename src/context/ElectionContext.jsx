import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { api } from "../services/api";
import { useAuth } from "./AuthContext";

const ElectionContext = createContext(null);

export const ElectionProvider = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [elections, setElections] = useState([]);
  const [selectedElection, setSelectedElection] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchElections = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      // If admin, fetch all elections. If voter, fetch active elections
      const res = isAdmin ? await api.admin.getElections() : await api.getElections(); // assuming a GET /api/admin/elections is identical to GET /api/elections for simplicity or if they differ
      if (res.success) {
        setElections(res.elections);
        if (res.elections.length > 0 && !selectedElection) {
          setSelectedElection(res.elections[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin]);

  useEffect(() => {
    fetchElections();
  }, [fetchElections]);

  const addElection = useCallback(async (electionData) => {
    try {
      const res = await api.admin.createElection(electionData);
      if (res.success) {
        await fetchElections();
        return { ...electionData, id: res.id };
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [fetchElections]);

  const updateElection = useCallback(async (id, updates) => {
    try {
      const res = await api.admin.updateElection(id, updates);
      if (res.success) {
        await fetchElections();
      }
    } catch (error) {
      console.error(error);
    }
  }, [fetchElections]);

  const removeElection = useCallback(async (id) => {
    try {
      const res = await api.admin.deleteElection(id);
      if (res.success) {
        await fetchElections();
        if (selectedElection?.id === id) {
          setSelectedElection(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [fetchElections, selectedElection]);

  const value = useMemo(
    () => ({
      elections,
      loading,
      selectedElection,
      setSelectedElection,
      addElection,
      updateElection,
      removeElection,
      refreshElections: fetchElections
    }),
    [elections, loading, selectedElection, addElection, updateElection, removeElection, fetchElections]
  );

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => {
  const context = useContext(ElectionContext);

  if (!context) {
    throw new Error(
      "useElection must be used inside ElectionProvider"
    );
  }

  return context;
};

export default ElectionContext;