import React from "react";
import { useAuth } from "./Auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireSearch = (props) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.logger.searchRide.location) {
    return (
      <Navigate
        to="/needaride"
        state={{ path: location.pathname }}
        replace={true}
      />
    );
  }

  return props.children;
};
