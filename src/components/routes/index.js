import React from "react";
import { Redirect, Route } from "react-router-dom";

import { isLoggedIn } from "../../utility";
import Sidebar from "../Sidebar";
import AuthHeader from "../AuthHeader";
import MainHeader from "../MainHeader";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn() ? (
          <Redirect to="/login" />
        ) : (
          <React.Fragment>
            <MainHeader {...props} />

            <Sidebar />

            <div className="site-content">
              <Component {...props} />
            </div>
          </React.Fragment>
        )
      }
    />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <React.Fragment>
          <div className="main-content">
            <Component {...props} />
          </div>
        </React.Fragment>
      )}
    />
  );
};

export const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <React.Fragment>
        <AuthHeader />
        <div className="auth-content">
          <Component {...props} />
        </div>
      </React.Fragment>
    )}
  />
);
