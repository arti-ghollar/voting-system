import { BrowserRouter, Routes, Route } from "react-router-dom";

// =====================================================
// LAYOUT COMPONENTS
// =====================================================
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

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
import VotingMethodSelection from "./pages/VotingMethodSelection/VotingMethodSelection";
import HomeVotingRequest from "./pages/HomeVotingRequest/HomeVotingRequest";
import VotingCenter from "./pages/VotingCenter/VotingCenter";
import HomeVotingOfficer from "./pages/HomeVotingOfficer/HomeVotingOfficer";

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
import AuditLogs from "./pages/AuditLogs/AuditLogs";
import ManageVotingCenters from "./pages/ManageVotingCenters/ManageVotingCenters";

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

      {/* =================================================
          SCROLL TO TOP
          Every route/page opens from the top
      ================================================= */}
      <ScrollToTop />

      {/* =================================================
          AUTH PROVIDER
      ================================================= */}
      <AuthProvider>

        {/* =================================================
            BLOCKCHAIN PROVIDER
        ================================================= */}
        <BlockchainProvider>

          {/* =================================================
              ELECTION PROVIDER
          ================================================= */}
          <ElectionProvider>

            {/* =================================================
                VOTING PROVIDER
            ================================================= */}
            <VotingProvider>

              {/* =================================================
                  NOTIFICATION PROVIDER
              ================================================= */}
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

                      {/* Voting Method Selection */}
                      <Route
                        path="/voting-method"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <VotingMethodSelection />
                          </ProtectedRoute>
                        }
                      />

                      {/* Home Voting Request */}
                      <Route
                        path="/home-voting-request"
                        element={
                          <ProtectedRoute
                            allowedRoles={["voter", "admin"]}
                          >
                            <HomeVotingRequest />
                          </ProtectedRoute>
                        }
                      />

                      {/* Voting Center Operator */}
                      <Route
                        path="/voting-center"
                        element={
                          <ProtectedRoute
                            allowedRoles={["center_operator", "admin"]}
                          >
                            <VotingCenter />
                          </ProtectedRoute>
                        }
                      />

                      {/* Home Voting Officer */}
                      <Route
                        path="/home-voting-officer"
                        element={
                          <ProtectedRoute
                            allowedRoles={["home_officer", "admin"]}
                          >
                            <HomeVotingOfficer />
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

                      {/* Audit Logs */}
                      <Route
                        path="/admin/audit-logs"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <AuditLogs />
                          </ProtectedRoute>
                        }
                      />

                      {/* Manage Voting Centers */}
                      <Route
                        path="/admin/voting-centers"
                        element={
                          <ProtectedRoute
                            allowedRoles={["admin"]}
                          >
                            <ManageVotingCenters />
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