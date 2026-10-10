const rawApiUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');
const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

const getToken = () => {
  return localStorage.getItem('token');
};

const fetchWithAuth = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (!response.ok && response.status === 401 && data.message === 'Invalid or expired token') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return data;
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
  register: async (data) => {
    const res = await fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) });
    if (res.success && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },
  login: async (data) => {
    const res = await fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(data) });
    if (res.success && res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return fetchWithAuth('/auth/logout', { method: 'POST' });
  },
  getMe: () => fetchWithAuth('/auth/me'),

  // WebAuthn Biometric Fingerprint Authentication
  biometric: {
    getStatus: () => fetchWithAuth('/biometric/status'),
    getRegisterOptions: () => fetchWithAuth('/biometric/register/options', { method: 'POST' }),
    verifyRegister: (response) =>
      fetchWithAuth('/biometric/register/verify', {
        method: 'POST',
        body: JSON.stringify({ response }),
      }),
    getAuthOptions: (emailOrVoterId) =>
      fetchWithAuth('/biometric/authenticate/options', {
        method: 'POST',
        body: JSON.stringify({ emailOrVoterId }),
      }),
    verifyAuth: async (response) => {
      const res = await fetchWithAuth('/biometric/authenticate/verify', {
        method: 'POST',
        body: JSON.stringify({ response }),
      });
      if (res.success && res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      }
      return res;
    },
    revokeCredential: (id) =>
      fetchWithAuth(`/biometric/credentials/${id}`, { method: 'DELETE' }),
  },

  // Elections
  getElections: () => fetchWithAuth('/elections'),
  getElectionById: (id) => fetchWithAuth(`/elections/${id}`),

  // Candidates
  getCandidatesByElection: (electionId) => fetchWithAuth(`/candidates?electionId=${electionId}`),

  // Votes
  castVote: (data) => fetchWithAuth('/votes', { method: 'POST', body: JSON.stringify(data) }),
  getMyVotes: () => fetchWithAuth('/votes/my-votes'),
  checkVoteStatus: (electionId) => fetchWithAuth(`/votes/check/${electionId}`),

  // Results
  getResults: (electionId) => fetchWithAuth(`/results/${electionId}`),

  // Admin
  admin: {
    getDashboard: () => fetchWithAuth('/admin/dashboard'),
    getUsers: () => fetchWithAuth('/admin/users'),
    getVoters: () => fetchWithAuth('/admin/voters'),
    getElections: () => fetchWithAuth('/admin/elections'),
    getCandidates: () => fetchWithAuth('/admin/candidates'),
    getVotes: () => fetchWithAuth('/admin/votes'),
    getResults: () => fetchWithAuth('/admin/results'),
    getBiometricLogs: () => fetchWithAuth('/admin/biometric-logs'),
    
    createElection: (data) => fetchWithAuth('/elections', { method: 'POST', body: JSON.stringify(data) }),
    updateElection: (id, data) => fetchWithAuth(`/elections/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteElection: (id) => fetchWithAuth(`/elections/${id}`, { method: 'DELETE' }),
    
    addCandidate: (data) => fetchWithAuth('/candidates', { method: 'POST', body: JSON.stringify(data) }),
    updateCandidate: (id, data) => fetchWithAuth(`/candidates/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteCandidate: (id) => fetchWithAuth(`/candidates/${id}`, { method: 'DELETE' })
  }
};

export default api;
