import React from "react";
import { Route, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : (navigate("/login"), null)
      }
    />
  );
};

export default ProtectedRoute;
