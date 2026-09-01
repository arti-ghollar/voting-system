import api from "./api";

const electionService = {
  getElections(params = {}) {
    const query = new URLSearchParams(params).toString();

    return api.get(
      query ? `/elections?${query}` : "/elections"
    );
  },

  getElectionById(id) {
    return api.get(`/elections/${encodeURIComponent(id)}`);
  },

  createElection(electionData) {
    return api.post("/elections", electionData);
  },

  updateElection(id, electionData) {
    return api.put(
      `/elections/${encodeURIComponent(id)}`,
      electionData
    );
  },

  deleteElection(id) {
    return api.delete(`/elections/${encodeURIComponent(id)}`);
  },

  getElectionResults(id) {
    return api.get(
      `/elections/${encodeURIComponent(id)}/results`
    );
  },
};

export default electionService;