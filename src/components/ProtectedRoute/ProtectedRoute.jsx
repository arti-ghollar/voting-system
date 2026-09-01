import React from "react";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  /*
   * DEMO MODE
   * --------------------------------------------------
   * Development ke time pages ko directly open karne
   * ke liye authentication redirect temporarily disabled hai.
   *
   * Aapke saare Dashboard, Elections, Admin aur Voter
   * pages directly render honge.
   */

  return children;
};

export default ProtectedRoute;