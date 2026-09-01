import api from "./api";

const candidateService = {
  getCandidates(params = {}) {
    const query = new URLSearchParams(params).toString();

    return api.get(
      query ? `/candidates?${query}` : "/candidates"
    );
  },

  getCandidateById(id) {
    return api.get(`/candidates/${encodeURIComponent(id)}`);
  },

  createCandidate(candidateData) {
    return api.post("/candidates", candidateData);
  },

  updateCandidate(id, candidateData) {
    return api.put(
      `/candidates/${encodeURIComponent(id)}`,
      candidateData
    );
  },

  deleteCandidate(id) {
    return api.delete(`/candidates/${encodeURIComponent(id)}`);
  },
};

export default candidateService;