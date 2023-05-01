import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = isTokenExpired(localStorage.getItem("token"));

  function isTokenExpired(token) {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      return currentTime < expirationTime;
    }
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
