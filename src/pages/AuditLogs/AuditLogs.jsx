import React, { useState } from "react";
import "./AuditLogs.css";

const AUDIT_LOGS = [
  { id: "LOG-901", event: "Voter registered", date: "2026-09-17 14:22:01", role: "Voter", status: "Success", details: "ID: VTR-2026-01842" },
  { id: "LOG-902", event: "Identity verified", date: "2026-09-17 14:25:33", role: "Voter", status: "Success", details: "ID: VTR-2026-01842" },
  { id: "LOG-903", event: "Vote submitted (Online)", date: "2026-09-17 14:30:11", role: "Voter", status: "Success", details: "Transaction ID: 0x8f2a7c91" },
  { id: "LOG-904", event: "Center Voting Session Started", date: "2026-09-17 15:05:42", role: "Center Operator", status: "Success", details: "Voter ID: VTR-12941" },
  { id: "LOG-905", event: "Vote submitted (Center)", date: "2026-09-17 15:10:05", role: "Voter", status: "Success", details: "Transaction ID: 0x9ab14d72" },
  { id: "LOG-906", event: "Admin login attempt", date: "2026-09-17 15:15:20", role: "Admin", status: "Failed", details: "Invalid credentials" },
  { id: "LOG-907", event: "Admin login", date: "2026-09-17 15:16:02", role: "Admin", status: "Success", details: "Admin ID: ADM-01" }
];

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = AUDIT_LOGS.filter(log => 
    log.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="audit-logs-page">
      <div className="audit-logs-container">
        <header className="audit-logs-header">
          <div>
            <span className="audit-logs-eyebrow">ADMINISTRATION PANEL</span>
            <h1>Audit Logs</h1>
            <p>Monitor system events, user activity, and security logs. Note: Ballot secrecy is preserved; candidate selections are never logged here.</p>
          </div>
        </header>

        <section className="audit-logs-panel card">
          <div className="audit-logs-toolbar">
            <input 
              type="text" 
              placeholder="Search logs by event, role, or status..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="audit-logs-search"
            />
          </div>

          <div className="audit-logs-table-wrapper">
            <table className="audit-logs-table">
              <thead>
                <tr>
                  <th>Log ID</th>
                  <th>Date & Time</th>
                  <th>Event Description</th>
                  <th>Role</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td><strong>{log.id}</strong></td>
                    <td>{log.date}</td>
                    <td>{log.event}</td>
                    <td>{log.role}</td>
                    <td><small>{log.details}</small></td>
                    <td>
                      <span className={`audit-log-status ${log.status.toLowerCase()}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center" style={{ padding: "32px" }}>No logs found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuditLogs;
