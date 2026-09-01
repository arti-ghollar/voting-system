import api from "./api";

const voterService = {
  getVoters() {
    return api.get("/voters");
  },

  getVoterById(id) {
    return api.get(`/voters/${encodeURIComponent(id)}`);
  },

  createVoter(voterData) {
    return api.post("/voters", voterData);
  },

  updateVoter(id, voterData) {
    return api.put(
      `/voters/${encodeURIComponent(id)}`,
      voterData
    );
  },

  deleteVoter(id) {
    return api.delete(`/voters/${encodeURIComponent(id)}`);
  },
};

export default voterService;