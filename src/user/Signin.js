import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    encryptPassword: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, encryptPassword, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, encryptPassword })
      .then(data => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Sign in Failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard"></Redirect>;
      } else {
        return <Redirect to="/user/dashboard"></Redirect>;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"></Redirect>;
    }
  };
  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading....</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="text"
                value={email}
              ></input>
            </div>
            <div className="form-group">
              <label className="text-light">Passwords</label>
              <input
                onChange={handleChange("encryptPassword")}
                className="form-control"
                type="password"
                value={encryptPassword}
              ></input>
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign in" description="A Page for Sign in">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
