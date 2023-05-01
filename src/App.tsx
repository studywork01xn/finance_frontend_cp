import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Expenses from "./pages/Expenses/Expenses";
import Auth from "./pages/Authentication/Auth";
import Anyalytics from "./pages/Analytics/Analytics";
import Settings from "./pages/Settings/Settings";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  function DashboardPage() {
    return (
      <>
        <Sidebar />
        <Expenses />
      </>
    );
  }

  function AnalyticsPage() {
    return (
      <>
        <Sidebar />
        <Anyalytics />
      </>
    );
  }

  function SettingsPage() {
    return (
      <>
        <Sidebar />
        <Settings />
      </>
    );
  }

  function LoginPage() {
    return (
      <>
        <Auth />
      </>
    );
  }

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/logout" component={LoginPage} />
          <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
          <ProtectedRoute exact path="/analytics" component={AnalyticsPage} />
          <ProtectedRoute exact path="/settings" component={SettingsPage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
