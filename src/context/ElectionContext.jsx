import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const ElectionContext = createContext(null);

const initialElections = [
  {
    id: "ELX-001",
    title: "General Election 2026",
    type: "General",
    status: "Active",
    startDate: "2026-09-10",
    endDate: "2026-09-12",
  },
  {
    id: "ELX-002",
    title: "Municipal Election 2026",
    type: "Municipal",
    status: "Scheduled",
    startDate: "2026-10-05",
    endDate: "2026-10-06",
  },
];

export const ElectionProvider = ({ children }) => {
  const [elections, setElections] = useState(initialElections);
  const [selectedElection, setSelectedElection] = useState(
    initialElections[0]
  );

  const addElection = useCallback((election) => {
    const newElection = {
      id: `ELX-${String(elections.length + 1).padStart(3, "0")}`,
      ...election,
    };

    setElections((previous) => [...previous, newElection]);

    return newElection;
  }, [elections.length]);

  const updateElection = useCallback((id, updates) => {
    setElections((previous) =>
      previous.map((election) =>
        election.id === id
          ? { ...election, ...updates }
          : election
      )
    );
  }, []);

  const removeElection = useCallback((id) => {
    setElections((previous) =>
      previous.filter((election) => election.id !== id)
    );

    if (selectedElection?.id === id) {
      setSelectedElection(null);
    }
  }, [selectedElection]);

  const value = useMemo(
    () => ({
      elections,
      selectedElection,
      setSelectedElection,
      addElection,
      updateElection,
      removeElection,
    }),
    [elections, selectedElection, addElection, updateElection, removeElection]
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