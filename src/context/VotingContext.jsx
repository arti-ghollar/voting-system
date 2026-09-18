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

const VotingContext = createContext(null);

export const VotingProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVotes = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const res = await api.getMyVotes();
      if (res.success) {
        setVotes(res.votes);
      }
    } catch (error) {
      console.error("Error fetching votes:", error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchVotes();
  }, [fetchVotes]);

  const castVote = useCallback(async (voteData) => {
    try {
      const res = await api.castVote(voteData);
      if (res.success) {
        await fetchVotes();
        return { success: true, transactionId: res.transactionId };
      }
      return { success: false, message: res.message };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Network error" };
    }
  }, [fetchVotes]);

  const hasVoted = useCallback((electionId) => {
    return votes.some(
      (vote) => vote.election_id === electionId
    );
  }, [votes]);

  const clearVotes = useCallback(() => {
    setVotes([]);
  }, []);

  const value = useMemo(
    () => ({
      votes,
      loading,
      castVote,
      hasVoted,
      clearVotes,
      refreshVotes: fetchVotes
    }),
    [votes, loading, castVote, hasVoted, clearVotes, fetchVotes]
  );

  return (
    <VotingContext.Provider value={value}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => {
  const context = useContext(VotingContext);

  if (!context) {
    throw new Error(
      "useVoting must be used inside VotingProvider"
    );
  }

  return context;
};

export default VotingContext;