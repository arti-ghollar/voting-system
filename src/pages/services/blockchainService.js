import api from "./api";

const blockchainService = {
  getNetworkStatus() {
    return api.get("/blockchain/status");
  },

  getRecords(params = {}) {
    const query = new URLSearchParams(params).toString();

    return api.get(
      query ? `/blockchain/records?${query}` : "/blockchain/records"
    );
  },

  getTransaction(txHash) {
    return api.get(
      `/blockchain/transaction/${encodeURIComponent(txHash)}`
    );
  },

  verifyTransaction(txHash) {
    return api.get(
      `/blockchain/verify/${encodeURIComponent(txHash)}`
    );
  },
};

export default blockchainService;