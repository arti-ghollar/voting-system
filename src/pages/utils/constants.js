export const APP_NAME = "BlockVote";

export const USER_ROLES = {
  ADMIN: "admin",
  VOTER: "voter",
  CANDIDATE: "candidate",
};

export const ELECTION_STATUS = {
  DRAFT: "Draft",
  SCHEDULED: "Scheduled",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const VOTE_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  FAILED: "Failed",
};

export const TRANSACTION_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  FAILED: "Failed",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  VOTER_DASHBOARD: "/voter-dashboard",
  ADMIN_DASHBOARD: "/admin-dashboard",
  ELECTIONS: "/elections",
  CAST_VOTE: "/cast-vote",
  VOTE_CONFIRMATION: "/vote-confirmation",
  RESULTS: "/results",
};

export const BLOCKCHAIN = {
  DEFAULT_NETWORK: "Ethereum",
  CONFIRMATIONS_REQUIRED: 3,
};

export default {
  APP_NAME,
  USER_ROLES,
  ELECTION_STATUS,
  VOTE_STATUS,
  TRANSACTION_STATUS,
  ROUTES,
  BLOCKCHAIN,
};