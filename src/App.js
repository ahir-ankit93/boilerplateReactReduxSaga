import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import {
  Login,
  Register,
  LandingPage,
  ForgotPassword,
  ResendEmail,
  ResetPassword,
} from "./pages/Auth";
import { AuthRoute, PublicRoute } from "./components/routes";
import { setupHttpConfig } from "./utils/http";

function App() {
  useEffect(() => {
    setupHttpConfig();
  }, []);

  return (
    <div className="app-container">
      <ToastContainer autoClose={3000} />
      <Provider store={store}>
        <Router>
          <PublicRoute path="/" exact component={LandingPage} />
          <AuthRoute path="/login" exact component={Login} />
          <AuthRoute path="/sign-up" exact component={Register} />
          <AuthRoute path="/resend-email" exact component={ResendEmail} />
          <AuthRoute path="/forgot-password" exact component={ForgotPassword} />
          <AuthRoute path="/reset-password" exact component={ResetPassword} />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
