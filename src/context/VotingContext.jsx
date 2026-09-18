import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const VotingContext = createContext(null);

const STORAGE_KEY = "blockvote_votes";

const getInitialVotes = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const VotingProvider = ({ children }) => {
  const [votes, setVotes] = useState(getInitialVotes);

  const castVote = useCallback((voteData) => {
    const vote = {
      id: `VOTE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: "Confirmed",
      votingMethod: voteData.votingMethod || "ONLINE",
      ...voteData,
    };

    setVotes((previous) => {
      const updated = [vote, ...previous];

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return updated;
    });

    return vote;
  }, []);

  const hasVoted = useCallback((electionId, voterId) => {
    return votes.some(
      (vote) =>
        vote.electionId === electionId &&
        vote.voterId === voterId
    );
  }, [votes]);

  const clearVotes = useCallback(() => {
    setVotes([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({
      votes,
      castVote,
      hasVoted,
      clearVotes,
    }),
    [votes, castVote, hasVoted, clearVotes]
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