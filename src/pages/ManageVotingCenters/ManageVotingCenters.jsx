import React, { useState } from "react";
import "./ManageVotingCenters.css";

const CENTERS = [
  { id: "VC-101", name: "Central District Hall", location: "Downtown", capacity: 500, active: true },
  { id: "VC-102", name: "Northside Community Center", location: "North District", capacity: 300, active: true },
  { id: "VC-103", name: "West End Library", location: "West District", capacity: 200, active: false },
];

const ManageVotingCenters = () => {
  const [centers, setCenters] = useState(CENTERS);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleStatus = (id) => {
    setCenters(centers.map(center => 
      center.id === id ? { ...center, active: !center.active } : center
    ));
  };

  const filteredCenters = centers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="manage-centers-page">
      <div className="manage-centers-container">
        <header className="manage-centers-header">
          <div>
            <span className="manage-centers-eyebrow">ADMINISTRATION PANEL</span>
            <h1>Manage Voting Centers</h1>
            <p>View and manage physical voting centers, capacities, and their operational status.</p>
          </div>
          <button className="btn btn-primary" onClick={() => alert("Add Center form would open here.")}>+ Add Center</button>
        </header>

        <section className="manage-centers-panel card">
          <div className="manage-centers-toolbar">
            <input 
              type="text" 
              placeholder="Search centers by name or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="manage-centers-search"
            />
          </div>

          <div className="manage-centers-table-wrapper">
            <table className="manage-centers-table">
              <thead>
                <tr>
                  <th>Center ID</th>
                  <th>Center Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCenters.map(center => (
                  <tr key={center.id}>
                    <td><strong>{center.id}</strong></td>
                    <td>{center.name}</td>
                    <td>{center.location}</td>
                    <td>{center.capacity}</td>
                    <td>
                      <span className={`center-status ${center.active ? 'active' : 'inactive'}`}>
                        {center.active ? 'Operational' : 'Closed'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={`btn ${center.active ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleStatus(center.id)}
                        style={{ padding: '6px 12px', minHeight: '32px', fontSize: '0.8rem' }}
                      >
                        {center.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCenters.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center" style={{ padding: "32px" }}>No centers found.</td>
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

export default ManageVotingCenters;
