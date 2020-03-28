import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav  bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li>
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="nav-link"
              to="/user/dashboard"
            >
              DashBoard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li>
              <Link
                style={currentTab(history, "/signin")}
                className="nav-link"
                to="signin"
              >
                Sign In
              </Link>
            </li>

            <li>
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
          </Fragment>
        )}
        <li>
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Panel
            </Link>
          )}
        </li>
        {isAuthenticated() && (
          <li>
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
