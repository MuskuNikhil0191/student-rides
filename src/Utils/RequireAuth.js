import React from "react";
import { useAuth } from "./Auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = (props) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.logger.user) {
    return (
      <Navigate
        to="/login"
        state={{ path: location.pathname }}
        replace={true}
      />
    );
  }

  return props.children;
};
