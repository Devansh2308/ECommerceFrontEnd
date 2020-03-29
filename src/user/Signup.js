import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    encryptPassword: "",
    error: "",
    success: false
  });
  const { name, email, encryptPassword, error, success } = values;
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, encryptPassword })
      .then(data => {
        console.log(data);
        if (data.err) {
          setValues({ ...values, error: data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            encryptPassword: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("ERROR IN SIGNING UP"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control"
                type="text"
                value={name}
              ></input>
            </div>
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

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New accout was created Succesfully.Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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
  return (
    <Base title="Sign Up" description="A Page for Sign Up">
      {errorMessage()}
      {successMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
