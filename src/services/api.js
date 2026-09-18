const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchWithSession = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return await response.json();
    } else {
      return { success: false, message: `Server returned non-JSON response (${response.status})` };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const api = {
  // Auth
  register: (data) => fetchWithSession('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => fetchWithSession('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => fetchWithSession('/auth/logout', { method: 'POST' }),
  getMe: () => fetchWithSession('/auth/me'),

  // Elections
  getElections: () => fetchWithSession('/elections'),
  getElectionById: (id) => fetchWithSession(`/elections/${id}`),

  // Candidates
  getCandidatesByElection: (electionId) => fetchWithSession(`/candidates/election/${electionId}`),

  // Votes
  castVote: (data) => fetchWithSession('/votes', { method: 'POST', body: JSON.stringify(data) }),
  getMyVotes: () => fetchWithSession('/votes/my-votes'),

  // Results
  getResults: (electionId) => fetchWithSession(`/results/${electionId}`),

  // Admin
  admin: {
    getStatistics: () => fetchWithSession('/admin/statistics'),
    getUsers: () => fetchWithSession('/admin/users'),
    createElection: (data) => fetchWithSession('/admin/elections', { method: 'POST', body: JSON.stringify(data) }),
    updateElection: (id, data) => fetchWithSession(`/admin/elections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteElection: (id) => fetchWithSession(`/admin/elections/${id}`, { method: 'DELETE' }),
    addCandidate: (data) => fetchWithSession('/admin/candidates', { method: 'POST', body: JSON.stringify(data) }),
    updateCandidate: (id, data) => fetchWithSession(`/admin/candidates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteCandidate: (id) => fetchWithSession(`/admin/candidates/${id}`, { method: 'DELETE' })
  }
};
