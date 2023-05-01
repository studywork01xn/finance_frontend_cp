import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Auth.css";

export default function (props: any) {
  function handleKeyPress(event: any) {
    if (event.key === "-" || event.key === "+") {
      event.preventDefault();
    }
  }

  const history = useHistory();
  let [authMode, setAuthMode] = useState("signin");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [income, setIncome] = useState("");

  const [_email, set_email] = useState("");
  const [_password, set_password] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmitSignup = async (e: any) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        income: income,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      alert("Successfully Created User");
    } else {
      alert("Error Creating User");
    }
  };

  const handleSubmitSignIn = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: _email,
        password: _password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok") {
      localStorage.clear();
      localStorage.setItem("token", data.data);
      history.push("/Dashboard");
    } else {
      alert("Error Loging in");
    }
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => {
                  set_email(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => {
                  set_password(e.target.value);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" onClick={handleSubmitSignIn}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="First Name"
              onChange={(e) => {
                setfname(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Last Name"
              onChange={(e) => {
                setlname(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Income</label>

            <input
              type="number"
              placeholder="Enter Monthly Income"
              className="form-control mt-1"
              step="any"
              min="0"
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setIncome(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleSubmitSignup}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
