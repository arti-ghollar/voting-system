import api from "./api";

const votingService = {
  castVote(voteData) {
    return api.post("/votes", voteData);
  },

  getVoteStatus(voteId) {
    return api.get(`/votes/${encodeURIComponent(voteId)}`);
  },

  getVotingHistory(voterId) {
    return api.get(
      `/votes/history/${encodeURIComponent(voterId)}`
    );
  },

  getVotingStatistics(electionId) {
    return api.get(
      `/votes/statistics/${encodeURIComponent(electionId)}`
    );
  },
};

export default votingService;