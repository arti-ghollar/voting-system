import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================================================
// LAYOUT COMPONENTS
// =====================================================
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// =====================================================
// COMMON COMPONENTS
// =====================================================
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// =====================================================
// PUBLIC PAGES
// =====================================================
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// =====================================================
// VOTER PAGES
// =====================================================
import VoterDashboard from "./pages/VoterDashboard/VoterDashboard";
import Elections from "./pages/Elections/Elections";
import CastVote from "./pages/CastVote/CastVote";
import VoteConfirmation from "./pages/VoteConfirmation/VoteConfirmation";
import VotingStatus from "./pages/VotingStatus/VotingStatus";
import Profile from "./pages/Profile/Profile";

// =====================================================
// ADMIN PAGES
// =====================================================
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ManageVoters from "./pages/ManageVoters/ManageVoters";
import ManageCandidates from "./pages/ManageCandidates/ManageCandidates";
import ManageElections from "./pages/ManageElections/ManageElections";
import VotingMonitor from "./pages/VotingMonitor/VotingMonitor";
import BlockchainRecords from "./pages/BlockchainRecords/BlockchainRecords";
import Results from "./pages/Results/Results";

// =====================================================
// CONTEXT PROVIDERS
// =====================================================
import { AuthProvider } from "./context/AuthContext";
import { BlockchainProvider } from "./context/BlockchainContext";
import { ElectionProvider } from "./context/ElectionContext";
import { VotingProvider } from "./context/VotingContext";
import { NotificationProvider } from "./context/NotificationContext";

// =====================================================
// 404 PAGE
// =====================================================
import NotFound from "./pages/NotFound/NotFound";

// =====================================================
// GLOBAL APP CSS
// =====================================================
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BlockchainProvider>
          <ElectionProvider>
            <VotingProvider>
              <NotificationProvider>
                <div className="app">

                  {/* =================================================
                      NAVBAR
                  ================================================= */}
                  <Navbar />

                  {/* =================================================
                      MAIN CONTENT
                  ================================================= */}
                  <main className="app-main">
                    <Routes>

                      {/* =================================================
                          PUBLIC ROUTES
                      ================================================= */}

                      {/* Home */}
                      <Route
                        path="/"
                        element={<Home />}
                      />

                      {/* About */}
                      <Route
                        path="/about"
                        element={<About />}
                      />

                      {/* How It Works */}
                      <Route
                        path="/how-it-works"
                        element={<HowItWorks />}
                      />

                      {/* Contact */}
                      <Route
                        path="/contact"
                        element={<Contact />}
                      />

                      {/* Login */}
                      <Route
                        path="/login"
                        element={<Login />}
                      />

                      {/* Register */}
                      <Route
                        path="/register"
                        element={<Register />}
                      />

                      {/* =================================================
                          VOTER ROUTES
                      ================================================= */}

                      {/* Voter Dashboard */}
                      <Route
                        path="/voter-dashboard"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <VoterDashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* Elections */}
                      <Route
                        path="/elections"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <Elections />
                          </ProtectedRoute>
                        }
                      />

                      {/* Cast Vote */}
                      <Route
                        path="/cast-vote/:electionId"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <CastVote />
                          </ProtectedRoute>
                        }
                      />

                      {/* Vote Confirmation */}
                      <Route
                        path="/vote-confirmation"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <VoteConfirmation />
                          </ProtectedRoute>
                        }
                      />

                      {/* Voting Status */}
                      <Route
                        path="/voting-status"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <VotingStatus />
                          </ProtectedRoute>
                        }
                      />

                      {/* Profile */}
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <Profile />
                          </ProtectedRoute>
                        }
                      />

                      {/* =================================================
                          ADMIN ROUTES
                      ================================================= */}

                      {/* Admin Dashboard */}
                      <Route
                        path="/admin-dashboard"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <AdminDashboard />
                          </ProtectedRoute>
                        }
                      />

                      {/* Manage Voters */}
                      <Route
                        path="/admin/voters"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <ManageVoters />
                          </ProtectedRoute>
                        }
                      />

                      {/* Manage Candidates */}
                      <Route
                        path="/admin/candidates"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <ManageCandidates />
                          </ProtectedRoute>
                        }
                      />

                      {/* Manage Elections */}
                      <Route
                        path="/admin/elections"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <ManageElections />
                          </ProtectedRoute>
                        }
                      />

                      {/* Voting Monitor */}
                      <Route
                        path="/admin/voting-monitor"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <VotingMonitor />
                          </ProtectedRoute>
                        }
                      />

                      {/* Blockchain Records */}
                      <Route
                        path="/admin/blockchain-records"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <BlockchainRecords />
                          </ProtectedRoute>
                        }
                      />

                      {/* Results */}
                      <Route
                        path="/admin/results"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <Results />
                          </ProtectedRoute>
                        }
                      />

                      {/* =================================================
                          404 - PAGE NOT FOUND
                      ================================================= */}
                      <Route
                        path="*"
                        element={<NotFound />}
                      />

                    </Routes>
                  </main>

                  {/* =================================================
                      FOOTER
                  ================================================= */}
                  <Footer />

                </div>
              </NotificationProvider>
            </VotingProvider>
          </ElectionProvider>
        </BlockchainProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;